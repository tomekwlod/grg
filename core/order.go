package core

import (
	"context"
	"time"
)

type OrderStore interface {
	Create(context.Context, *Order) error
	// cancel
}

type Order struct {
	ID         int64      `json:"id" db:"id"`
	OfficeID   int64      `json:"office_id" db:"office_id"`
	ResourceID int64      `json:"resource_id" db:"resource_id"`
	UserID     int64      `json:"user_by" db:"user_by"`
	Minutes    int64      `json:"minutes" db:"minutes"`
	People     int64      `json:"people" db:"people"`
	CreatedBy  int64      `json:"created_by" db:"created_by"`
	StartAt    *time.Time `json:"start_at" db:"start_at"`
}
