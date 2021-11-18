package mock_pb_test

import (
	"context"
	"fmt"
	"testing"

	"github.com/golang/mock/gomock"
	"github.com/tomekwlod/grg/pb"
	officesmock "github.com/tomekwlod/grg/services/mock_office"
	"google.golang.org/protobuf/proto"
)

var noContext = context.Background()

func TestOfficeService(t *testing.T) {

	t.Run("Office's list test", func(t *testing.T) {

		ctrl := gomock.NewController(t)
		defer ctrl.Finish()

		var offices pb.Offices

		offices.Results = append(offices.Results, &pb.Offices_Office{
			Id:   1,
			Name: "Office 1",
		}, &pb.Offices_Office{
			Id:   2,
			Name: "Office 2",
		})

		mockOfficeClient := officesmock.NewMockOfficeServiceClient(ctrl)
		mockOfficeClient.EXPECT().Get(noContext, gomock.Any()).Return(&offices, nil)

		testResults(t, mockOfficeClient)
	})

	t.Run("Office's create test", func(t *testing.T) {

		ctrl := gomock.NewController(t)
		defer ctrl.Finish()

		req := &pb.CreateOfficeRequest{
			Name: "Office 1",
		}

		mockOfficeClient := officesmock.NewMockOfficeServiceClient(ctrl)
		mockOfficeClient.EXPECT().Create(noContext, &rpcMsg{msg: req}).Return(&pb.CreateOfficeResponse{
			Id:   1,
			Name: "Office Mocked",
		}, nil)

		testCreate(t, mockOfficeClient)
	})
}

func testCreate(t *testing.T, client pb.OfficeServiceClient) {

	o, err := client.Create(noContext, &pb.CreateOfficeRequest{Name: "Office 1"})

	if err != nil {
		t.Errorf("mocking failed, %s", err.Error())
	}

	if o.Name != "Office Mocked" {
		t.Errorf("mocking failed, expected %s, got %s", "Office Mocked", o.Name)
	}

}

func testResults(t *testing.T, client pb.OfficeServiceClient) {

	o, err := client.Get(noContext, &pb.EmptyRequest{})

	if len(o.Results) != 2 {
		t.Errorf("mocking failed, expected %d offices, got %d", 2, len(o.Results))
	}

	if err != nil {
		t.Errorf("mocking failed, %s", err.Error())
	}

	if o.Results[0].Name != "Office 1" {
		t.Errorf("mocking failed, expected office 1 to be with name `%s`, got `%s`", "Office 1", o.Results[0].Name)
	}
	if o.Results[1].Name != "Office 2" {
		t.Errorf("mocking failed, expected office 2 to be with name `%s`, got `%s`", "Office 2", o.Results[1].Name)
	}
}

// rpcMsg implements the gomock.Matcher interface
type rpcMsg struct {
	msg proto.Message
}

func (r *rpcMsg) Matches(msg interface{}) bool {
	m, ok := msg.(proto.Message)
	if !ok {
		return false
	}
	return proto.Equal(m, r.msg)
}

func (r *rpcMsg) String() string {
	return fmt.Sprintf("is %s", r.msg)
}
