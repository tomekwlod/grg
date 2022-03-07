package core

import (
	"context"

	"golang.org/x/crypto/bcrypt"
)

type UserStore interface {
	Create(context.Context, *User) error
	FindOne(ctx context.Context, id int64) (*User, error)
	FindByEmail(ctx context.Context, email string) (*User, error)
	List(ctx context.Context) ([]*User, error)
}

type User struct {
	ID       int64  `json:"id" db:"id"`
	Email    string `json:"email" db:"email"`
	Password string `json:"password" db:"password"`
	Roles    []Role `json:"roles" db:"roles"`
}

func (u *User) ValidatePassword(password string) bool {

	err := bcrypt.CompareHashAndPassword([]byte(u.Password), []byte(password))

	if err != nil {
		return false
	}

	return true
}

func (u *User) HashPassword(password string) (string, error) {
	// Salt and hash the password using the bcrypt algorithm
	// The second argument is the cost of hashing, which we arbitrarily set as 8 (this value can be more or less, depending on the computing power you wish to utilize)
	hash, err := bcrypt.GenerateFromPassword([]byte(password), 8)

	if err != nil {
		return "", err
	}

	return string(hash), nil
}
