package core

import (
	"context"
)

type OfficeStore interface {
	Create(context.Context, *Office) error
	Find(ctx context.Context, adminId int64) ([]*Office, error)
	FindOne(context.Context, string) (*Office, error)
}

type Office struct {
	ID              int64  `json:"id" db:"id"`
	AdminID         int64  `json:"admin_id" db:"admin_id"`
	Name            string `json:"name" db:"name"`
	Description     string `json:"description" db:"description"`
	Address         string `json:"address" db:"address"`
	Telephone       string `json:"telephone" db:"telephone"`
	MaxPeoplePerDay int64  `json:"max_people_pd" db:"max_people_pd"`
}
