package core

import "context"

type RoleStore interface {
	GetRolesForUser(ctx context.Context, user *User) error
}

type Role struct {
	ID   int64  `json:"id" db:"id"`
	Name string `json:"name" db:"name"`
}
