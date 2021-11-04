import React from 'react';
import { Link } from 'react-router-dom';
import authService from '../services/auth.service';
import { Role } from '../helpers/constants';

const Nav = ({ history }) => {
  const { pathname } = history.location;
  const user = authService.getCurrentUser();

  const logout = () => {
    authService.logout();
    history.push('/login');
  };

  const linkClassName = (path) => {
    const clsN =
      'mr-5 font-bold text-gray-500 hover:text-gray-700 ease-in link';

    if (path === '/') {
      return pathname === path ? clsN + ' link-active-color ' : clsN;
    }

    return pathname.startsWith(path) ? clsN + ' link-active-color ' : clsN;
  };

  return (
    <div>
      <div className="flex flex-row items-center justify-between">
        <p className="font-mono text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-indigo-400 to-indigo-600">
          {process.env.REACT_APP_LOGO}
        </p>
        <div className="p-3">
          <img src={user?.picture} alt="logo" className="h-16 rounded-full" />
        </div>
      </div>
      <div className="flex flex-row justify-between px-3 py-1 bg-gray-200 rounded-md">
        <div className="flex">
          {authService.isRole(Role.lecturer) ? (
            <>
              <Link to="/" className={linkClassName('/')}>
                <p>Check in</p>
              </Link>
              <Link to="/manageclass" className={linkClassName('/manageclass')}>
                <p>Manage Class</p>
              </Link>
            </>
          ) : (
            ''
          )}
        </div>
        <div>
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
        </div>{' '}
      </div>
    </div>
  );
};

export default Nav;
