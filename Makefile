cert:
	(cd cert && /bin/bash cert.sh)

pgen:
	(cd pingpong && protoc service.proto --js_out=import_style=commonjs,binary:./../ui/src/ --grpc-web_out=import_style=commonjs,mode=grpcwebtext:./../ui/src/ --go-grpc_out=. --go_out=.)
	# (cd protos && protoc --go_out=plugins=grpc:../server sensor.proto )