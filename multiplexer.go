package main

import (
	"net/http"

	"github.com/improbable-eng/grpc-web/go/grpcweb"
)

func NewGrpcMultiplexer(srv *grpcweb.WrappedGrpcServer) *grpcMultiplexer {
	return &grpcMultiplexer{
		srv,
	}
}

type grpcMultiplexer struct {
	*grpcweb.WrappedGrpcServer
}

// Handler is used to route requests to either grpc or to regular http
func (m *grpcMultiplexer) Handler(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if m.IsGrpcWebRequest(r) {
			m.ServeHTTP(w, r)
			return
		}
		next.ServeHTTP(w, r)
	})
}
