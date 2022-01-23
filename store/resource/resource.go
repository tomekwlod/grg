package resource

import (
	"context"

	"github.com/tomekwlod/grg/core"
	"github.com/tomekwlod/grg/internal/db"
)

func New(db db.Dber) core.ResourceStore {
	return &resourceStore{db}
}

type resourceStore struct {
	db db.Dber
}

func (r *resourceStore) Create(ctx context.Context, resource *core.Resource) error {
	return r.db.QueryRowContext(ctx,
		`INSERT INTO resource 
        (name, description, office_id) 
        VALUES ($1,$2,$3) 
        RETURNING id`,
		resource.Name, resource.Description, resource.OfficeID).
		Scan(&resource.ID)
}

func (r *resourceStore) Find(ctx context.Context, officeId int64) ([]*core.Resource, error) {
	rows, err := r.db.QueryxContext(ctx, "SELECT id, office_id, name, description FROM resource WHERE office_id = $1 ORDER BY name ASC", officeId)

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	resources := []*core.Resource{}

	for rows.Next() {
		resource := new(core.Resource)

		rows.StructScan(resource)

		resources = append(resources, resource)
	}
	return resources, nil
}
