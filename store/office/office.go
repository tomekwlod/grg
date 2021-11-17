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

func (u *officeStore) FindOne(ctx context.Context, name string) (*core.Office, error) {
	office := new(core.Office)

	err := u.db.QueryRowxContext(ctx, "SELECT id, admin_id, name, description, address, telephone, max_people_pd FROM office WHERE name=$1 LIMIT 1", name).StructScan(office)

	if err != nil {
		return nil, err
	}

	return office, nil
}

func (u *officeStore) Find(ctx context.Context) ([]*core.Office, error) {
	rows, err := u.db.QueryxContext(ctx, "SELECT id, admin_id, name, description, address, telephone, max_people_pd FROM office")

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var offices []*core.Office

	for rows.Next() {

		var office core.Office

		rows.Scan(&office)

		offices = append(offices, &office)
	}

	return offices, nil
}
