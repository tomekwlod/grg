package auth

import (
	"context"
	"fmt"
	"time"

	"github.com/golang-jwt/jwt"
	grpcauth "github.com/grpc-ecosystem/go-grpc-middleware/auth"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// It is a good practice not to use basic types as value in context to avoid context collisions
type (
	authenticated     bool
	usernameFromClaim string
)

const (
	Authenticated     authenticated     = false
	UsernameFromClaim usernameFromClaim = ""
)

type Claims struct {
	Username string `json:"username"`
	jwt.StandardClaims
}

func NewAuth(secret string) *Auth {
	return &Auth{SecretSigningKey: []byte(secret)}
}

type Auth struct {
	SecretSigningKey []byte
}

func (a *Auth) AuthFunc(ctx context.Context) (context.Context, error) {
	token, err := grpcauth.AuthFromMD(ctx, "Bearer")

	if err != nil {
		return nil, err
	}

	username, err := validateToken(token, a.SecretSigningKey)

	if err != nil {
		return nil, status.Errorf(codes.Unauthenticated, "invalid auth token: %v", err)
	}

	// set meta data in context for possible later validation
	newCtx := context.WithValue(ctx, Authenticated, true)
	newCtx = context.WithValue(newCtx, UsernameFromClaim, username)

	return newCtx, nil
}

func validateToken(tokenString string, secretSigningKey []byte) (username string, err error) {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		// Don't forget to validate the alg is what you expect:
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return secretSigningKey, nil
	})

	if err != nil {
		return
	}

	claims, ok := token.Claims.(jwt.MapClaims)

	if ok && token.Valid {
		username = claims["username"].(string)
		return
	}

	err = fmt.Errorf("could not validate")

	return
}

/// to check and use!
///
///
///
///
func GenerateToken(username string, signingSecret []byte) (string, error) {
	// Create the Claims
	claims := Claims{
		username,
		jwt.StandardClaims{
			ExpiresAt: time.Now().Add(time.Hour * time.Duration(1)).Unix(),
			Issuer:    "AuthFunc",
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	signedToken, err := token.SignedString(signingSecret)
	if err != nil {
		return signedToken, err
	}

	return signedToken, nil
}
