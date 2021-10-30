import axios from 'axios';
import jwt from 'jwt-decode';

const isRole = (roles) => {
  try {
    // do not require any role
    if (!roles) return true;

    // require 1 role
    if (typeof roles === 'string') roles = [roles];

    const token = localStorage.getItem('token');
    const user = jwt(token);
    if (!roles.includes(user.role)) {
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
};

const isAuthenticated = () => {
  try {
    const token = localStorage.getItem('token');
    return token && !!jwt(token);
  } catch (error) {
    return false;
  }
};

const getCurrentUser = () => {
  try {
    const token = localStorage.getItem('token');
    const user = jwt(token);
    return user;
  } catch (error) {
    return null;
  }
};

const login = (response) =>
  new Promise((resolve, reject) => {
    const { tokenId } = response;
    axios
      .post('auth/tokensignin', { token: tokenId })
      .then((res) => {
        const { token } = res.data;
        localStorage.setItem('token', token);
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });

const logout = () => {
  localStorage.clear();
};

const authService = {
  login,
  logout,
  isAuthenticated,
  isRole,
  getCurrentUser,
};

export default authService;
