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
        className="fixed top-0 left-0 right-0 z-20 flex items-center justify-between">
        <div>Playlisten</div>
        <nav className="flex items-center mr-0">
          <div data-name="/signup" className="ml-8">
            <Link href="/signup" prefetch>
              <a>signup</a>
            </Link>
          </div>
          <div data-name="/login" className="ml-8">
            <Link href="/login" prefetch>
              <a>login</a>
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
