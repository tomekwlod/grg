package mock_pb_test

import (
	"context"
	"testing"

	"github.com/golang/mock/gomock"
	"github.com/tomekwlod/grg/pb"
	officesmock "github.com/tomekwlod/grg/services/mock_office"
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

	t.Log("ok")

}
