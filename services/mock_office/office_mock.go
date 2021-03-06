// Code generated by MockGen. DO NOT EDIT.
// Source: github.com/tomekwlod/grg/pb (interfaces: OfficeServiceClient)

// Package mock_pb is a generated GoMock package.
package mock_pb

import (
	context "context"
	reflect "reflect"

	gomock "github.com/golang/mock/gomock"
	pb "github.com/tomekwlod/grg/pb"
	grpc "google.golang.org/grpc"
)

// MockOfficeServiceClient is a mock of OfficeServiceClient interface.
type MockOfficeServiceClient struct {
	ctrl     *gomock.Controller
	recorder *MockOfficeServiceClientMockRecorder
}

// MockOfficeServiceClientMockRecorder is the mock recorder for MockOfficeServiceClient.
type MockOfficeServiceClientMockRecorder struct {
	mock *MockOfficeServiceClient
}

// NewMockOfficeServiceClient creates a new mock instance.
func NewMockOfficeServiceClient(ctrl *gomock.Controller) *MockOfficeServiceClient {
	mock := &MockOfficeServiceClient{ctrl: ctrl}
	mock.recorder = &MockOfficeServiceClientMockRecorder{mock}
	return mock
}

// EXPECT returns an object that allows the caller to indicate expected use.
func (m *MockOfficeServiceClient) EXPECT() *MockOfficeServiceClientMockRecorder {
	return m.recorder
}

// Create mocks base method.
func (m *MockOfficeServiceClient) Create(arg0 context.Context, arg1 *pb.CreateOfficeRequest, arg2 ...grpc.CallOption) (*pb.CreateOfficeResponse, error) {
	m.ctrl.T.Helper()
	varargs := []interface{}{arg0, arg1}
	for _, a := range arg2 {
		varargs = append(varargs, a)
	}
	ret := m.ctrl.Call(m, "Create", varargs...)
	ret0, _ := ret[0].(*pb.CreateOfficeResponse)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// Create indicates an expected call of Create.
func (mr *MockOfficeServiceClientMockRecorder) Create(arg0, arg1 interface{}, arg2 ...interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	varargs := append([]interface{}{arg0, arg1}, arg2...)
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "Create", reflect.TypeOf((*MockOfficeServiceClient)(nil).Create), varargs...)
}

// Get mocks base method.
func (m *MockOfficeServiceClient) Get(arg0 context.Context, arg1 *pb.EmptyRequest, arg2 ...grpc.CallOption) (*pb.Offices, error) {
	m.ctrl.T.Helper()
	varargs := []interface{}{arg0, arg1}
	for _, a := range arg2 {
		varargs = append(varargs, a)
	}
	ret := m.ctrl.Call(m, "Get", varargs...)
	ret0, _ := ret[0].(*pb.Offices)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// Get indicates an expected call of Get.
func (mr *MockOfficeServiceClientMockRecorder) Get(arg0, arg1 interface{}, arg2 ...interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	varargs := append([]interface{}{arg0, arg1}, arg2...)
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "Get", reflect.TypeOf((*MockOfficeServiceClient)(nil).Get), varargs...)
}
