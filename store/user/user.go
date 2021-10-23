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
	// fmt.Println(u.db.QueryRowContext(ctx, "INSERT INTO users (password, email) VALUES ($1,$2) RETURNING id", user.Password, user.Email).Scan(&user.ID))
	return u.db.QueryRowContext(ctx, "INSERT INTO users (password, email) VALUES ($1,$2) RETURNING id", user.Password, user.Email).Scan(&user.ID)
}
