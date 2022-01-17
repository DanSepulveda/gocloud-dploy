"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const credential_provider_cognito_identity_1 = require("@aws-sdk/credential-provider-cognito-identity");
const client_cognito_identity_1 = require("@aws-sdk/client-cognito-identity");
const connectDB = (token) => {
    const ddb = new client_dynamodb_1.DynamoDBClient({
        region: 'us-east-1',
        credentials: (0, credential_provider_cognito_identity_1.fromCognitoIdentityPool)({
            identityPoolId: 'us-east-1:2e68a01b-ad44-4714-a806-5d4adf7627bc',
            logins: {
                'cognito-idp.us-east-1.amazonaws.com/us-east-1_28qP4WJzA': token
            },
            client: new client_cognito_identity_1.CognitoIdentityClient({ region: 'us-east-1' })
        }),
        endpoint: 'https://dynamodb.us-east-1.amazonaws.com',
        apiVersion: '2012-10-17',
    });
    return ddb;
};
exports.default = connectDB;
