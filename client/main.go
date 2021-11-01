package main

import (
	"context"
	"crypto/tls"
	"crypto/x509"
	"fmt"
	"io/ioutil"
	"log"

	"github.com/tomekwlod/grg/pb"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials"
)

func main() {
	ctx := context.Background()

	// Load our TLS certificate and use grpc/credentials to create new transport credentials
	creds := credentials.NewTLS(loadTLSCfg())

	// Create a new connection using the transport credentials
	conn, err := grpc.DialContext(ctx, "localhost:9990", grpc.WithTransportCredentials(creds))

	if err != nil {
		log.Fatal(err)
	}
	defer conn.Close()

	// A new GRPC client to use
	client := pb.NewPingServiceClient(conn)

	pong, err := client.Ping(ctx, &pb.PingRequest{})

	if err != nil {
		log.Fatal(err)
	}

	log.Println(pong)

	users := pb.NewAuthServiceClient(conn)

	user, err := users.Register(ctx, &pb.RegisterRequest{Email: "test@email.com", Password: "password"})

	if err != nil {
		log.Fatal(err)
	}

	fmt.Printf("New user created with ID:%d\n", user.Id)
}

// loadTLSCfg will load a certificate and create a tls config
func loadTLSCfg() *tls.Config {
	b, _ := ioutil.ReadFile("../cert/server.crt")
	cp := x509.NewCertPool()
	if !cp.AppendCertsFromPEM(b) {
		log.Fatal("credentials: failed to append certificates")
	}
	config := &tls.Config{
		InsecureSkipVerify: false,
		RootCAs:            cp,
	}
	return config
}
