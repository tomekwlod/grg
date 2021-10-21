package core

import (
	"context"
)

type PingStore interface {
	Get(context.Context, *Ping) error
}

type Ping struct {
	ID  int64 `json:"id"`
	Val bool  `json:"value"`
}
