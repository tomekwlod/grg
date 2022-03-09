package services

import (
	"context"
	"encoding/json"
	"log"
	"os"
	"strings"
	"time"

	"github.com/jmoiron/sqlx"
	"github.com/tomekwlod/grg/auth"
	"github.com/tomekwlod/grg/core"
	"github.com/tomekwlod/grg/internal/db"
	"github.com/tomekwlod/grg/internal/rmq"
	grpclib "github.com/tomekwlod/grg/libs/grpc"
	"github.com/tomekwlod/grg/pb"
	orderstore "github.com/tomekwlod/grg/store/order"
	userstore "github.com/tomekwlod/grg/store/user"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func NewOrderService(db *db.DB, rmq *rmq.Conn) *OrderService {
	return &OrderService{db: db, rmq: rmq}
}

// implements methods that are intercepted by AuthFunc - only authenticated access!
type OrderService struct {
	pb.UnimplementedOrderServiceServer
	db  *db.DB
	rmq *rmq.Conn
}

// This is to allow unauthenticated access!
// It implements methods that are intercepted by AuthFuncOverride
// func (as *ResourceService) AuthFuncOverride(ctx context.Context, fullMethodName string) (context.Context, error) {
// 	return ctx, nil
// }

func (as *OrderService) Create(ctx context.Context, req *pb.CreateOrderRequest) (*pb.Order, error) {

	if req.GetMinutes() <= 0 {
		return nil, status.Errorf(codes.InvalidArgument, "validation error; `minutes` parameter needs to be provided and higher than zero")
	}
	if req.GetPeople() <= 0 {
		return nil, status.Errorf(codes.InvalidArgument, "validation error; `people` parameter needs to be provided and higher than zero")
	}
	if req.GetStartAt() <= 0 {
		return nil, status.Errorf(codes.InvalidArgument, "validation error; `startAt` parameter needs to be provided and higher than zero")
	}
	if req.GetOfficeId() == 0 {
		return nil, status.Errorf(codes.InvalidArgument, "validation error; `officeId` parameter needs to be provided")
	}
	if req.GetResourceId() == 0 {
		return nil, status.Errorf(codes.InvalidArgument, "validation error; `resourceId` parameter needs to be provided")
	}

	// getting UID from auth context
	uid, ok := ctx.Value(auth.UIDFromClaim).(int64)
	if !ok && uid <= 0 {
		return nil, status.Errorf(codes.Unauthenticated, "context not authenticated")
	}

	var startAt time.Time
	startAt = time.Unix(req.GetStartAt()/1000, 0)

	var order *core.Order

	newOrder := core.Order{
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

		err = store.Create(ctx, &newOrder)

		if err != nil {
			return err
		}

		order, err = store.FindOne(ctx, newOrder.ID)

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

	headers := grpclib.ReadFromContext(ctx)

	store := userstore.New(as.db)

	user, err := store.FindOne(ctx, uid)

	if err != nil {
		log.Printf("%v", err)
		// this should not break the request... but for now...
		return nil, status.Error(codes.Internal, "error when getting user in order to send him a message")
	}

	// sending a queue message
	emailMessage := rmq.EmailMessage{
		Origin:  headers.Origin,
		Project: os.Getenv("PROJECT_NAME"),
		IP:      strings.Join(headers.IPs, ", "),
		Email:   user.Email,
		Subject: `A booking created! We can't wait to see you!`,
		Message: `You have just made a booking with us! Nice one!

These are the details of your booking. Szhould you have any questions do not hesitate to contact us!

Best regards,
John Doe`,
	}

	bodyJson, err := json.Marshal(emailMessage)

	if err != nil {
		log.Printf("%v", err)
		// this should not break the request... but for now...
		return nil, status.Error(codes.Internal, "error encoding json for the amqp message")
	}

	if err = as.rmq.PublishMessage("email.simple", bodyJson); err != nil {
		log.Printf("error while sending message to rabbitmq channel %v", err)
		// return err
	}
	// end sending a queue message

	return &pb.Order{
		Id:      order.ID,
		Minutes: order.Minutes,
		People:  order.People,
		Office: &pb.Order_Office{
			Id:   order.OfficeID,
			Name: order.OfficeName,
		},
		Resource: &pb.Order_Resource{
			Id:   order.ResourceID,
			Name: order.ResourceName,
		},
		User: &pb.Order_User{
			Id:    order.UserID,
			Email: order.UserEmail,
		},
	}, nil
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

	for _, order := range res.Orders {

		list.Orders = append(list.Orders, &pb.Order{
			Id:      order.ID,
			Minutes: order.Minutes,
			People:  order.People,
			Office: &pb.Order_Office{
				Id:   order.OfficeID,
				Name: order.OfficeName,
			},
			Resource: &pb.Order_Resource{
				Id:   order.ResourceID,
				Name: order.ResourceName,
			},
			User: &pb.Order_User{
				Id:    order.UserID,
				Email: order.UserEmail,
			},
		})
	}

	return &list, nil
}
