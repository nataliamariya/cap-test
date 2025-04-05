import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: 'us-east-1_D9urg9qxd',
  ClientId: '1a25um765b6i8s4jnj6pg087e',
};

export const UserPool = new CognitoUserPool(poolData);  // Export as named
