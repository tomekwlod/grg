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
		`INSERT INTO "order" 
        (office_id, resource_id, user_id, minutes, people, created_by, start_at) 
        VALUES ($1,$2,$3,$4,$5,$6,$7) 
        RETURNING id`,
		order.OfficeID, order.ResourceID, order.UserID, order.Minutes, order.People, order.CreatedBy, order.StartAt).
		Scan(&order.ID)
}

func (r *orderStore) FindForUser(ctx context.Context, userId int64) ([]*core.OrderList, error) {
	rows, err := r.db.QueryxContext(ctx, `
SELECT o.id as orderId, o.minutes, o.people, o.start_at,
	of.id as officeId, of.name as office_name, 
	r.id as resourceId, r.name as resource_name, 
	u.id as userId, u.email
FROM order o
left join users u on (u.id = o.user_id)
left join resource r on (r.id = o.resource_id)
left join office of on (of.id = o.office_id)
WHERE user_id = $1
ORDER BY o.start_at DESC`, userId)

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	list := []*core.OrderList{}

	for rows.Next() {
		row := new(core.OrderList)

		rows.StructScan(row)

		list = append(list, row)
	}

	return list, nil
}
