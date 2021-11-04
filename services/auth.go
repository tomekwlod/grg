package services

import (
	"context"
	"fmt"
	"log"
	"strings"

	"github.com/jmoiron/sqlx"
	"github.com/tomekwlod/grg/auth"
	"github.com/tomekwlod/grg/core"
	"github.com/tomekwlod/grg/db"
	"github.com/tomekwlod/grg/pb"
	userstore "github.com/tomekwlod/grg/store/user"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func NewAuthService(db *db.DB, ath *auth.Auth) *AuthService {
	return &AuthService{db: db, auth: ath}
}

// implements methods that are intercepted by AuthFunc - only authenticated access!
type AuthService struct {
	pb.UnimplementedAuthServiceServer
	db   *db.DB
	auth *auth.Auth
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
		user, err = userstore.New(tx).FindOne(ctx, req.GetEmail())

		if err != nil {
			return err
		}

		return err
	})

	if err != nil {
		log.Printf("not existing user `%s`: %v", req.GetEmail(), err)
		return nil, status.Errorf(codes.Unauthenticated, "not existing user")
	}

	if !user.ValidatePassword(req.GetPassword()) {
		return nil, status.Errorf(codes.Unauthenticated, "incorrect username or password")
	}

	token, err := auth.GenerateToken(user.Email, "simple_user", as.auth.SecretSigningKey) // user.Role

	if err != nil {
		log.Printf("%v", err)
		return nil, status.Errorf(codes.Internal, "couldn't generate new token for user %s", user.Email)
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

	return &pb.RegisterResponse{Id: user.ID, Email: user.Email}, nil
}
