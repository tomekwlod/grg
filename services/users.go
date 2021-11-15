//go:generate mockgen -destination=mock_users/users__mocks_test.go -package=mock_pb github.com/tomekwlod/grg/pb UserServiceClient

package services

import (
	"context"

	"github.com/tomekwlod/grg/db"
	"github.com/tomekwlod/grg/pb"
	userstore "github.com/tomekwlod/grg/store/user"
)

func NewUserService(db *db.DB) *UserService {
	return &UserService{db: db}
}

// implements methods that are intercepted by AuthFunc - only authenticated access!
type UserService struct {
	// embedding pb server
	pb.UnimplementedUserServiceServer
	db *db.DB
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
