"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const amazon_cognito_identity_js_1 = require("amazon-cognito-identity-js");
const poolData = {
    UserPoolId: 'us-east-1_28qP4WJzA',
    ClientId: '6psv087abii480j4faubr8o2uh'
};
const userPool = new amazon_cognito_identity_js_1.CognitoUserPool(poolData);
exports.default = userPool;
