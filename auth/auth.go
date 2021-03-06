package auth

import (
	"context"
	"fmt"
	"time"

	"github.com/golang-jwt/jwt"
	grpcauth "github.com/grpc-ecosystem/go-grpc-middleware/auth"
	"github.com/tomekwlod/grg/core"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// It is a good practice not to use basic types as value in context to avoid context collisions
type (
	authenticated     bool
	usernameFromClaim string
	uidFromClaim      int64
)

const (
	Authenticated     authenticated     = false
	UsernameFromClaim usernameFromClaim = ""
	UIDFromClaim      uidFromClaim      = 0
)

type Claims struct {
	UID      int64    `json:"uid"`
	Username string   `json:"username"`
	Roles    []string `json:"roles"`
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

	// // getting cookies and other headers!
	// md, _ := metadata.FromIncomingContext(ctx)
	// fmt.Println(md["cookie"])

	claims, err := validateToken(token, a.SecretSigningKey)

	if err != nil {
		return nil, status.Errorf(codes.Unauthenticated, "invalid auth token: %v", err)
	}

	// set meta data in context for possible later validation
	newCtx := context.WithValue(ctx, Authenticated, true)
	newCtx = context.WithValue(newCtx, UsernameFromClaim, claims.Username)
	newCtx = context.WithValue(newCtx, UIDFromClaim, claims.UID)

	return newCtx, nil
}

func validateToken(tokenString string, secretSigningKey []byte) (*Claims, error) {
	token, err := jwt.ParseWithClaims(tokenString, &Claims{}, func(token *jwt.Token) (interface{}, error) {
		// Don't forget to validate the alg is what you expect:
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return secretSigningKey, nil
	})

	if err != nil {
		return nil, fmt.Errorf("invalid token: %w", err)
	}

	claims, ok := token.Claims.(*Claims)

	if ok && token.Valid {
		return claims, nil
	}

	return nil, fmt.Errorf("could not validate")
}

// todo:
// - token expiration!!
func GenerateToken(user *core.User, signingSecret []byte) (string, error) {
	roles := []string{}

	for _, role := range user.Roles {
		roles = append(roles, role.Name)
	}

	// Create the Claims
	claims := Claims{
		user.ID,
		user.Email,
		roles,
		jwt.StandardClaims{
			ExpiresAt: time.Now().Add(time.Hour * time.Duration(1)).Unix(),
			// ExpiresAt: time.Now().Add(time.Minute * time.Duration(1)).Unix(),
			Issuer: "AuthFunc",
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	return token.SignedString(signingSecret)
}
