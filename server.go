package main

import (
	"context"

	"github.com/tomekwlod/grg/pingpong"
)

type Server struct {
	pingpong.UnimplementedPingPongServer
}

func (s *Server) Ping(ctx context.Context, ping *pingpong.PingRequest) (*pingpong.PongResponse, error) {
	return &pingpong.PongResponse{
		Ok: true,
	}, nil
}
