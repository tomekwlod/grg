#!/bin/bash

######################
# Become a Certificate Authority
######################

# Generate private key
openssl genrsa -des3 -out ca.key 2048
# Generate root certificate
openssl req -x509 -new -nodes -key ca.key -sha256 -days 825 -out ca.cert

######################
# Create CA-signed certs
######################

# Generate a private key
openssl genrsa -out server.key 2048
# Create a certificate-signing request
openssl req -new -key server.key -out server.csr  -config certificate.conf
# Create a config file for the extensions
# Create the signed certificate
openssl x509 -req -in server.csr -CA ca.cert -CAkey ca.key -CAcreateserial \
-out server.crt -days 825 -sha256 -extfile certificate.conf -extensions req_ext