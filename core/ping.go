package core

import (
	"context"

	"github.com/tomekwlod/grg/db"
)

type PingStore interface {
	Get(context.Context, db.Querier, *Ping) error
}

type Ping struct {
	ID  int64 `json:"id"`
	Val bool  `json:"value"`
}
