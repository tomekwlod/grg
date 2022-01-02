package services

import (
	"context"
	"log"
	"strings"
	"time"

	"github.com/jmoiron/sqlx"
	"github.com/tomekwlod/grg/auth"
	"github.com/tomekwlod/grg/core"
	"github.com/tomekwlod/grg/db"
	"github.com/tomekwlod/grg/pb"
	orderstore "github.com/tomekwlod/grg/store/order"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func NewOrderService(db *db.DB) *OrderService {
	return &OrderService{db: db}
}

// implements methods that are intercepted by AuthFunc - only authenticated access!
type OrderService struct {
	pb.UnimplementedOrderServiceServer
	db *db.DB
}

// This is to allow unauthenticated access!
// It implements methods that are intercepted by AuthFuncOverride
// func (as *ResourceService) AuthFuncOverride(ctx context.Context, fullMethodName string) (context.Context, error) {
// 	return ctx, nil
// }

func (as *OrderService) Create(ctx context.Context, req *pb.CreateOrderRequest) (*pb.CreateOrderResponse, error) {

	if req.GetMinutes() <= 0 {
		return nil, status.Errorf(codes.InvalidArgument, "validation error; `minutes` parameter needs to be provided and higher than zero")
	}
	if req.GetPeople() <= 0 {
		return nil, status.Errorf(codes.InvalidArgument, "validation error; `people` parameter needs to be provided and higher than zero")
	}
	if req.GetStartAt() <= 0 {
		return nil, status.Errorf(codes.InvalidArgument, "validation error; `startAt` parameter needs to be provided and higher than zero")
	}

	// getting UID from auth context
	uid, ok := ctx.Value(auth.UIDFromClaim).(int64)
	if !ok && uid <= 0 {
		return nil, status.Errorf(codes.Unauthenticated, "context not authenticated")
	}

	var startAt time.Time
	startAt = time.Unix(req.GetStartAt()/1000, 0)

	order := core.Order{
		OfficeID:   req.GetOfficeId(),
		ResourceID: req.GetResourceId(),
		UserID:     uid,
		Minutes:    req.GetMinutes(),
		People:     req.GetPeople(),
		CreatedBy:  uid,
		StartAt:    &startAt,
	}

	err := as.db.Transact(func(tx *sqlx.Tx) (err error) {
		store := orderstore.New(tx)

		err = store.Create(ctx, &order)

		if err != nil {
			return err
		}

		return
	})

	if err != nil {
		log.Printf("%+v", err)

		errorMessage := "unknown error occured"

		if strings.Contains(err.Error(), "unique constraint") {
			errorMessage = "resource already exists"
		}

		return nil, status.Errorf(codes.Internal, "couldn't create a new booking, %s", errorMessage)
	}

	return &pb.CreateOrderResponse{Id: order.ID, OfficeId: order.OfficeID, ResourceId: order.ResourceID, UserId: order.UserID, Minutes: order.Minutes, People: order.People, StartAt: 0}, nil
}

func (as *OrderService) UserOrderList(ctx context.Context, req *pb.UserOrderListRequest) (*pb.UserOrderListResponse, error) {

	// getting UID from auth context
	uid, ok := ctx.Value(auth.UIDFromClaim).(int64)
	if !ok && uid <= 0 {
		return nil, status.Errorf(codes.Unauthenticated, "context not authenticated")
	}

	res, err := orderstore.New(as.db).FindForUser(ctx, uid)

	if err != nil {
		status.Errorf(codes.Internal, err.Error())
	}
	list := pb.UserOrderListResponse{}

	for _, o := range res {

		list.Orders = append(list.Orders, &pb.Order{
			Id:      o.OrderID,
			Minutes: o.Minutes,
			People:  o.People,
			Office: &pb.Order_Office{
				Id:   o.OfficeID,
				Name: o.OfficeName,
			},
			Resource: &pb.Order_Resource{
				Id:   o.ResourceID,
				Name: o.ResourceName,
			},
			User: &pb.Order_User{
				Id:    o.UserID,
				Email: o.UserEmail,
			},
		})
	}

	return &list, nil
}
