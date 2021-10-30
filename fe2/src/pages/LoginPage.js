import React, { useState } from 'react';
import GoogleLogin from 'react-google-login';
import authService from '../services/auth.service';

const LoginPage = ({ history }) => {
  const [errorMessage, setErrorMessage] = useState(null);

  const responseGoogle = (response) => {
    authService
      .login(response)
      .then((res) => {
        history.push('/');
      })
      .catch((err) => setErrorMessage(err.message));
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div>
        <p class="font-mono text-4xl font-bold leading-10 text-transparent  sm:text-5xl sm:leading-none md:text-6xl bg-clip-text bg-gradient-to-br from-indigo-400 to-indigo-600">
          {process.env.REACT_APP_LOGO}
        </p>
        <GoogleLogin
          clientId={process.env.REACT_APP_CLIENT_ID}
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
          theme="dark"
        />
        <p className="font-bold text-red-500">{errorMessage}</p>
      </div>
    </div>
  );
};

export default LoginPage;
