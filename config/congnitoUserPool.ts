import { CognitoUserPool } from 'amazon-cognito-identity-js'
import { PoolData } from '../types'

const poolData: PoolData = {
    UserPoolId: 'us-east-1_28qP4WJzA',
    ClientId: '6psv087abii480j4faubr8o2uh'
}

const userPool = new CognitoUserPool(poolData)

export default userPool