package grpc

import (
	"context"

	"google.golang.org/grpc/metadata"
	"google.golang.org/grpc/peer"
)

type Headers struct {
	IPs       []string
	Origin    string
	UserAgent string
	Referer   string
}

func ReadFromContext(ctx context.Context) (headers Headers) {

	p, _ := peer.FromContext(ctx)

	headers.IPs = append(headers.IPs, p.Addr.String())

	md, _ := metadata.FromIncomingContext(ctx)

	if len(md.Get(":authority")) > 0 {
		for _, a := range md.Get(":authority") {
			if a != "" {
				headers.IPs = append(headers.IPs, a)
			}
		}
	}

	if len(md.Get("referer")) > 0 && md.Get("referer")[0] != "" {
		headers.Referer = md.Get("referer")[0]
	}

	if len(md.Get("user-agent")) > 0 && md.Get("user-agent")[0] != "" {
		headers.UserAgent = md.Get("user-agent")[0]
	}

	if len(md.Get("origin")) > 0 && md.Get("origin")[0] != "" {
		headers.UserAgent = md.Get("origin")[0]
	}

	return
}
