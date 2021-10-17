import axios from 'axios';
import React, { useState } from 'react';
import GoogleLogin from 'react-google-login';
import { Redirect } from 'react-router';

const LoginPage = (props) => {
  const { user, setUser } = props;
  const [error, setError] = useState('');
  const [redirect, setRedirect] = useState(false);

  if (user) {
    return <Redirect to="/" />;
  }

  const responseGoogle = async (response) => {
    const { tokenId } = response;
    axios
      .post('auth/tokensignin', { token: tokenId })
      .then((res) => {
        const { token } = res.data;
        localStorage.setItem('token', token);
        axios.get('user').then((res) => {
          setUser(res.data);
        });
        setRedirect(true);
      })
      .catch((err) => {
        if (err.response) {
          const res = err.response;
          setError(`Login failed: ${res.status} - ${res.data.message}`);
        } else {
          console.log(err);
        }
      });
  };

  if (redirect) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <GoogleLogin
        clientId={process.env.REACT_APP_CLIENT_ID}
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
      <p>{error}</p>
    </div>
  );
};

export default LoginPage;
