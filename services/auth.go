package services

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"os"
	"strings"

	"github.com/jmoiron/sqlx"
	"github.com/tomekwlod/grg/auth"
	"github.com/tomekwlod/grg/core"
	"github.com/tomekwlod/grg/internal/db"
	"github.com/tomekwlod/grg/internal/rmq"
	grpclib "github.com/tomekwlod/grg/libs/grpc"
	"github.com/tomekwlod/grg/pb"
	userstore "github.com/tomekwlod/grg/store/user"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func NewAuthService(db *db.DB, ath *auth.Auth, rmq *rmq.Conn) *AuthService {
	return &AuthService{db: db, auth: ath, rmq: rmq}
}

// implements methods that are intercepted by AuthFunc - only authenticated access!
type AuthService struct {
	pb.UnimplementedAuthServiceServer
	db   *db.DB
	auth *auth.Auth
	rmq  *rmq.Conn
}

// This is to allow unauthenticated access!
// It implements methods that are intercepted by AuthFuncOverride
func (as *AuthService) AuthFuncOverride(ctx context.Context, fullMethodName string) (context.Context, error) {
	return ctx, nil
}

type loginRequest struct {
	email    string
	password string
}

func (l *loginRequest) Validate() []string {
	var e []string

	if l.email == "" {
		e = append(e, "Email cannot be empty")
	}
	if l.password == "" {
		e = append(e, "Password cannot be empty")
	}

	return e
}

func (as *AuthService) Login(ctx context.Context, req *pb.LoginRequest) (*pb.LoginResponse, error) {

	lr := loginRequest{
		email:    req.GetEmail(),
		password: req.GetPassword(),
	}

	errs := lr.Validate()

	if len(errs) > 0 {
		return nil, status.Errorf(codes.Internal, "validation error: %s", strings.Join(errs, "; "))
	}

	var user *core.User

	err := as.db.Transact(func(tx *sqlx.Tx) (err error) {
		user, err = userstore.New(tx).FindByEmail(ctx, req.GetEmail())

		return err
	})

	if err != nil {
		log.Printf("not existing user `%s`: %v", req.GetEmail(), err)
		return nil, status.Errorf(codes.Unauthenticated, "not existing user")
	}

	if !user.ValidatePassword(req.GetPassword()) {
		return nil, status.Errorf(codes.Unauthenticated, "incorrect username or password")
	}

	token, err := auth.GenerateToken(user, as.auth.SecretSigningKey)

	if err != nil {
		log.Printf("%v", err)
		return nil, status.Errorf(codes.Internal, "couldn't generate new token for user %s", user.Email)
	}

	// setting cookie - example
	// md := metadata.New(map[string]string{"Set-Cookie": fmt.Sprintf("jwt=%s; Path=/; HttpOnly", token)})
	// grpc.SendHeader(ctx, md)

	headers := grpclib.ReadFromContext(ctx)

	emailMessage := rmq.AuthMessage{
		Origin:  headers.Origin,
		Project: os.Getenv("PROJECT_NAME"),
		IP:      strings.Join(headers.IPs, ", "),
		Email:   user.Email,
	}

	bodyJson, err := json.Marshal(emailMessage)

	if err != nil {
		log.Printf("%v", err)
		return nil, status.Error(codes.Internal, "error encoding json for the amqp message")
	}

	if err = as.rmq.PublishMessage("auth.login", bodyJson); err != nil {
		log.Printf("error while sending message to rabbitmq channel %v", err)
		// return err
	}

	return &pb.LoginResponse{Token: token}, nil
}

func (as *AuthService) Register(ctx context.Context, req *pb.RegisterRequest) (*pb.RegisterResponse, error) {

	lr := loginRequest{
		email:    req.GetEmail(),
		password: req.GetPassword(),
	}

	errs := lr.Validate()

	if len(errs) > 0 {
		return nil, status.Errorf(codes.Internal, "validation error: %s", strings.Join(errs, "; "))
	}

	var user core.User
	user.Email = req.GetEmail()

	hashedPassword, err := user.HashPassword(req.GetPassword())

	if err != nil {
		return nil, fmt.Errorf("problem with hashing a password, %v", err)
	}

	user.Password = hashedPassword

	err = as.db.Transact(func(tx *sqlx.Tx) (err error) {
		return userstore.New(tx).Create(ctx, &user)
	})

	if err != nil {
		log.Printf("%+v", err)

		errorMessage := "unknown error occured"
		if strings.Contains(err.Error(), "unique constraint") {
			errorMessage = "user already exists"
		}
		return nil, status.Errorf(codes.Internal, "couldn't create a new user, %s", errorMessage)
	}

	headers := grpclib.ReadFromContext(ctx)

	emailMessage := rmq.AuthMessage{
		Origin:  headers.Origin,
		Project: os.Getenv("PROJECT_NAME"),
		IP:      strings.Join(headers.IPs, ", "),
		Email:   user.Email,
	}

	bodyJson, err := json.Marshal(emailMessage)

	if err != nil {
		log.Printf("%v", err)
		return nil, status.Error(codes.Internal, "error encoding json for the amqp message")
	}

	if err = as.rmq.PublishMessage("auth.register", bodyJson); err != nil {
		log.Printf("error while sending message to rabbitmq channel %v", err)
		// return err
	}

	return &pb.RegisterResponse{Id: user.ID, Email: user.Email}, nil
}
