import React, { Component } from 'react';
import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';
import { Router, Link } from '../../routes';
import * as actions from './actions';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div
        id="top-header"
        className="top-0 left-0 right-0 z-20 flex items-center justify-between fixed shadow py-2 px-4 bg-white">
        <div className="p-2">Playlisten</div>
        <nav className="flex items-center">
          <div data-name="/profile" className="p-2 ml-8">
            <Link href="/profile" prefetch>
              <a>Profile</a>
            </Link>
          </div>
          <div data-name="/publish" className="p-2 ml-8">
            <Link href="/publish" prefetch>
              <a>Publish</a>
            </Link>
          </div>
          <div data-name="/signup" className="p-2 ml-8">
            <Link href="/signup" prefetch>
              <a>Signup</a>
            </Link>
          </div>
          <div data-name="/login" className="p-2 ml-8">
            <Link href="/login" prefetch>
              <a>Login</a>
            </Link>
          </div>
        </nav>
      </div>
    );
  }
}
/**
 * Redux needed implement
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}
function mapStateToProps({ HeaderContainerReducer }) {
  return {
    HeaderReducer: HeaderContainerReducer,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
