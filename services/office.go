package services

import (
	"context"
	"log"
	"strings"

	"github.com/jmoiron/sqlx"
	"github.com/tomekwlod/grg/auth"
	"github.com/tomekwlod/grg/core"
	"github.com/tomekwlod/grg/db"
	"github.com/tomekwlod/grg/pb"
	officestore "github.com/tomekwlod/grg/store/office"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func NewOfficeService(db *db.DB) *OfficeService {
	return &OfficeService{db: db}
}

// implements methods that are intercepted by AuthFunc - only authenticated access!
type OfficeService struct {
	pb.UnimplementedOfficeServiceServer
	db *db.DB
}

// This is to allow unauthenticated access!
// It implements methods that are intercepted by AuthFuncOverride
// func (as *OfficeService) AuthFuncOverride(ctx context.Context, fullMethodName string) (context.Context, error) {
// 	return ctx, nil
// }

func (as *OfficeService) Get(ctx context.Context, req *pb.EmptyRequest) (*pb.Offices, error) {
	// getting UID from auth context
	uid, ok := ctx.Value(auth.UIDFromClaim).(int64)
	if !ok && uid <= 0 {
		return nil, status.Errorf(codes.Unauthenticated, "context not authenticated")
	}

	res, err := officestore.New(as.db).Find(ctx)

	if err != nil {
		status.Errorf(codes.Internal, err.Error())
	}

	offices := pb.Offices{}

	for _, o := range res {
		offices.Results = append(offices.Results, &pb.Offices_Office{
			Id:              o.ID,
			AdminId:         o.AdminID,
			Name:            o.Name,
			MaxPeoplePerDay: o.MaxPeoplePerDay,
		})
	}

	return &offices, nil
}

func (as *OfficeService) Create(ctx context.Context, req *pb.CreateOfficeRequest) (*pb.CreateOfficeResponse, error) {

	if req.GetName() == "" {
		return nil, status.Errorf(codes.InvalidArgument, "validation error; Name cannot be empty")
	}
	if req.GetMaxPeoplePerDay() <= 0 {
		return nil, status.Errorf(codes.InvalidArgument, "validation error; Max People Per Day must be specified and > 0 (zero)")
	}

	// getting UID from auth context
	uid, ok := ctx.Value(auth.UIDFromClaim).(int64)
	if !ok && uid <= 0 {
		return nil, status.Errorf(codes.Unauthenticated, "context not authenticated")
	}

	office := core.Office{
		Name:            req.GetName(),
		MaxPeoplePerDay: req.GetMaxPeoplePerDay(),
		AdminID:         uid,
	}

	err := as.db.Transact(func(tx *sqlx.Tx) (err error) {
		return officestore.New(tx).Create(ctx, &office)
	})

	if err != nil {
		log.Printf("%+v", err)

		errorMessage := "unknown error occured"

		if strings.Contains(err.Error(), "unique constraint") {
			errorMessage = "office already exists"
		}

		return nil, status.Errorf(codes.Internal, "couldn't create a new office, %s", errorMessage)
	}

	return &pb.CreateOfficeResponse{Id: office.ID, AdminId: office.AdminID, Name: office.Name}, nil
}
