package main

import (
	grpcMiddleware "github.com/grpc-ecosystem/go-grpc-middleware"
	grpcauth "github.com/grpc-ecosystem/go-grpc-middleware/auth"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials"
)

type server struct {
	*grpc.Server
}

func NewApiServer(cert, key string, ath grpcauth.AuthFunc) (*server, error) {

	cred, err := credentials.NewServerTLSFromFile(cert, key)

	if err != nil {
		return nil, err
	}

	s := grpc.NewServer(
		grpc.Creds(cred),
		grpc.UnaryInterceptor(grpcMiddleware.ChainUnaryServer(
			grpcauth.UnaryServerInterceptor(ath),
		)),
		// grpc.StreamInterceptor(grpcMiddleware.ChainStreamServer(
		// 	grpcauth.StreamServerInterceptor(ath),
		// )),
	)

	return &server{s}, nil
}
