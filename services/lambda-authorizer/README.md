# Lambda Authorizer

Node.js AWS Lambda authorizer function. It validates JWT tokens for incoming API Gateway requests before routing them to the internal microservices.

## Dependencies
- Node.js (v18+)
- jsonwebtoken

## Environment Variables
- `JWT_SECRET`: Secret key used for signing and verifying JSON Web Tokens.

## How to Run

This service is purely designed as an AWS Lambda Authorizer and is not typically run as a standalone local HTTP server. It is invoked directly by AWS API Gateway.

## Functionality
Extracts the `Authorization: Bearer <token>` header from incoming events, verifies it using `jsonwebtoken` and `JWT_SECRET`, and returns an IAM policy document (`Allow` or `Deny`) for the requested API resource.
