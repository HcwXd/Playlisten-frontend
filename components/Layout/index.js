import React from 'react';
import Headers from '../../containers/Header';
import Player from '../../containers/Player';

const Layout = props => {
  return (
    <React.Fragment>
      <Headers />
      <Player />
      {props.children}
    </React.Fragment>
  );
};

export default Layout;
