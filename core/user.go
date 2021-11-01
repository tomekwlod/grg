package core

import (
	"context"
)

type UserStore interface {
	Create(context.Context, *User) error
	FindOne(ctx context.Context, email string) (*User, error)
	Find(ctx context.Context, email string) ([]*User, error)
}

type User struct {
	ID       int64  `json:"id" db:"id"`
	Email    string `json:"email" db:"email"`
	Password string `json:"password" db:"password"`
}

func (u *User) ValidatePassword(password string) bool {
	// err := bcrypt.CompareHashAndPassword([]byte(u.HashedPassword), []byte(password))
	if password != u.Password {
		return false
	}
	return true
}

func (u *User) Validate() []string {
	var e []string

	if u.Email == "" {
		e = append(e, "Email cannot be empty")
	}
	if u.Password == "" {
		e = append(e, "Password cannot be empty")
	}

	return e
}
