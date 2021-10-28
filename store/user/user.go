package user

import (
	"context"

	"github.com/tomekwlod/grg/core"
	"github.com/tomekwlod/grg/db"
)

func New(db db.Dber) core.UserStore {
	return &userStore{db}
}

type userStore struct {
	db db.Dber
}

func (u *userStore) Create(ctx context.Context, user *core.User) error {
	return u.db.QueryRowContext(ctx, "INSERT INTO users (password, email) VALUES ($1,$2) RETURNING id", user.Password, user.Email).Scan(&user.ID)
}

func (u *userStore) Find(ctx context.Context, email string) (*core.User, error) {
	user := new(core.User)

	err := u.db.QueryRowxContext(ctx, "SELECT id,email,password FROM users WHERE email=$1 LIMIT 1", email).StructScan(user)

	if err != nil {
		return nil, err
	}

	return user, nil
}
