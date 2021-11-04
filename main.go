package main

import (
	"fmt"
	"log"
	"net"
	"net/http"
	"time"

	grpcMiddleware "github.com/grpc-ecosystem/go-grpc-middleware"
	grpcauth "github.com/grpc-ecosystem/go-grpc-middleware/auth"
	"github.com/improbable-eng/grpc-web/go/grpcweb"
	"github.com/joho/godotenv"
	"github.com/tomekwlod/grg/auth"
	"github.com/tomekwlod/grg/db"
	"github.com/tomekwlod/grg/pb"
	"github.com/tomekwlod/grg/services"
	"github.com/tomekwlod/utils/env"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials"
)

type grpcMultiplexer struct {
	*grpcweb.WrappedGrpcServer
}

var (
	dbConn *db.DB
	secret string = "thisIsSecretToSignTokens"
	// tokenDuration - not in use just yet
	tokenDuration = 15 * time.Minute
	ath           *auth.Auth
)

func main() {

	err := godotenv.Load()

	if err != nil {
		log.Fatalf("No .env file detected")
	}

	dbURL := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=%s",
		env.Env("POSTGRES_HOST", "localhost"),
		env.Env("POSTGRES_PORT", "5432"),
		env.Env("POSTGRES_USER", "grg"),
		env.Env("POSTGRES_PASSWORD", ""),
		env.Env("POSTGRES_DB", "grg"),
		env.Env("POSTGRES_SSLMODE", "disable"))

	dbConn, err = db.PostgresConnection(dbURL)
	if err != nil {
		log.Fatalf("error while connecting to db %v", err)
	}
	defer dbConn.Close()

	// initialize the auth interceptor/middleware
	ath := auth.NewAuth(secret)

	apiServer, err := GenerateTLSApi("cert/server.crt", "cert/server.key", ath.AuthFunc)

	if err != nil {
		log.Fatalf("Problem with spinning up a server: %s", err)
	}

	l, err := net.Listen("tcp", "127.0.0.1:9990")

	if err != nil {
		log.Fatalf("Problem with listening on a port %s: %s", "9990", err)
	}

	// We need to tell the code WHAT TO do on each request, ie. The business logic.
	// In GRPC cases, the Server is acutally just an Interface
	// So we need a struct which fulfills the server interface
	// see server.go
	// I MOVED THIS LINE BELOW
	// s := services.NewPingService(dbConn)

	// Register the API server as a PingPong Server
	// The register function is a generated piece by protoc.
	pb.RegisterPingServiceServer(apiServer, services.NewPingService(dbConn))
	pb.RegisterUserServiceServer(apiServer, services.NewUserService(dbConn))
	pb.RegisterAuthServiceServer(apiServer, services.NewAuthService(dbConn, ath))
	// pb.RegisterUserServiceServer(apiServer, new(services.UserService)) // if there is no costructor

	// Start serving in a goroutine to not block
	go func() {
		log.Fatal(apiServer.Serve(l))
	}()

	// Wrap the GRPC Server in grpc-web and also host the UI
	grpcWebServer := grpcweb.WrapServer(apiServer)

	// Lets put the wrapped grpc server in our multiplexer struct so
	// it can reach the grpc server in its handler
	multiplex := grpcMultiplexer{
		grpcWebServer,
	}

	// We need a http router
	r := http.NewServeMux()

	// Load the static webpage with a http fileserver
	webapp := http.FileServer(http.Dir("ui/pingpongapp/build"))

	// Host the Web Application at /, and wrap it in the GRPC Multiplexer
	// This allows grpc requests to transfer over HTTP1. then be
	// routed by the multiplexer
	r.Handle("/", multiplex.Handler(webapp))

	// Create a HTTP server and bind the router to it, and set wanted address
	srv := &http.Server{
		Handler:      r,
		Addr:         "localhost:8080",
		WriteTimeout: 15 * time.Second,
		ReadTimeout:  15 * time.Second,
	}

	// Serve the webapp over TLS
	log.Fatal(srv.ListenAndServeTLS("cert/server.crt", "cert/server.key"))
}

func GenerateTLSApi(pemPath, keyPath string, ath grpcauth.AuthFunc) (*grpc.Server, error) {
	cred, err := credentials.NewServerTLSFromFile(pemPath, keyPath)

	if err != nil {
		return nil, err
	}

	s := grpc.NewServer(
		grpc.Creds(cred),
		grpc.UnaryInterceptor(grpcMiddleware.ChainUnaryServer(
			grpcauth.UnaryServerInterceptor(ath),
		)),
	)

	return s, nil
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
