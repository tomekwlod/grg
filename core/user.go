package core

import (
	"context"
)

type UserStore interface {
	Create(context.Context, *User) error
	Find(ctx context.Context, email string) (*User, error)
}

type User struct {
	ID       int64  `json:"id"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

func (u *User) ValidatePassword(password string) bool {
	// err := bcrypt.CompareHashAndPassword([]byte(u.HashedPassword), []byte(password))
	if password != u.Password {
		return false
	}
	return true
}
