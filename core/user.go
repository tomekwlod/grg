package core

import (
	"context"
)

type UserStore interface {
	Create(context.Context, *User) error
}

type User struct {
	ID       int64  `json:"id"`
	Email    string `json:"email"`
	Password string `json:"password"`
}
