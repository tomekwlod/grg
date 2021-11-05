package office

import (
	"context"

	"github.com/tomekwlod/grg/core"
	"github.com/tomekwlod/grg/db"
)

func New(db db.Dber) core.OfficeStore {
	return &officeStore{db}
}

type officeStore struct {
	db db.Dber
}

func (o *officeStore) Create(ctx context.Context, office *core.Office) error {
	return o.db.QueryRowContext(ctx,
		`INSERT INTO office 
        (name, description, max_people_pd, address, telephone, admin_id) 
        VALUES ($1,$2,$3,$4,$5,$6) 
        RETURNING id`,
		office.Name, office.Description, office.MaxPeoplePerDay, office.Address, office.Telephone, office.AdminID).
		Scan(&office.ID)
}
