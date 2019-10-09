import React, { Component } from 'react';
import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';
import cx from 'classnames';
import { Router, Link } from '../../routes';
import * as actions from './actions';

class Playlist extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div id="playlist" className="py-20 flex items-center justify-around">
        <div className="flex flex-col border w-5/12">
          <div className="flex items-center">
            <img
              className="rounded-full w-8 h-8 ml-4"
              src="https://avatars3.githubusercontent.com/u/32091985?s=460&v=4"
            />
            <div className="p-4">winnieehu</div>
          </div>
          <div>
            <img
              className="w-full h-full shadow p-4"
              src={
                'https://image.shutterstock.com/image-vector/grunge-red-sample-word-round-260nw-1242668641.jpg'
              }
              alt="Cover"
            />
          </div>
          <div className="px-4 pt-2">
            <div className="flex justify-between">
              <div className="font-bold">winnieehu</div>
              <div className="text-gray-600">Jan 1</div>
            </div>
            <p>A playlist that helps you be both high and down.</p>
          </div>
          <div className="comment">
            <div className="px-4">
              <p>
                <span className="font-bold mr-2">horseman</span>A playlist that
                helps you be both high and down. A playlist that helps you be
                both high and down. A playlist that helps you be both high and
                down.
              </p>
            </div>
            <div className="px-4">
              <p>
                <span className="font-bold mr-2">ramenking</span>I love ramen.
              </p>
            </div>
          </div>
          <div className="flex mt-2 ustify-center w-full shadow">
            <input className="p-4 w-full" placeholder="Add a comment" />
            <div className="cursor-pointer p-4 hover:bg-gray-100 flex items-center">
              <p>Send</p>
            </div>
          </div>
        </div>
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
function mapStateToProps({ PlaylistContainerReducer }) {
  return {
    PlaylistReducer: PlaylistContainerReducer,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Playlist);
