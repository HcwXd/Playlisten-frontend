import React from 'react';
import Headers from '../../containers/Header';

const Layout = props => {
  return (
    <React.Fragment>
      <Headers />
      {props.children}
    </React.Fragment>
  );
};

export default Layout;
