import React, { Component } from 'react';
import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';
import { Router, Link } from '../../routes';
import * as actions from './actions';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { openMessage: false };
    this.toggleMessageBox = this.toggleMessageBox.bind(this);
  }

  toggleMessageBox() {
    this.setState({ openMessage: !this.state.openMessage });
  }

  render() {
    return (
      <div
        id="top-header"
        className="top-0 left-0 right-0 z-20 flex items-center justify-between fixed shadow py-2 px-4 bg-white">
        <div className="p-2">Playlisten</div>
        <nav className="flex items-center">
          <div data-name="/profile" className="p-2 ml-8 cursor-pointer">
            <Link href="/profile" prefetch>
              <div className="flex items-center justify-between">
                <img
                  className="w-8 h-8 rounded-full mr-4"
                  src={
                    'https://scontent-tpe1-1.xx.fbcdn.net/v/t1.0-1/c0.0.1904.1904a/69681988_2392214307542292_5502145657873367040_o.jpg?_nc_cat=104&_nc_oc=AQleVdZ81D-o5Cij9mV4HOneYEW8Hb1u2Jj-ZoSYuRIguAE8258P6KYqg-MT2Gydncc&_nc_ht=scontent-tpe1-1.xx&oh=1c795b32174f6f844db9981b44114874&oe=5E2E4F6B'
                  }
                />
                <a>Profile</a>
              </div>
            </Link>
          </div>
          <div
            data-name="/publish"
            className="p-2 ml-8 cursor-pointer"
            onClick={this.toggleMessageBox}>
            <a>Messages</a>
            {this.state.openMessage && (
              <ul
                className="absolute bt-4 zIndex-50 bg-white shadow"
                style={{ right: '25px', top: '60px' }}>
                <li className="p-4 border cursor-pointer hover:bg-gray-100">
                  <div>User1</div>
                  <div className="text-gray-500">
                    Share your song with your friend User1
                  </div>
                </li>
                <li className="p-4 border cursor-pointer hover:bg-gray-100">
                  <div>User2</div>
                  <div className="text-gray-500">
                    Share your song with your friend User2
                  </div>
                </li>
              </ul>
            )}
          </div>
          <div data-name="/publish" className="p-2 ml-8">
            <Link href="/publish" prefetch>
              <a>Publish</a>
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
