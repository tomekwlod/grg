package core

import (
	"context"
	"time"
)

type OrderStore interface {
	Create(context.Context, *Order) error
	FindOne(ctx context.Context, id int64) (*Order, error)
	FindForUser(ctx context.Context, userId int64) (*OrderList, error)
	// cancel
}

type Order struct {
	ID           int64      `json:"id" db:"id"`
	Minutes      int64      `json:"minutes" db:"minutes"`
	People       int64      `json:"people" db:"people"`
	StartAt      *time.Time `json:"start_at" db:"start_at"`
	OfficeID     int64      `json:"office_id" db:"office_id"`
	OfficeName   string     `json:"office_name" db:"office_name"`
	ResourceID   int64      `json:"resource_id" db:"resource_id"`
	ResourceName string     `json:"resource_name" db:"resource_name"`
	UserID       int64      `json:"user_id" db:"user_id"`
	UserEmail    string     `json:"email" db:"email"`
	CreatedBy    int64      `json:"created_by" db:"created_by"`
}
type OrderList struct {
	Orders  []Order
	Count   int `json:"count" db:"count"`
	Page    int `json:"page" db:"page"`
	Perpage int `json:"perpage" db:"perpage"`
}
