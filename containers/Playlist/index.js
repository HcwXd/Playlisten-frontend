import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { gql } from 'apollo-boost';
import { Query, Mutation, ApolloConsumer } from 'react-apollo';

import { connect } from 'react-redux';
import cx from 'classnames';
import { Router, Link } from '../../routes';
import * as actions from './actions';
import HoverableIcon from '../../components/HoverableIcon';
import PlayIcon from '../../static/imgs/play.svg';
import PlayHoverIcon from '../../static/imgs/play-hover.svg';

const GET_PLAYLIST = gql`
  query($listId: String!) {
    playlist(listId: $listId) {
      owner {
        name
      }
      id
      name
      des
      cover
      createAt
      updateAt
      songs {
        sourceId
        name
        cover
      }
    }
  }
`;

class Playlist extends Component {
  constructor(props) {
    super(props);
    this.state = { isHoverOnCover: false, listId: null, playlist: null };
    this.handleHoverInCover = this.handleHoverInCover.bind(this);
    this.handleHoverOutCover = this.handleHoverOutCover.bind(this);
    this.handleChangeCurrentPlayingSong = this.handleChangeCurrentPlayingSong.bind(
      this,
    );
    this.fetchPlaylist = this.fetchPlaylist.bind(this);
    this.renderPlaylist = this.renderPlaylist.bind(this);
  }

  async componentDidMount() {
    const params = new URLSearchParams(window.location.search);
    const listId = params.get('listId');
    const data = await this.fetchPlaylist(this.props.client, listId);
    const { playlist } = data;
    this.setState({ listId, playlist });
  }

  handleHoverInCover() {
    this.setState({ isHoverOnCover: true });
  }

  handleHoverOutCover() {
    this.setState({ isHoverOnCover: false });
  }

  handleChangeCurrentPlayingSong() {
    this.props.actions.changeCurrentPlayingSong(
      this.state.playlist.songs[0].sourceId,
      this.state.playlist,
    );
  }

  async fetchPlaylist(client, listId) {
    const { data } = await client.query({
      query: GET_PLAYLIST,
      variables: { listId },
    });
    return data;
  }

  renderPlaylist() {
    if (!this.state.playlist) return null;
    console.log(this.state.playlist);

    const { cover, des, name, songs, owner, createAt } = this.state.playlist;

    return (
      <div className="flex flex-col border w-8/12">
        <div className="flex">
          <div
            className="relative"
            onMouseEnter={this.handleHoverInCover}
            onMouseLeave={this.handleHoverOutCover}>
            {this.state.isHoverOnCover ? (
              <div className="absolute w-full h-full bg-black-50 flex items-center justify-around">
                <HoverableIcon
                  size={12}
                  Icon={PlayHoverIcon}
                  HoverIcon={PlayIcon}
                  onClick={this.handleChangeCurrentPlayingSong}
                />
              </div>
            ) : null}
            <div className="w-96 h-64 border">
              <img className="w-full h-full" src={cover} alt="Cover" />
            </div>
          </div>
          <div className="flex flex-col w-3/4">
            <div className="flex justify-between w-full p-4 pb-0">
              <h1 className="text-4xl font-bold">{name}</h1>{' '}
              <div className="text-gray-600">{`${'Jan'} ${1}`}</div>
            </div>
            <div className="flex items-center">
              <div className="px-4">
                by{' '}
                <span className="text-gray-600 cursor-pointer">
                  {owner.name}
                </span>
              </div>
            </div>
            <div className="px-4 pt-2">
              <p>{des}</p>
            </div>
          </div>
        </div>
        <ul className="songlist_wrap flex flex-col w-full border">
          {songs.map(({ sourceId, name: songName, cover: songCover }) => (
            <li
              key={sourceId}
              className="hover:bg-gray-100 cursor-pointer border-b flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-12 text-right p-4">1</div>
                <div>{songName}</div>
              </div>
              <div className="p-4">
                <div>3:52</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  render() {
    if (!this.state.listId) return null;
    return (
      <div id="playlist" className="py-20 flex items-center justify-around">
        {this.renderPlaylist()}
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
