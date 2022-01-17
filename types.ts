// CALLS
export interface CallProps {
    id: string,
    phoneNumber: string,
    date: string,
    status: string,
    step: string,
    status_date: string
}

export interface CreateParams {
    TableName: string,
    Item: {
        id: { S: string },
        phoneNumber: { S: string },
        date: { S: string },
        status: { S: string },
        step: { S: string },
        status_date: { S: string }
    }
}

export interface GetCallByID {
    TableName: string,
    Key: {
        id: { S: string }
    }
}

// Cognito user pool
export interface PoolData {
    UserPoolId: string,
    ClientId: string
}

// USERS
export interface DataName {
    Name: string,
    Value: string
}

export interface AuthData {
    Username: string,
    Password: string
}