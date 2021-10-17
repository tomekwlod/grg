cert:
	(cd cert && /bin/bash cert.sh)

protogen:
	(cd pingpong && protoc service.proto --js_out=import_style=commonjs,binary:./../ui/pingpongapp/src/proto/ --grpc-web_out=import_style=commonjs,mode=grpcwebtext:./../ui/pingpongapp/src/proto/ --go-grpc_out=. --go_out=.)

frontinit:
	(cd ui/pingpongapp/ && yarn)
frontbuild:
	(cd ui/pingpongapp/ && yarn build)


setup:
	(rm -rf pingpong/*.pb.go && rm -rf ui/pingpongapp/src/proto/*)
	make frontinit
	make protogen
	make frontbuild

run:
	go run .