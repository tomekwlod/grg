package services

import (
	"context"
	"fmt"
	"log"

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

func (as *AuthService) Login(ctx context.Context, req *pb.LoginRequest) (*pb.LoginResponse, error) {
	var user *core.User

	err := as.db.Transact(func(tx *sqlx.Tx) (err error) {
		user, err = userstore.New(tx).FindOne(ctx, req.GetEmail())

		if err != nil {
			return fmt.Errorf("cannot find user: %v", err)
		}

		return err
	})

	if err != nil {
		log.Printf("%v", err)
		return nil, status.Errorf(codes.Unauthenticated, "not existing user")
	}

	// plain password for now!!!!
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
