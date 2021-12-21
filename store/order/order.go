package resource

import (
	"context"

	"github.com/tomekwlod/grg/core"
	"github.com/tomekwlod/grg/db"
)

func New(db db.Dber) core.OrderStore {
	return &orderStore{db}
}

type orderStore struct {
	db db.Dber
}

func (r *orderStore) Create(ctx context.Context, order *core.Order) error {
	return r.db.QueryRowContext(ctx,
		`INSERT INTO order 
        (office_id, resource_id, user_id, minutes, people, created_by, start_at) 
        VALUES ($1,$2,$3,$4,$5,$6,$7) 
        RETURNING id`,
		order.OfficeID, order.ResourceID, order.UserID, order.Minutes, order.People, order.CreatedBy, order.StartAt).
		Scan(&order.ID)
}
