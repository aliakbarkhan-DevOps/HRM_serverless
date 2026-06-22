#!/bin/bash
for SERVICE in lambda-authorizer auth-service employee-service attendance-service; do
  cd services/$SERVICE
  npm init -y
  npm install express serverless-http pg jsonwebtoken dotenv bcryptjs
  npm install -D serverless serverless-offline
  cd ../..
done
