package services

import (
	"context"
	"log"
	"strings"

	"github.com/jmoiron/sqlx"
	"github.com/tomekwlod/grg/core"
	"github.com/tomekwlod/grg/db"
	"github.com/tomekwlod/grg/pb"
	resourcestore "github.com/tomekwlod/grg/store/resource"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func NewResourceService(db *db.DB) *ResourceService {
	return &ResourceService{db: db}
}

// implements methods that are intercepted by AuthFunc - only authenticated access!
type ResourceService struct {
	pb.UnimplementedResourceServiceServer
	db *db.DB
}

// This is to allow unauthenticated access!
// It implements methods that are intercepted by AuthFuncOverride
// func (as *ResourceService) AuthFuncOverride(ctx context.Context, fullMethodName string) (context.Context, error) {
// 	return ctx, nil
// }

func (as *ResourceService) Create(ctx context.Context, req *pb.CreateResourceRequest) (*pb.CreateResourceResponse, error) {

	if req.GetName() == "" {
		return nil, status.Errorf(codes.InvalidArgument, "validation error; Name cannot be empty")
	}

	// getting UID from auth context
	// uid, ok := ctx.Value(auth.UIDFromClaim).(int64)
	// if !ok && uid <= 0 {
	// 	return nil, status.Errorf(codes.Unauthenticated, "context not authenticated")
	// }

	resource := core.Resource{
		Name:     req.GetName(),
		OfficeID: req.GetOfficeId(),
	}

	err := as.db.Transact(func(tx *sqlx.Tx) (err error) {
		return resourcestore.New(tx).Create(ctx, &resource)
	})

	if err != nil {
		log.Printf("%+v", err)

		errorMessage := "unknown error occured"

		if strings.Contains(err.Error(), "unique constraint") {
			errorMessage = "resource already exists"
		}

		return nil, status.Errorf(codes.Internal, "couldn't create a new office, %s", errorMessage)
	}

	return &pb.CreateResourceResponse{Id: resource.ID, OfficeId: resource.OfficeID, Name: resource.Name}, nil
}
