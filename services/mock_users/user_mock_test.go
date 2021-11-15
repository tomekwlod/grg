package mock_pb_test

import (
	"context"
	"testing"

	"github.com/golang/mock/gomock"
	"github.com/tomekwlod/grg/pb"
	usersmock "github.com/tomekwlod/grg/services/mock_users"
)

var noContext = context.Background()

var wantEmail = "some@email.com"

func TestUserService(t *testing.T) {

	t.Run("User's list test", func(t *testing.T) {

		ctrl := gomock.NewController(t)
		defer ctrl.Finish()

		mockUserClient := usersmock.NewMockUserServiceClient(ctrl)

		// // for now I am not even using any paramaters in store
		// req := &pb.UsersParams{Email: "email@domain.com"}

		var users pb.Users

		user := &pb.User{
			Id:    1,
			Email: wantEmail,
		}

		users.User = append(users.User, user)

		mockUserClient.EXPECT().List(
			noContext,
			gomock.Any(),
			// &rpcMsg{msg: req},
		).Return(&users, nil)

		testList(t, mockUserClient)
	})
}

func testList(t *testing.T, client pb.UserServiceClient) {

	u, err := client.List(noContext, &pb.UsersParams{})

	if len(u.User) != 1 {
		t.Errorf("mocking failed, expected %d user, got %d", 1, len(u.User))
	}

	gotEmail := u.User[0].Email

	if err != nil || gotEmail != wantEmail {
		t.Errorf("mocking failed, %s != %s", gotEmail, wantEmail)
	}

	t.Log("reply: ", gotEmail)
}
