cert:
	(cd cert && /bin/bash cert.sh)

protogen:
	(cd proto \
		&& protoc ping.proto  --js_out=import_style=commonjs,binary:./../ui/pingpongapp/src/proto/ --grpc-web_out=import_style=commonjs,mode=grpcwebtext:./../ui/pingpongapp/src/proto/ --go-grpc_out=./../pb/ --go_out=./../pb/ \
		&& protoc users.proto --js_out=import_style=commonjs,binary:./../ui/pingpongapp/src/proto/ --grpc-web_out=import_style=commonjs,mode=grpcwebtext:./../ui/pingpongapp/src/proto/ --go-grpc_out=./../pb/ --go_out=./../pb/ \
		&& protoc auth.proto  --js_out=import_style=commonjs,binary:./../ui/pingpongapp/src/proto/ --grpc-web_out=import_style=commonjs,mode=grpcwebtext:./../ui/pingpongapp/src/proto/ --go-grpc_out=./../pb/ --go_out=./../pb/ \
	)

frontinit:
	(cd ui/pingpongapp/ && yarn)
frontbuild:
	(cd ui/pingpongapp/ && yarn build)

docker:
	docker-compose up --build -d

# run migrations locally
mup:
	go run cmd/migrate/migrate.go up
moneup:
	go run cmd/migrate/migrate.go oneup
mdown:
	go run cmd/migrate/migrate.go down
monedown:
	go run cmd/migrate/migrate.go onedown

setup:
	(rm -rf pingpong/*.pb.go && rm -rf ui/pingpongapp/src/proto/*)
	make frontinit
	make protogen
	make frontbuild

run:
	go run .
fbrun: frontbuild run
frun: 
	(cd ui/pingpongapp/ && yarn start)