const jwt = require('jsonwebtoken');

// A simple lambda authorizer
exports.handler = async (event) => {
    const token = event.authorizationToken || event.headers?.Authorization;
    
    if (!token) {
        throw new Error("Unauthorized");
    }

    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET || 'fallback_secret');
        return generatePolicy(decoded.userId, 'Allow', event.methodArn);
    } catch (err) {
        throw new Error("Unauthorized");
    }
};

const generatePolicy = (principalId, effect, resource) => {
    const authResponse = { principalId };
    
    if (effect && resource) {
        const policyDocument = {
            Version: '2012-10-17',
            Statement: [
                {
                    Action: 'execute-api:Invoke',
                    Effect: effect,
                    Resource: resource
                }
            ]
        };
        authResponse.policyDocument = policyDocument;
    }
    return authResponse;
};
