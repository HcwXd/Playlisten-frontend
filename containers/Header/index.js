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
    this.toggleMessageBox = this.toggleMessageBox.bind(this);
    this.toggleSignupForm = this.toggleSignupForm.bind(this);
    this.toggleSigninForm = this.toggleSigninForm.bind(this);
    this.handleSignout = this.handleSignout.bind(this);
  }

  toggleMessageBox() {
    this.setState({ openMessage: !this.state.openMessage });
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

  render() {
    return (
      <>
        {this.state.showSignup && (
          <Signup toggleSignupForm={this.toggleSignupForm} />
        )}
        {this.state.showSignin && (
          <Signin toggleSigninForm={this.toggleSigninForm} />
        )}
        <div
          id="top-header"
          className="top-0 left-0 right-0 z-20 flex items-center justify-between fixed shadow py-2 px-4 bg-white">
          <img className="h-6 mr-4" src={Logo} />
          <nav className="flex items-center">
            {process.browser && localStorage.getItem('userId') ? (
              <>
                <div data-name="/profile" className="p-2 ml-8">
                  <Link
                    href={`/profile?userId=${localStorage.getItem('userId')}`}
                    prefetch>
                    <div className="flex items-center justify-between">
                      {/**
                <img
                  className="w-8 h-8 rounded-full mr-4"
                  src={
                    'https://scontent-tpe1-1.xx.fbcdn.net/v/t1.0-1/c0.0.1904.1904a/69681988_2392214307542292_5502145657873367040_o.jpg?_nc_cat=104&_nc_oc=AQleVdZ81D-o5Cij9mV4HOneYEW8Hb1u2Jj-ZoSYuRIguAE8258P6KYqg-MT2Gydncc&_nc_ht=scontent-tpe1-1.xx&oh=1c795b32174f6f844db9981b44114874&oe=5E2E4F6B'
                  }
                />
                 */}

                      <a className="cursor-pointer">Profile</a>
                    </div>
                  </Link>
                </div>
                <div data-name="/publish" className="p-2 ml-8">
                  <Link href="/publish" prefetch>
                    <a>Publish</a>
                  </Link>
                </div>
              </>
            ) : null}

            {process.browser && localStorage.getItem('userId') ? (
              <div data-name="/publish" className="p-2 ml-8">
                <a className="cursor-pointer" onClick={this.handleSignout}>
                  Sign out
                </a>
              </div>
            ) : (
              <>
                <div data-name="/publish" className="p-2 ml-8">
                  <a className="cursor-pointer" onClick={this.toggleSignupForm}>
                    Sign up
                  </a>
                </div>
                <div data-name="/publish" className="p-2 ml-8">
                  <a className="cursor-pointer" onClick={this.toggleSigninForm}>
                    Sign in
                  </a>
                </div>
              </>
            )}
          </nav>
        </div>
      </>
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
