package services

import (
	"context"

	"github.com/jmoiron/sqlx"
	"github.com/tomekwlod/grg/core"
	"github.com/tomekwlod/grg/db"
	"github.com/tomekwlod/grg/pb"
	userstore "github.com/tomekwlod/grg/store/user"
)

func NewUserService(db *db.DB) *UserService {
	return &UserService{db: db}
}

// implements methods that are intercepted by AuthFunc - only authenticated access!
type UserService struct {
	pb.UnimplementedUserServiceServer
	db *db.DB
}

func (us *UserService) Create(ctx context.Context, newUser *pb.NewUser) (*pb.User, error) {
	user := core.User{
		Email:    newUser.Email,
		Password: newUser.Password,
	}

	err := us.db.Transact(func(tx *sqlx.Tx) (err error) {
		return userstore.New(tx).Create(ctx, &user)
	})

	if err != nil {
		return nil, err
	}

	return &pb.User{Id: user.ID, Email: user.Email}, nil
}

func (us *UserService) List(ctx context.Context, params *pb.UsersParams) (*pb.Users, error) {
	users := pb.Users{}

	res, err := userstore.New(us.db).Find(ctx, params.Email)

	if err != nil {
		return nil, err
	}

	for _, u := range res {
		users.User = append(users.User, &pb.User{
			Id:    u.ID,
			Email: u.Email,
		})
	}

	return &users, nil
}