import React from 'react';
import Headers from '../../containers/Header';
import Player from '../../containers/Player';
import FeedbackIcon from '../FeedbackIcon';

const Layout = props => {
  return (
    <React.Fragment>
      <Headers />
      <Player />
      {props.children}
      <FeedbackIcon />
    </React.Fragment>
  );
};

export default Layout;
