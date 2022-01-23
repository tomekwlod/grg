package ping

import (
	"context"

	"github.com/tomekwlod/grg/core"
	"github.com/tomekwlod/grg/internal/db"
)

func New(db db.Dber) core.PingStore {
	return &pingStore{db}
}

type pingStore struct {
	db db.Dber
}

func (p *pingStore) Get(ctx context.Context, ping *core.Ping) error {
	return p.db.QueryRowContext(ctx, "SELECT id, val FROM ping LIMIT 1").Scan(&ping.ID, &ping.Val)
}
