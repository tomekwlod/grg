## GRPC-React-Go

### Installation of protoc-gen-grpc-web 
<!-- arch -arm64 brew install protoc-gen-grpc-web -->
Download protoc-gen-grpc-web from: https://github.com/grpc/grpc-web/releases
sudo mv ~/Downloads/protoc-gen-grpc-web-1.3.0-darwin-x86_64 /usr/local/bin/protoc-gen-grpc-web
chmod +x /usr/local/bin/protoc-gen-grpc-web
In case of error like: `“protoc-gen-grpc-web” cannot be opened because the developer cannot be verified` follow this: `https://github.com/grpc/grpc-web/issues/650#issuecomment-541318522`

### Generate pb files
- `make protogen`

### Build and Run frontend
- `make frun`
- open localhost:8080
- in case of error like: `service_grpc_web_pb.js:101 Uncaught TypeError: Cannot read properties of undefined (reading 'MethodInfo')` follow this: `https://stackoverflow.com/a/69582682/1800372` (basically you need to be sure you're usign the version 1.3.0 or above of `protoc-gen-grpc-web`)

### Run (and build) frontend and backend
- `make fbrun`

### Testing
- `make gotest` - just test
- `make gocov` - test and coverage