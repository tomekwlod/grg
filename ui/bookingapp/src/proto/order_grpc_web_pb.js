/**
 * @fileoverview gRPC-Web generated client stub for order
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.order = require('./order_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.order.OrderServiceClient =
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
proto.order.OrderServicePromiseClient =
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
 *   !proto.order.CreateOrderRequest,
 *   !proto.order.CreateOrderResponse>}
 */
const methodDescriptor_OrderService_Create = new grpc.web.MethodDescriptor(
  '/order.OrderService/Create',
  grpc.web.MethodType.UNARY,
  proto.order.CreateOrderRequest,
  proto.order.CreateOrderResponse,
  /**
   * @param {!proto.order.CreateOrderRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.order.CreateOrderResponse.deserializeBinary
);


/**
 * @param {!proto.order.CreateOrderRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.order.CreateOrderResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.order.CreateOrderResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.order.OrderServiceClient.prototype.create =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/order.OrderService/Create',
      request,
      metadata || {},
      methodDescriptor_OrderService_Create,
      callback);
};


/**
 * @param {!proto.order.CreateOrderRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.order.CreateOrderResponse>}
 *     Promise that resolves to the response
 */
proto.order.OrderServicePromiseClient.prototype.create =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/order.OrderService/Create',
      request,
      metadata || {},
      methodDescriptor_OrderService_Create);
};


module.exports = proto.order;

