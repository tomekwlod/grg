#### todo:
- simple react login, something like this: https://www.freecodecamp.org/news/how-to-persist-a-logged-in-user-in-react/
- react router
- logout

#### info:
without envoy: https://itnext.io/using-grpc-with-tls-golang-and-react-no-envoy-92e898bf8463
with envoy: https://medium.com/swlh/building-a-realtime-dashboard-with-reactjs-go-grpc-and-envoy-7be155dfabfb

CERT ISSUES ON CHROME, FOLLOW THIS: `https://stackoverflow.com/a/60516812/1800372`

<!-- arch -arm64 brew install protoc-gen-grpc-web -->
Download protoc-gen-grpc-web from: https://github.com/grpc/grpc-web/releases
sudo mv ~/Downloads/protoc-gen-grpc-web-1.3.0-darwin-x86_64 /usr/local/bin/protoc-gen-grpc-web
chmod +x /usr/local/bin/protoc-gen-grpc-web
In case of error like: `“protoc-gen-grpc-web” cannot be opened because the developer cannot be verified` follow this: `https://github.com/grpc/grpc-web/issues/650#issuecomment-541318522`

run: 
- make pgen
- (cd ui/bookingapp && yarn && yarn build)
- open localhost:8080
- in case of error like: `service_grpc_web_pb.js:101 Uncaught TypeError: Cannot read properties of undefined (reading 'MethodInfo')` follow this: `https://stackoverflow.com/a/69582682/1800372` (basically you need to be sure you're usign the version 1.3.0 or above of `protoc-gen-grpc-web`)

create database first:
```
CREATE USER grg WITH ENCRYPTED PASSWORD 'password-here';
CREATE DATABASE grg OWNER grg;
GRANT ALL PRIVILEGES ON DATABASE grg TO grg;
```


# INFO

## GRPC
### GRPC AUTH
- https://www.reddit.com/r/golang/comments/gg99xe/communicate_between_grpc_microservices_with_jwt/ - general chat about the auth with grpc
- https://github.com/tegk/grpcMiddlewareAuthentication - simple examples
- ... and corresponding article https://tillknuesting.medium.com/grpc-http-basic-auth-oauth2-bearer-tokens-f088b5a2314
- https://shijuvar.medium.com/writing-grpc-interceptors-in-go-bf3e7671fe48
- https://github.com/johanbrandhorst/grpc-auth-example
- https://dev.to/techschoolguru/use-grpc-interceptor-for-authorization-with-jwt-1c5h - some nice examples of the auth, jwt, users, mutex

### GRPC PROTO EXAMPLES
- https://github.com/mortenson/grpc-game-example/blob/master/proto/main.proto
- https://github.com/stevejgordon/gRPC-Demos/blob/master/Proto/weather.proto
- https://github.com/cirocosta/gupload/blob/master/messaging/service.proto
- https://github.com/jergoo/go-grpc-tutorial/blob/master/src/proto/compile.sh - compiling more protos
- https://github.com/zhuge20100104/grpc-demo/blob/master/grpc-15/server/gen.bat - also compiling more protos (also cert example)

### GRPC Videos
- https://www.youtube.com/watch?v=QmIdWTidEa8 - simple example

### GRPC Articles
- https://itnext.io/using-grpc-with-tls-golang-and-react-no-envoy-92e898bf8463 - WEB+GRPC+REACT no envoy
- https://medium.com/swlh/building-a-realtime-dashboard-with-reactjs-go-grpc-and-envoy-7be155dfabfb - WEB with envoy, but nice STREAM example


## General info
- https://quii.gitbook.io/learn-go-with-tests/build-an-application/json - go with tests (tdd)
- https://github.com/drone/drone/blob/master/store/batch/batch_test.go - great place for referencing stuff, like store, postgres, tests