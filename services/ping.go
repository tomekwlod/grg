package services

import (
	"context"
	"log"

	"github.com/jmoiron/sqlx"
	"github.com/tomekwlod/grg/core"
	"github.com/tomekwlod/grg/db"
	"github.com/tomekwlod/grg/pb"
	pingstore "github.com/tomekwlod/grg/store/ping"
)

func NewPingService(db *db.DB) *PingService {
	return &PingService{db: db}
}

type PingService struct {
	pb.UnimplementedPingServiceServer
	db *db.DB
}

// This is to allow unauthenticated access!
// It implements methods that are intercepted by AuthFuncOverride
func (ps *PingService) AuthFuncOverride(ctx context.Context, fullMethodName string) (context.Context, error) {
	log.Println("client is calling (UNAUTHANTICATED) method:", fullMethodName)
	return ctx, nil
}

func (ps *PingService) Ping(ctx context.Context, p *pb.PingRequest) (*pb.PongResponse, error) {
	var output bool = true

	ping := core.Ping{}

	err := ps.db.Transact(func(tx *sqlx.Tx) (err error) {
		return pingstore.New(tx).Get(ctx, &ping)
	})

	if err != nil {
		log.Printf("Error while pinging DB, %v\n", err)
	}

	output = ping.Val

	return &pb.PongResponse{
		Ok: output,
	}, nil
}
