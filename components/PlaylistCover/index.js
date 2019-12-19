import React, { Component } from 'react';
import { Router, Link } from '../../routes';

class PlaylistCover extends Component {
  constructor(props) {
    super(props);
    this.state = { isHoverOnCover: false };
    this.handleHoverInCover = this.handleHoverInCover.bind(this);
    this.handleHoverOutCover = this.handleHoverOutCover.bind(this);
  }

  handleHoverInCover() {
    this.setState({ isHoverOnCover: true });
  }

  handleHoverOutCover() {
    this.setState({ isHoverOnCover: false });
  }

  handleClickOnCover() {
    this.props.actions.changeCurrentPlayingSong(
      this.state.playlist.songs[0].sourceId,
      this.state.playlist,
    );
  }

  render() {
    const {
      id,
      name,
      des,
      cover,
      createdAt,
      updatedAt,
      songs,
    } = this.props.playlist;
    return (
      <div className="w-1/3 h-1/3 cursor-pointer p-4">
        <div
          className="relative w-full h-full"
          onMouseEnter={this.handleHoverInCover}
          onMouseLeave={this.handleHoverOutCover}>
          {this.state.isHoverOnCover ? (
            <Link href={`/playlist?listId=${id}`}>
              <div className="absolute w-full h-full bg-black-75 flex items-center justify-around">
                <h3 className="text-2xl text-white text-center">{name}</h3>
              </div>
            </Link>
          ) : null}
          <div className="w-full h-full shadow">
            <img className="w-full h-full" src={cover} alt="Cover" />
          </div>
        </div>
      </div>
    );
  }
}

export default PlaylistCover;
