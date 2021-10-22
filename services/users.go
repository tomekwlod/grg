package services

import (
	"context"

	"github.com/tomekwlod/grg/db"
	"github.com/tomekwlod/grg/pb"
)

func NewUserService(db *db.DB) *UserService {
	return &UserService{db: db}
}

type UserService struct {
	pb.UnimplementedUserServiceServer
	db *db.DB
}

func (us *UserService) Create(ctx context.Context, newUser *pb.NewUser) (*pb.User, error) {

	return nil, nil
}
