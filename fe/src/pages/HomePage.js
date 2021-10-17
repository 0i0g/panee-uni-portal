import React, { useState } from 'react';
import { Redirect } from 'react-router';
import LecturerHome from '../components/LecturerHome';
import StudentHome from '../components/StudentHome';
import { Role } from '../helper/constants';

const HomePage = (props) => {
  const { user, setUser } = props;
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  let component;

  if (user?.role === Role.lecturer) {
    component = <LecturerHome />;
  } else if (user?.role === Role.student) {
    component = <StudentHome />;
  }

  const logout = () => {
    localStorage.clear();
    setUser(null);
    setRedirectToLogin(true);
  };

  if (redirectToLogin) {
    console.log(3);
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <div className="container px-56 mx-auto">
        <div className="flex flex-row items-center justify-between">
          <p className="font-mono text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-indigo-400 to-indigo-600">
            {process.env.REACT_APP_LOGO}
          </p>
          <div className="p-3">
            <img src={user?.picture} alt="logo" className="h-16 rounded-full" />
          </div>
        </div>
        <div className="flex flex-row justify-end px-3 py-1 bg-gray-200 rounded-md">
          <span className="inline-flex px-2 py-1 text-xs font-bold leading-none text-white bg-yellow-500 rounded-full ">
            {user?.role}
          </span>
          <span className="inline-flex px-2 py-1 ml-2 text-xs font-bold leading-none text-white bg-green-400 rounded-full ">
            {user?.email}
          </span>
          <button
            className="inline-flex px-2 py-1 ml-2 text-xs font-bold leading-none text-white transition bg-gray-400 rounded-full hover:bg-gray-600"
            onClick={logout}>
            logout
          </button>
        </div>
        <main className="mt-3">{component}</main>
      </div>
    </div>
  );
};

export default HomePage;
