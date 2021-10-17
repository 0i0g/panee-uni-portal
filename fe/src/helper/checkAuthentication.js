import jwt from 'jwt-decode';

export const isRole = (role) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) return false;
    const user = jwt(token);
    return user.role === role;
  } catch (error) {
    return false;
  }
};
