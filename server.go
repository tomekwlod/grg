package main

import (
	"context"
	"log"

	"github.com/tomekwlod/grg/core"
	"github.com/tomekwlod/grg/pingpong"
	pingstore "github.com/tomekwlod/grg/store/ping"
)

type Server struct {
	pingpong.UnimplementedPingPongServer
}

func (s *Server) Ping(ctx context.Context, p *pingpong.PingRequest) (*pingpong.PongResponse, error) {
	var output bool = true

	ping := core.Ping{}

	err := pingstore.New(dbConn).Get(ctx, dbConn, &ping)

	if err != nil {
		log.Printf("Error while pinging DB, %v\n", err)
		output = false
	}

	output = ping.Val

	return &pingpong.PongResponse{
		Ok: output,
	}, nil
}
