package ping

import (
	"context"

	"github.com/tomekwlod/grg/core"
	"github.com/tomekwlod/grg/db"
)

func New(db *db.DB) core.PingStore {
	return &pingStore{db}
}

type pingStore struct {
	db *db.DB
}

func (p *pingStore) Get(ctx context.Context, db db.Querier, ping *core.Ping) error {
	return db.QueryRowContext(ctx, "SELECT id, val FROM ping LIMIT 1").Scan(&ping.ID, &ping.Val)
}
