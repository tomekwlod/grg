// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.26.0
// 	protoc        v3.17.3
// source: office.proto

package pb

import (
	protoreflect "google.golang.org/protobuf/reflect/protoreflect"
	protoimpl "google.golang.org/protobuf/runtime/protoimpl"
	reflect "reflect"
	sync "sync"
)

const (
	// Verify that this generated code is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(20 - protoimpl.MinVersion)
	// Verify that runtime/protoimpl is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(protoimpl.MaxVersion - 20)
)

type EmptyRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields
}

func (x *EmptyRequest) Reset() {
	*x = EmptyRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_office_proto_msgTypes[0]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *EmptyRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*EmptyRequest) ProtoMessage() {}

func (x *EmptyRequest) ProtoReflect() protoreflect.Message {
	mi := &file_office_proto_msgTypes[0]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use EmptyRequest.ProtoReflect.Descriptor instead.
func (*EmptyRequest) Descriptor() ([]byte, []int) {
	return file_office_proto_rawDescGZIP(), []int{0}
}

type CreateOfficeRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Name            string `protobuf:"bytes,1,opt,name=name,proto3" json:"name,omitempty"`
	AdminId         string `protobuf:"bytes,2,opt,name=adminId,proto3" json:"adminId,omitempty"`
	MaxPeoplePerDay int64  `protobuf:"varint,3,opt,name=maxPeoplePerDay,proto3" json:"maxPeoplePerDay,omitempty"`
}

func (x *CreateOfficeRequest) Reset() {
	*x = CreateOfficeRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_office_proto_msgTypes[1]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *CreateOfficeRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*CreateOfficeRequest) ProtoMessage() {}

func (x *CreateOfficeRequest) ProtoReflect() protoreflect.Message {
	mi := &file_office_proto_msgTypes[1]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use CreateOfficeRequest.ProtoReflect.Descriptor instead.
func (*CreateOfficeRequest) Descriptor() ([]byte, []int) {
	return file_office_proto_rawDescGZIP(), []int{1}
}

func (x *CreateOfficeRequest) GetName() string {
	if x != nil {
		return x.Name
	}
	return ""
}

func (x *CreateOfficeRequest) GetAdminId() string {
	if x != nil {
		return x.AdminId
	}
	return ""
}

func (x *CreateOfficeRequest) GetMaxPeoplePerDay() int64 {
	if x != nil {
		return x.MaxPeoplePerDay
	}
	return 0
}

type CreateOfficeResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Id      int64  `protobuf:"varint,1,opt,name=id,proto3" json:"id,omitempty"`
	AdminId int64  `protobuf:"varint,2,opt,name=adminId,proto3" json:"adminId,omitempty"`
	Name    string `protobuf:"bytes,3,opt,name=name,proto3" json:"name,omitempty"`
}

func (x *CreateOfficeResponse) Reset() {
	*x = CreateOfficeResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_office_proto_msgTypes[2]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *CreateOfficeResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*CreateOfficeResponse) ProtoMessage() {}

func (x *CreateOfficeResponse) ProtoReflect() protoreflect.Message {
	mi := &file_office_proto_msgTypes[2]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use CreateOfficeResponse.ProtoReflect.Descriptor instead.
func (*CreateOfficeResponse) Descriptor() ([]byte, []int) {
	return file_office_proto_rawDescGZIP(), []int{2}
}

func (x *CreateOfficeResponse) GetId() int64 {
	if x != nil {
		return x.Id
	}
	return 0
}

func (x *CreateOfficeResponse) GetAdminId() int64 {
	if x != nil {
		return x.AdminId
	}
	return 0
}

func (x *CreateOfficeResponse) GetName() string {
	if x != nil {
		return x.Name
	}
	return ""
}

type Offices struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Results []*Offices_Office `protobuf:"bytes,1,rep,name=results,proto3" json:"results,omitempty"`
}

func (x *Offices) Reset() {
	*x = Offices{}
	if protoimpl.UnsafeEnabled {
		mi := &file_office_proto_msgTypes[3]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *Offices) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Offices) ProtoMessage() {}

func (x *Offices) ProtoReflect() protoreflect.Message {
	mi := &file_office_proto_msgTypes[3]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Offices.ProtoReflect.Descriptor instead.
func (*Offices) Descriptor() ([]byte, []int) {
	return file_office_proto_rawDescGZIP(), []int{3}
}

func (x *Offices) GetResults() []*Offices_Office {
	if x != nil {
		return x.Results
	}
	return nil
}

type Offices_Office struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Id              int64  `protobuf:"varint,1,opt,name=id,proto3" json:"id,omitempty"`
	AdminId         int64  `protobuf:"varint,2,opt,name=adminId,proto3" json:"adminId,omitempty"`
	Name            string `protobuf:"bytes,3,opt,name=name,proto3" json:"name,omitempty"`
	MaxPeoplePerDay int64  `protobuf:"varint,4,opt,name=maxPeoplePerDay,proto3" json:"maxPeoplePerDay,omitempty"`
	ResourcesCount  int64  `protobuf:"varint,5,opt,name=resourcesCount,proto3" json:"resourcesCount,omitempty"`
}

func (x *Offices_Office) Reset() {
	*x = Offices_Office{}
	if protoimpl.UnsafeEnabled {
		mi := &file_office_proto_msgTypes[4]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *Offices_Office) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Offices_Office) ProtoMessage() {}

func (x *Offices_Office) ProtoReflect() protoreflect.Message {
	mi := &file_office_proto_msgTypes[4]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Offices_Office.ProtoReflect.Descriptor instead.
func (*Offices_Office) Descriptor() ([]byte, []int) {
	return file_office_proto_rawDescGZIP(), []int{3, 0}
}

func (x *Offices_Office) GetId() int64 {
	if x != nil {
		return x.Id
	}
	return 0
}

func (x *Offices_Office) GetAdminId() int64 {
	if x != nil {
		return x.AdminId
	}
	return 0
}

func (x *Offices_Office) GetName() string {
	if x != nil {
		return x.Name
	}
	return ""
}

func (x *Offices_Office) GetMaxPeoplePerDay() int64 {
	if x != nil {
		return x.MaxPeoplePerDay
	}
	return 0
}

func (x *Offices_Office) GetResourcesCount() int64 {
	if x != nil {
		return x.ResourcesCount
	}
	return 0
}

var File_office_proto protoreflect.FileDescriptor

var file_office_proto_rawDesc = []byte{
	0x0a, 0x0c, 0x6f, 0x66, 0x66, 0x69, 0x63, 0x65, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x12, 0x06,
	0x6f, 0x66, 0x66, 0x69, 0x63, 0x65, 0x22, 0x0e, 0x0a, 0x0c, 0x45, 0x6d, 0x70, 0x74, 0x79, 0x52,
	0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x22, 0x6d, 0x0a, 0x13, 0x43, 0x72, 0x65, 0x61, 0x74, 0x65,
	0x4f, 0x66, 0x66, 0x69, 0x63, 0x65, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x12, 0x12, 0x0a,
	0x04, 0x6e, 0x61, 0x6d, 0x65, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x04, 0x6e, 0x61, 0x6d,
	0x65, 0x12, 0x18, 0x0a, 0x07, 0x61, 0x64, 0x6d, 0x69, 0x6e, 0x49, 0x64, 0x18, 0x02, 0x20, 0x01,
	0x28, 0x09, 0x52, 0x07, 0x61, 0x64, 0x6d, 0x69, 0x6e, 0x49, 0x64, 0x12, 0x28, 0x0a, 0x0f, 0x6d,
	0x61, 0x78, 0x50, 0x65, 0x6f, 0x70, 0x6c, 0x65, 0x50, 0x65, 0x72, 0x44, 0x61, 0x79, 0x18, 0x03,
	0x20, 0x01, 0x28, 0x03, 0x52, 0x0f, 0x6d, 0x61, 0x78, 0x50, 0x65, 0x6f, 0x70, 0x6c, 0x65, 0x50,
	0x65, 0x72, 0x44, 0x61, 0x79, 0x22, 0x54, 0x0a, 0x14, 0x43, 0x72, 0x65, 0x61, 0x74, 0x65, 0x4f,
	0x66, 0x66, 0x69, 0x63, 0x65, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x12, 0x0e, 0x0a,
	0x02, 0x69, 0x64, 0x18, 0x01, 0x20, 0x01, 0x28, 0x03, 0x52, 0x02, 0x69, 0x64, 0x12, 0x18, 0x0a,
	0x07, 0x61, 0x64, 0x6d, 0x69, 0x6e, 0x49, 0x64, 0x18, 0x02, 0x20, 0x01, 0x28, 0x03, 0x52, 0x07,
	0x61, 0x64, 0x6d, 0x69, 0x6e, 0x49, 0x64, 0x12, 0x12, 0x0a, 0x04, 0x6e, 0x61, 0x6d, 0x65, 0x18,
	0x03, 0x20, 0x01, 0x28, 0x09, 0x52, 0x04, 0x6e, 0x61, 0x6d, 0x65, 0x22, 0xd6, 0x01, 0x0a, 0x07,
	0x4f, 0x66, 0x66, 0x69, 0x63, 0x65, 0x73, 0x12, 0x30, 0x0a, 0x07, 0x72, 0x65, 0x73, 0x75, 0x6c,
	0x74, 0x73, 0x18, 0x01, 0x20, 0x03, 0x28, 0x0b, 0x32, 0x16, 0x2e, 0x6f, 0x66, 0x66, 0x69, 0x63,
	0x65, 0x2e, 0x4f, 0x66, 0x66, 0x69, 0x63, 0x65, 0x73, 0x2e, 0x4f, 0x66, 0x66, 0x69, 0x63, 0x65,
	0x52, 0x07, 0x72, 0x65, 0x73, 0x75, 0x6c, 0x74, 0x73, 0x1a, 0x98, 0x01, 0x0a, 0x06, 0x4f, 0x66,
	0x66, 0x69, 0x63, 0x65, 0x12, 0x0e, 0x0a, 0x02, 0x69, 0x64, 0x18, 0x01, 0x20, 0x01, 0x28, 0x03,
	0x52, 0x02, 0x69, 0x64, 0x12, 0x18, 0x0a, 0x07, 0x61, 0x64, 0x6d, 0x69, 0x6e, 0x49, 0x64, 0x18,
	0x02, 0x20, 0x01, 0x28, 0x03, 0x52, 0x07, 0x61, 0x64, 0x6d, 0x69, 0x6e, 0x49, 0x64, 0x12, 0x12,
	0x0a, 0x04, 0x6e, 0x61, 0x6d, 0x65, 0x18, 0x03, 0x20, 0x01, 0x28, 0x09, 0x52, 0x04, 0x6e, 0x61,
	0x6d, 0x65, 0x12, 0x28, 0x0a, 0x0f, 0x6d, 0x61, 0x78, 0x50, 0x65, 0x6f, 0x70, 0x6c, 0x65, 0x50,
	0x65, 0x72, 0x44, 0x61, 0x79, 0x18, 0x04, 0x20, 0x01, 0x28, 0x03, 0x52, 0x0f, 0x6d, 0x61, 0x78,
	0x50, 0x65, 0x6f, 0x70, 0x6c, 0x65, 0x50, 0x65, 0x72, 0x44, 0x61, 0x79, 0x12, 0x26, 0x0a, 0x0e,
	0x72, 0x65, 0x73, 0x6f, 0x75, 0x72, 0x63, 0x65, 0x73, 0x43, 0x6f, 0x75, 0x6e, 0x74, 0x18, 0x05,
	0x20, 0x01, 0x28, 0x03, 0x52, 0x0e, 0x72, 0x65, 0x73, 0x6f, 0x75, 0x72, 0x63, 0x65, 0x73, 0x43,
	0x6f, 0x75, 0x6e, 0x74, 0x32, 0x86, 0x01, 0x0a, 0x0d, 0x4f, 0x66, 0x66, 0x69, 0x63, 0x65, 0x53,
	0x65, 0x72, 0x76, 0x69, 0x63, 0x65, 0x12, 0x45, 0x0a, 0x06, 0x43, 0x72, 0x65, 0x61, 0x74, 0x65,
	0x12, 0x1b, 0x2e, 0x6f, 0x66, 0x66, 0x69, 0x63, 0x65, 0x2e, 0x43, 0x72, 0x65, 0x61, 0x74, 0x65,
	0x4f, 0x66, 0x66, 0x69, 0x63, 0x65, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x1c, 0x2e,
	0x6f, 0x66, 0x66, 0x69, 0x63, 0x65, 0x2e, 0x43, 0x72, 0x65, 0x61, 0x74, 0x65, 0x4f, 0x66, 0x66,
	0x69, 0x63, 0x65, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x22, 0x00, 0x12, 0x2e, 0x0a,
	0x03, 0x47, 0x65, 0x74, 0x12, 0x14, 0x2e, 0x6f, 0x66, 0x66, 0x69, 0x63, 0x65, 0x2e, 0x45, 0x6d,
	0x70, 0x74, 0x79, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x0f, 0x2e, 0x6f, 0x66, 0x66,
	0x69, 0x63, 0x65, 0x2e, 0x4f, 0x66, 0x66, 0x69, 0x63, 0x65, 0x73, 0x22, 0x00, 0x42, 0x07, 0x5a,
	0x05, 0x2f, 0x2e, 0x3b, 0x70, 0x62, 0x62, 0x06, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x33,
}

var (
	file_office_proto_rawDescOnce sync.Once
	file_office_proto_rawDescData = file_office_proto_rawDesc
)

func file_office_proto_rawDescGZIP() []byte {
	file_office_proto_rawDescOnce.Do(func() {
		file_office_proto_rawDescData = protoimpl.X.CompressGZIP(file_office_proto_rawDescData)
	})
	return file_office_proto_rawDescData
}

var file_office_proto_msgTypes = make([]protoimpl.MessageInfo, 5)
var file_office_proto_goTypes = []interface{}{
	(*EmptyRequest)(nil),         // 0: office.EmptyRequest
	(*CreateOfficeRequest)(nil),  // 1: office.CreateOfficeRequest
	(*CreateOfficeResponse)(nil), // 2: office.CreateOfficeResponse
	(*Offices)(nil),              // 3: office.Offices
	(*Offices_Office)(nil),       // 4: office.Offices.Office
}
var file_office_proto_depIdxs = []int32{
	4, // 0: office.Offices.results:type_name -> office.Offices.Office
	1, // 1: office.OfficeService.Create:input_type -> office.CreateOfficeRequest
	0, // 2: office.OfficeService.Get:input_type -> office.EmptyRequest
	2, // 3: office.OfficeService.Create:output_type -> office.CreateOfficeResponse
	3, // 4: office.OfficeService.Get:output_type -> office.Offices
	3, // [3:5] is the sub-list for method output_type
	1, // [1:3] is the sub-list for method input_type
	1, // [1:1] is the sub-list for extension type_name
	1, // [1:1] is the sub-list for extension extendee
	0, // [0:1] is the sub-list for field type_name
}

func init() { file_office_proto_init() }
func file_office_proto_init() {
	if File_office_proto != nil {
		return
	}
	if !protoimpl.UnsafeEnabled {
		file_office_proto_msgTypes[0].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*EmptyRequest); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_office_proto_msgTypes[1].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*CreateOfficeRequest); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_office_proto_msgTypes[2].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*CreateOfficeResponse); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_office_proto_msgTypes[3].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*Offices); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_office_proto_msgTypes[4].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*Offices_Office); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
	}
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: file_office_proto_rawDesc,
			NumEnums:      0,
			NumMessages:   5,
			NumExtensions: 0,
			NumServices:   1,
		},
		GoTypes:           file_office_proto_goTypes,
		DependencyIndexes: file_office_proto_depIdxs,
		MessageInfos:      file_office_proto_msgTypes,
	}.Build()
	File_office_proto = out.File
	file_office_proto_rawDesc = nil
	file_office_proto_goTypes = nil
	file_office_proto_depIdxs = nil
}
