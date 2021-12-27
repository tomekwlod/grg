package main

import (
	"fmt"
	"log"
	"net"
	"net/http"
	"os"
	"time"

	"github.com/gorilla/handlers"
	"github.com/improbable-eng/grpc-web/go/grpcweb"
	"github.com/joho/godotenv"
	"github.com/tomekwlod/grg/auth"
	"github.com/tomekwlod/grg/db"
	"github.com/tomekwlod/grg/pb"
	"github.com/tomekwlod/grg/services"
	"github.com/tomekwlod/utils/env"
)

const (
	API_TCP_PORT = 9990
	WEB_PORT     = 8080
	PEM_PATH     = "cert/server.crt"
	KEY_PATH     = "cert/server.key"
)

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

	apiServer, err := NewApiServer(PEM_PATH, KEY_PATH, ath.AuthFunc)

	if err != nil {
		log.Fatalf("Problem with spinning up the API Server: %s", err)
	}

	// We need to tell the code WHAT TO do on each request, ie. The business logic.
	// In GRPC cases, the Server is acutally just an Interface
	// So we need a struct which fulfills the server interface
	// The register function is a generated piece by protoc.
	pb.RegisterPingServiceServer(apiServer, services.NewPingService(dbConn))
	pb.RegisterUserServiceServer(apiServer, services.NewUserService(dbConn))
	pb.RegisterAuthServiceServer(apiServer, services.NewAuthService(dbConn, ath))
	pb.RegisterOfficeServiceServer(apiServer, services.NewOfficeService(dbConn))
	pb.RegisterResourceServiceServer(apiServer, services.NewResourceService(dbConn))
	pb.RegisterOrderServiceServer(apiServer, services.NewOrderService(dbConn))
	pb.RegisterMonitorServiceServer(apiServer, new(services.MonitorService)) // if there is no costructor
	// pb.RegisterUserServiceServer(apiServer, new(services.UserService)) // if there is no costructor

	l, err := net.Listen("tcp", fmt.Sprintf("%s:%d", "127.0.0.1", API_TCP_PORT))

	if err != nil {
		log.Fatalf("Problem with listening on a port %d: %s", API_TCP_PORT, err.Error())
	}

	// Start serving in a goroutine to not block
	go func() {
		log.Fatal(apiServer.Serve(l))
	}()

	// Wrap the GRPC Server in grpc-web and also host the UI
	grpcWebServer := grpcweb.WrapServer(apiServer.Server)

	// Lets put the wrapped grpc server in our multiplexer struct so
	// it can reach the grpc server in its handler
	multiplex := NewGrpcMultiplexer(grpcWebServer)

	// We need a http router
	r := http.NewServeMux()

	// Load the static webpage with a http fileserver
	webapp := handlers.CombinedLoggingHandler(os.Stderr, http.FileServer(http.Dir("ui/bookingapp/build")))

	// Host the Web Application at /, and wrap it in the GRPC Multiplexer
	// This allows grpc requests to transfer over HTTP1. then be
	// routed by the multiplexer
	r.Handle("/", multiplex.Handler(webapp))

	// Create a HTTP server and bind the router to it, and set wanted address
	srv := &http.Server{
		Handler: allowCORS(r),
		Addr:    fmt.Sprintf("localhost:%d", WEB_PORT),
		// the timeouts are disabled because they close the grpc stream
		// WriteTimeout: 15 * time.Second,
		// ReadTimeout: 15 * time.Second,
	}

	// Serve the webapp over TLS
	log.Fatal(srv.ListenAndServeTLS(PEM_PATH, KEY_PATH))
}

func allowCORS(h http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		// (*w).Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
		w.Header().Set("Access-Control-Allow-Headers", "*")

		if r.Method == "OPTIONS" {
			w.WriteHeader(200)
			w.Write([]byte("ok"))
			return
		}

		h.ServeHTTP(w, r)
	})
}
