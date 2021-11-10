/**
 * @fileoverview gRPC-Web generated client stub for monitor
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.monitor = require('./monitor_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.monitor.MonitorServiceClient =
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
proto.monitor.MonitorServicePromiseClient =
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
 *   !proto.monitor.MonitorRequest,
 *   !proto.monitor.MonitorResponse>}
 */
const methodDescriptor_MonitorService_Monitor = new grpc.web.MethodDescriptor(
  '/monitor.MonitorService/Monitor',
  grpc.web.MethodType.SERVER_STREAMING,
  proto.monitor.MonitorRequest,
  proto.monitor.MonitorResponse,
  /**
   * @param {!proto.monitor.MonitorRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.monitor.MonitorResponse.deserializeBinary
);


/**
 * @param {!proto.monitor.MonitorRequest} request The request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.monitor.MonitorResponse>}
 *     The XHR Node Readable Stream
 */
proto.monitor.MonitorServiceClient.prototype.monitor =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/monitor.MonitorService/Monitor',
      request,
      metadata || {},
      methodDescriptor_MonitorService_Monitor);
};


/**
 * @param {!proto.monitor.MonitorRequest} request The request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.monitor.MonitorResponse>}
 *     The XHR Node Readable Stream
 */
proto.monitor.MonitorServicePromiseClient.prototype.monitor =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/monitor.MonitorService/Monitor',
      request,
      metadata || {},
      methodDescriptor_MonitorService_Monitor);
};


module.exports = proto.monitor;

