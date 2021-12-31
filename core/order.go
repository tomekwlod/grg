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
type OrderList struct {
	OrderID      int64      `json:"order_id" db:"order_id"`
	Minutes      int64      `json:"minutes" db:"minutes"`
	People       int64      `json:"people" db:"people"`
	StartAt      *time.Time `json:"start_at" db:"start_at"`
	OfficeID     int64      `json:"office_id" db:"office_id"`
	OfficeName   string     `json:"office_name" db:"office_name"`
	ResourceID   int64      `json:"resource_id" db:"resource_id"`
	ResourceName string     `json:"resource_name" db:"resource_name"`
	UserID       int64      `json:"user_by" db:"user_by"`
	UserEmail    string     `json:"email" db:"email"`
}
