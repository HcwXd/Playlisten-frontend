import React, { Component } from 'react';

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
      <div className="w-96 h-64 shadow cursor-pointer">
        <div
          className="relative"
          onMouseEnter={this.handleHoverInCover}
          onMouseLeave={this.handleHoverOutCover}>
          {this.state.isHoverOnCover ? (
            <a href={`/playlist?listId=${id}`}>
              <div className="absolute w-full h-full bg-black-75 flex items-center justify-around">
                <h3 className="text-4xl text-white">{name}</h3>
              </div>
            </a>
          ) : null}
          <div className="w-96 h-64 border">
            <img className="w-full h-full" src={cover} alt="Cover" />
          </div>
        </div>
      </div>
    );
  }
}

export default PlaylistCover;
