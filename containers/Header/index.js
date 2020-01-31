import React, { Component } from 'react';
import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';
import { Router, Link } from '../../routes';
import * as actions from './actions';
import Logo from '../../static/imgs/logo.png';
import Signup from '../../components/Signup';
import Signin from '../../components/Signin';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { showSignup: false, showSignin: false };
    this.toggleSignupForm = this.toggleSignupForm.bind(this);
    this.toggleSigninForm = this.toggleSigninForm.bind(this);
    this.handleSignout = this.handleSignout.bind(this);
    this.renderLeftHeader = this.renderLeftHeader.bind(this);
    this.renderRightHeader = this.renderRightHeader.bind(this);
  }

  handleSignout() {
    localStorage.clear();
    Router.push({
      pathname: '/',
    });
  }

  toggleSignupForm() {
    this.setState({ showSignup: !this.state.showSignup });
  }

  toggleSigninForm() {
    this.setState({ showSignin: !this.state.showSignin });
  }

  renderLeftHeader() {
    return (
      <nav className="flex items-center">
        <a href="/">
          <img className="h-6 mr-4" src={Logo} />
        </a>
        <div data-name="/explore" className="p-2 ml-8">
          <Link href="/explore" prefetch>
            <a>Explore</a>
          </Link>
        </div>
      </nav>
    );
  }

  renderRightHeader() {
    const isMember = process.browser && localStorage.getItem('userId');
    return (
      <nav className="flex items-center">
        {isMember ? (
          <React.Fragment>
            <div data-name="/profile" className="p-2 ml-8">
              <div className="flex items-center justify-between">
                <a
                  href={`/profile?userId=${localStorage.getItem('userId')}`}
                  className="cursor-pointer">
                  Profile
                </a>
              </div>
            </div>
            <div data-name="/publish" className="p-2 ml-8">
              <Link href="/publish" prefetch>
                <a>Publish</a>
              </Link>
            </div>
            <div data-name="/signout" className="p-2 ml-8">
              <a className="cursor-pointer" onClick={this.handleSignout}>
                Sign out
              </a>
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div data-name="/signup" className="p-2 ml-8">
              <a className="cursor-pointer" onClick={this.toggleSignupForm}>
                Sign up
              </a>
            </div>
            <div data-name="/signin" className="p-2 ml-8">
              <a className="cursor-pointer" onClick={this.toggleSigninForm}>
                Sign in
              </a>
            </div>
          </React.Fragment>
        )}
      </nav>
    );
  }

  render() {
    return (
      <React.Fragment>
        {this.state.showSignup && (
          <Signup toggleSignupForm={this.toggleSignupForm} />
        )}
        {this.state.showSignin && (
          <Signin toggleSigninForm={this.toggleSigninForm} />
        )}
        <div
          id="top-header"
          className="top-0 left-0 right-0 z-20 flex items-center justify-between fixed shadow py-2 px-4 bg-white">
          {this.renderLeftHeader()}
          {this.renderRightHeader()}
        </div>
      </React.Fragment>
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
