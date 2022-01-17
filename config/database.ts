import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";
import { CognitoIdentityClient } from '@aws-sdk/client-cognito-identity'

const connectDB = (token: string) => {
    const ddb = new DynamoDBClient({
        region: 'us-east-1',
        credentials: fromCognitoIdentityPool({
            identityPoolId: 'us-east-1:2e68a01b-ad44-4714-a806-5d4adf7627bc',
            logins: {
                'cognito-idp.us-east-1.amazonaws.com/us-east-1_28qP4WJzA': token
            },
            client: new CognitoIdentityClient({ region: 'us-east-1' })
        }),
        endpoint: 'https://dynamodb.us-east-1.amazonaws.com',
        apiVersion: '2012-10-17',
    })

    return ddb
}

export default connectDB 