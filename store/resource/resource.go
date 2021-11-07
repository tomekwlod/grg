package resource

import (
	"context"

	"github.com/tomekwlod/grg/core"
	"github.com/tomekwlod/grg/db"
)

func New(db db.Dber) core.ResourceStore {
	return &resourceStore{db}
}

type resourceStore struct {
	db db.Dber
}

func (r *resourceStore) Create(ctx context.Context, resource *core.Resource) error {
	return nil
}
