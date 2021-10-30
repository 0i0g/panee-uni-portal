import React from 'react';
import Nav from './Nav';

const Layout = ({ children, ...rest }) => {
  return (
    <div>
      <div className="container px-56 mx-auto">
        <Nav {...rest} />
        <main className="mt-3">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
