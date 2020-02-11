import React, { Component } from 'react';
import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';
import { Router, Link } from '../../routes';
import * as actions from './actions';
import Logo from '../../static/imgs/logo.png';
import Signup from '../../components/Signup';
import Signin from '../../components/Signin';
import MenuIcon from '../../static/imgs/menu.svg';
import CancelIcon from '../../static/imgs/cancel-hover.svg';
import AuthAPI from '../../utils/api/apifetcher/auth';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      showSignup: false,
      showSignin: false,
      showMobileMenu: false,
    };
    this.toggleSignupForm = this.toggleSignupForm.bind(this);
    this.toggleSigninForm = this.toggleSigninForm.bind(this);
    this.handleSignout = this.handleSignout.bind(this);
    this.renderLeftHeader = this.renderLeftHeader.bind(this);
    this.renderRightHeader = this.renderRightHeader.bind(this);
    this.toggleShowMobileMenu = this.toggleShowMobileMenu.bind(this);
    this.renderMobileMenu = this.renderMobileMenu.bind(this);
  }

  async handleSignout() {
    localStorage.clear();
    this.setState({
      isLogin: false,
      showSignup: false,
      showSignin: false,
      showMobileMenu: false,
    });
    await AuthAPI.signOut();
    window.location = window.location;
  }

  componentDidMount() {
    if (process.browser && localStorage.getItem('userId')) {
      this.setState({ isLogin: true });
    }
  }

  toggleSignupForm() {
    this.setState({
      showSignup: !this.state.showSignup,
      showMobileMenu: false,
    });
  }

  toggleSigninForm() {
    this.setState({
      showSignin: !this.state.showSignin,
      showMobileMenu: false,
    });
  }

  renderLeftHeader() {
    return (
      <React.Fragment>
        {/* Desktop header */}
        <nav className="hidden md:flex items-center">
          <a href="/">
            <img className="h-6 mr-4" src={Logo} />
          </a>
          <div data-name="/explore" className="p-2 ml-8">
            <Link href="/explore" prefetch>
              <a>Explore</a>
            </Link>
          </div>
        </nav>
        {/* Mobile header */}
        <nav className="flex items-center md:hidden">
          <a href="/">
            <img className="h-6 mr-4" src={Logo} />
          </a>
        </nav>
      </React.Fragment>
    );
  }

  renderRightHeader() {
    const isMember = process.browser && localStorage.getItem('userId');
    return (
      <React.Fragment>
        {/* Desktop header */}
        <nav className="hidden md:flex items-center">
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
        {/* Mobile header */}
        <nav className="flex md:hidden items-center">
          <img
            className="p-2"
            src={MenuIcon}
            onClick={this.toggleShowMobileMenu}
          />
        </nav>
      </React.Fragment>
    );
  }

  toggleShowMobileMenu() {
    this.setState({ showMobileMenu: !this.state.showMobileMenu });
  }

  renderMobileMenu() {
    const isMember = process.browser && localStorage.getItem('userId');

    return (
      <div className="fixed w-full h-full flex bg-black z-100">
        <div className="absolute right-0 py-2 px-4">
          <img
            className="p-2"
            src={CancelIcon}
            onClick={this.toggleShowMobileMenu}
          />
        </div>
        <nav className="flex flex-col py-2 px-4 text-gray-500 text-2xl">
          {isMember ? (
            <React.Fragment>
              <div data-name="/explore" className="p-2 mb-2">
                <Link href="/explore" prefetch>
                  <a className="cursor-pointer">Explore</a>
                </Link>
              </div>
              <div data-name="/profile" className="p-2 mb-2">
                <div className="flex items-center justify-between">
                  <a
                    href={`/profile?userId=${localStorage.getItem('userId')}`}
                    className="cursor-pointer">
                    Profile
                  </a>
                </div>
              </div>
              <div data-name="/publish" className="p-2 mb-2">
                <Link href="/publish" prefetch>
                  <a className="cursor-pointer">Publish</a>
                </Link>
              </div>
              <div data-name="/signout" className="p-2 mb-2">
                <a className="cursor-pointer" onClick={this.handleSignout}>
                  Sign out
                </a>
              </div>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <div data-name="/explore" className="p-2 mb-2">
                <Link href="/explore" prefetch>
                  <a className="cursor-pointer">Explore</a>
                </Link>
              </div>
              <div data-name="/signup" className="p-2 mb-2">
                <a className="cursor-pointer" onClick={this.toggleSignupForm}>
                  Sign up
                </a>
              </div>
              <div data-name="/signin" className="p-2 mb-2">
                <a className="cursor-pointer" onClick={this.toggleSigninForm}>
                  Sign in
                </a>
              </div>
            </React.Fragment>
          )}
        </nav>
      </div>
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
        {this.state.showMobileMenu && this.renderMobileMenu()}
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
