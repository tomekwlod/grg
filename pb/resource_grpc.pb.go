// Code generated by protoc-gen-go-grpc. DO NOT EDIT.

package pb

import (
	context "context"
	grpc "google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
)

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
// Requires gRPC-Go v1.32.0 or later.
const _ = grpc.SupportPackageIsVersion7

// ResourceServiceClient is the client API for ResourceService service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
type ResourceServiceClient interface {
	Create(ctx context.Context, in *CreateResourceRequest, opts ...grpc.CallOption) (*CreateResourceResponse, error)
}

type resourceServiceClient struct {
	cc grpc.ClientConnInterface
}

func NewResourceServiceClient(cc grpc.ClientConnInterface) ResourceServiceClient {
	return &resourceServiceClient{cc}
}

func (c *resourceServiceClient) Create(ctx context.Context, in *CreateResourceRequest, opts ...grpc.CallOption) (*CreateResourceResponse, error) {
	out := new(CreateResourceResponse)
	err := c.cc.Invoke(ctx, "/resource.ResourceService/Create", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// ResourceServiceServer is the server API for ResourceService service.
// All implementations must embed UnimplementedResourceServiceServer
// for forward compatibility
type ResourceServiceServer interface {
	Create(context.Context, *CreateResourceRequest) (*CreateResourceResponse, error)
	mustEmbedUnimplementedResourceServiceServer()
}

// UnimplementedResourceServiceServer must be embedded to have forward compatible implementations.
type UnimplementedResourceServiceServer struct {
}

func (UnimplementedResourceServiceServer) Create(context.Context, *CreateResourceRequest) (*CreateResourceResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method Create not implemented")
}
func (UnimplementedResourceServiceServer) mustEmbedUnimplementedResourceServiceServer() {}

// UnsafeResourceServiceServer may be embedded to opt out of forward compatibility for this service.
// Use of this interface is not recommended, as added methods to ResourceServiceServer will
// result in compilation errors.
type UnsafeResourceServiceServer interface {
	mustEmbedUnimplementedResourceServiceServer()
}

func RegisterResourceServiceServer(s grpc.ServiceRegistrar, srv ResourceServiceServer) {
	s.RegisterService(&ResourceService_ServiceDesc, srv)
}

func _ResourceService_Create_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(CreateResourceRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(ResourceServiceServer).Create(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/resource.ResourceService/Create",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(ResourceServiceServer).Create(ctx, req.(*CreateResourceRequest))
	}
	return interceptor(ctx, in, info, handler)
}

// ResourceService_ServiceDesc is the grpc.ServiceDesc for ResourceService service.
// It's only intended for direct use with grpc.RegisterService,
// and not to be introspected or modified (even as a copy)
var ResourceService_ServiceDesc = grpc.ServiceDesc{
	ServiceName: "resource.ResourceService",
	HandlerType: (*ResourceServiceServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "Create",
			Handler:    _ResourceService_Create_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "resource.proto",
}
