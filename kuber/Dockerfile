FROM golang:1.17.1-alpine as builder

WORKDIR /app

LABEL maintainer="Tomasz Wlodarczyk <tomek.wlod@gmail.com>"

COPY go.mod .
COPY go.sum .
COPY kuber/podrun.sh .
# COPY internal/ ./internal

RUN apk --no-cache add ca-certificates
RUN go mod download

COPY . .

RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o grg

#############
# final stage
# FROM scratch
FROM alpine

WORKDIR /root/

COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
COPY --from=builder /app/grg .
COPY --from=builder /app/kuber/podrun.sh .

CMD [ "/bin/sh", "podrun.sh" ]