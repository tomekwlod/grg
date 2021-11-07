package core

import (
	"context"
)

type ResourceStore interface {
	Create(context.Context, *Resource) error
}

type Resource struct {
	ID          int64  `json:"id" db:"id"`
	OfficeID    int64  `json:"office_id" db:"office_id"`
	Name        string `json:"name" db:"name"`
	Description string `json:"description" db:"description"`
}
