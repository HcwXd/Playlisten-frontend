import React, { Component } from 'react';
import { Router, Link } from '../../routes';
import './style.scss';

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="mt-32 flex items-center justify-around">
        <div className="w-4/5 flex items-center flex-col">
          <div className="title_wrap">
            <div className="rotate_wrap">
              <div className="circle"></div>
              <div className="dot"></div>
            </div>
            <div className="title_row">
              <h1 className="playlist">Playlist</h1>
              <h1 className="listen">Listen</h1>
            </div>
          </div>
          <h2 className="mt-24 text-4xl">Share and Discover Your Playlist</h2>
          <div className="mt-8 flex">
            <a href="/explore">
              <div className="trial_btn">Discover Playlist</div>
            </a>
            <a href="/signup">
              <div className="signup_btn">Sign up now</div>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Homepage;
