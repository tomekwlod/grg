cert:
	(cd cert && /bin/bash cert.sh)

protogen:
	(cd proto \
		&& protoc ping.proto     --js_out=import_style=commonjs,binary:./../ui/bookingapp/src/proto/ --grpc-web_out=import_style=commonjs,mode=grpcwebtext:./../ui/bookingapp/src/proto/ --go-grpc_out=./../pb/ --go_out=./../pb/ \
		&& protoc users.proto    --js_out=import_style=commonjs,binary:./../ui/bookingapp/src/proto/ --grpc-web_out=import_style=commonjs,mode=grpcwebtext:./../ui/bookingapp/src/proto/ --go-grpc_out=./../pb/ --go_out=./../pb/ \
		&& protoc auth.proto     --js_out=import_style=commonjs,binary:./../ui/bookingapp/src/proto/ --grpc-web_out=import_style=commonjs,mode=grpcwebtext:./../ui/bookingapp/src/proto/ --go-grpc_out=./../pb/ --go_out=./../pb/ \
		&& protoc office.proto   --js_out=import_style=commonjs,binary:./../ui/bookingapp/src/proto/ --grpc-web_out=import_style=commonjs,mode=grpcwebtext:./../ui/bookingapp/src/proto/ --go-grpc_out=./../pb/ --go_out=./../pb/ \
		&& protoc resource.proto --js_out=import_style=commonjs,binary:./../ui/bookingapp/src/proto/ --grpc-web_out=import_style=commonjs,mode=grpcwebtext:./../ui/bookingapp/src/proto/ --go-grpc_out=./../pb/ --go_out=./../pb/ \
		&& protoc order.proto    --js_out=import_style=commonjs,binary:./../ui/bookingapp/src/proto/ --grpc-web_out=import_style=commonjs,mode=grpcwebtext:./../ui/bookingapp/src/proto/ --go-grpc_out=./../pb/ --go_out=./../pb/ \
		&& protoc monitor.proto  --js_out=import_style=commonjs,binary:./../ui/bookingapp/src/proto/ --grpc-web_out=import_style=commonjs,mode=grpcwebtext:./../ui/bookingapp/src/proto/ --go-grpc_out=./../pb/ --go_out=./../pb/ \
	)

frontinit:
	(cd ui/bookingapp/ && yarn)
frontbuild:
	(cd ui/bookingapp/ && yarn build)

docker:
	docker-compose up --build -d

# run migrations locally
mup:
	go run cmd/migrate/migrate.go up
mupone:
	go run cmd/migrate/migrate.go oneup
mdown:
	go run cmd/migrate/migrate.go down
mdownone:
	go run cmd/migrate/migrate.go onedown

run:
	go run .
fbrun: frontbuild run
frun: 
	(cd ui/bookingapp/ && yarn start)

gotest:
	go test ./...
gocov:
	go test ./... -coverprofile coverage.out
	go tool cover -html=coverage.out -o coverage.html
# (mkdir -p services/mock_users  && cd pb && mockgen github.com/tomekwlod/grg/pb UserServiceClient   > ../services/mock_users/user_mock.go)
# (mkdir -p services/mock_office && cd pb && mockgen github.com/tomekwlod/grg/pb OfficeServiceClient > ../services/mock_office/office_mock.go)

.PHONY: \
	cert \
	docker \
	protogen \
	run