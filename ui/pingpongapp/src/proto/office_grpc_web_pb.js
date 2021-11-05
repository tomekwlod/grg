/**
 * @fileoverview gRPC-Web generated client stub for office
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.office = require('./office_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.office.OfficeServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.office.OfficeServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.office.CreateOfficeRequest,
 *   !proto.office.CreateOfficeResponse>}
 */
const methodDescriptor_OfficeService_Create = new grpc.web.MethodDescriptor(
  '/office.OfficeService/Create',
  grpc.web.MethodType.UNARY,
  proto.office.CreateOfficeRequest,
  proto.office.CreateOfficeResponse,
  /**
   * @param {!proto.office.CreateOfficeRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.office.CreateOfficeResponse.deserializeBinary
);


/**
 * @param {!proto.office.CreateOfficeRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.office.CreateOfficeResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.office.CreateOfficeResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.office.OfficeServiceClient.prototype.create =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/office.OfficeService/Create',
      request,
      metadata || {},
      methodDescriptor_OfficeService_Create,
      callback);
};


/**
 * @param {!proto.office.CreateOfficeRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.office.CreateOfficeResponse>}
 *     Promise that resolves to the response
 */
proto.office.OfficeServicePromiseClient.prototype.create =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/office.OfficeService/Create',
      request,
      metadata || {},
      methodDescriptor_OfficeService_Create);
};


module.exports = proto.office;

