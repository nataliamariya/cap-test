import React, { useState } from 'react';
import './Login.css';
import Signup from './Signup';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import { UserPool } from '../CognitoConfig';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);

  const handleLogin = () => {
    const user = new CognitoUser({ Username: email, Pool: UserPool });
    const authDetails = new AuthenticationDetails({ Username: email, Password: password });

    user.authenticateUser(authDetails, {
      onSuccess: (result) => {
        const sessionData = {
          username: email,
          token: result.getIdToken().getJwtToken(),
        };
        localStorage.setItem('cognitoSession', JSON.stringify(sessionData));
        onLogin(email, password);
      },
      onFailure: (err) => {
        alert(err.message || JSON.stringify(err));
      },
    });
  };

  return (
    <div className="login-container">
      <h1>{isSignup ? 'Create an account' : 'Sign in'}</h1>
      {isSignup ? (
        <Signup onSignup={(email, password) => {
          setEmail(email);
          setPassword(password);
          setIsSignup(false);
        }} />
      ) : (
        <>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
          <button onClick={() => setIsSignup(true)}>Sign Up</button>
        </>
      )}
    </div>
  );
};

export default Login;
