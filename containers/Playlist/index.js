import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { gql } from 'apollo-boost';
import { connect } from 'react-redux';
import { NextSeo } from 'next-seo';

import Loader from '../../components/Loader';
import ConfirmModal from '../../components/ConfirmModal';
import { Router, Link } from '../../routes';
import * as actions from './actions';
import HoverableIcon from '../../components/HoverableIcon';
import EditIcon from '../../static/imgs/edit.svg';
import DeleteIcon from '../../static/imgs/delete.svg';
import PlayIcon from '../../static/imgs/play.svg';
import PlayHoverIcon from '../../static/imgs/play-hover.svg';
import { convertYoutubeDurationToMinSec } from '../../utils/generalUtils';

const GET_PLAYLIST = gql`
  query($listId: String!) {
    playlist(listId: $listId) {
      owner {
        name
        id
      }
      id
      name
      des
      cover
      createdAt
      updatedAt
      songs {
        sourceId
        name
        cover
        duration
      }
    }
  }
`;

const DELETE_PLAYLIST = gql`
  mutation($listId: DeletePlaylistInput!) {
    deletePlaylist(data: $listId) {
      listId
    }
  }
`;

class Playlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isHoverOnCover: false,
      listId: null,
      playlist: null,
      showDeleteConfirm: false,
    };
    this.handleHoverInCover = this.handleHoverInCover.bind(this);
    this.handleHoverOutCover = this.handleHoverOutCover.bind(this);
    this.handleChangeCurrentPlayingSong = this.handleChangeCurrentPlayingSong.bind(
      this,
    );
    this.fetchPlaylist = this.fetchPlaylist.bind(this);
    this.renderPlaylist = this.renderPlaylist.bind(this);
    this.handleClickOnCover = this.handleClickOnCover.bind(this);
    this.deletePlaylist = this.deletePlaylist.bind(this);
    this.toggleShowDeletePlaylist = this.toggleShowDeletePlaylist.bind(this);
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    const params = new URLSearchParams(window.location.search);
    const listId = params.get('listId');
    const data = await this.fetchPlaylist(this.props.client, listId);
    const { playlist } = data;
    this.setState({ listId, playlist, isLoading: false });
  }

  handleHoverInCover() {
    this.setState({ isHoverOnCover: true });
  }

  handleHoverOutCover() {
    this.setState({ isHoverOnCover: false });
  }

  handleChangeCurrentPlayingSong(e) {
    this.props.actions.changeCurrentPlayingSong(
      e.target.dataset.id,
      this.state.playlist,
    );
  }

  handleClickOnCover() {
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

  async deletePlaylist() {
    const { client } = this.props;
    const listId = { listId: this.state.listId };
    const { data } = await client.mutate({
      mutation: DELETE_PLAYLIST,
      variables: { listId },
    });
    document.location.href = `/profile?userId=${localStorage.getItem(
      'userId',
    )}`;
  }

  toggleShowDeletePlaylist() {
    this.setState({ showDeleteConfirm: !this.state.showDeleteConfirm });
  }

  renderPlaylist() {
    if (!this.state.playlist) return null;
    const { cover, des, name, songs, owner, createdAt } = this.state.playlist;
    const timestamp = new Date(createdAt);

    return (
      <div className="flex flex-col border w-full lg:w-8/12 ">
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
                  onClick={this.handleClickOnCover}
                />
              </div>
            ) : null}
            <div className="w-96 h-64 border">
              <img className="w-full h-full" src={cover} alt="Cover" />
            </div>
          </div>
          <div className="flex flex-col justify-between h-96 w-3/4">
            <div>
              <div className="flex justify-between w-full p-4 pb-0">
                <h1 className="text-4xl font-bold">{name}</h1>{' '}
                <div className="text-gray-600">
                  {timestamp.toLocaleDateString()}
                </div>
              </div>
              <div className="flex items-center">
                <div className="px-4">
                  by{' '}
                  <Link href={`/profile?userId=${owner.id}`} prefetch>
                    <span className="text-gray-600 cursor-pointer">
                      {owner.name}
                    </span>
                  </Link>
                </div>
              </div>
              <div className="px-4 pt-2">
                <p>{des}</p>
              </div>
            </div>
            <div className="p-2 w-full flex items-center">
              <div
                className="mr-2 items-center text-black p-2 border cursor-pointer hover:bg-gray-100 rounded flex justify-around"
                onClick={this.handleClickOnCover}>
                <img className="w-4 h-4 mr-2" src={PlayHoverIcon} /> Play
              </div>
              {process.browser &&
              owner.id === localStorage.getItem('userId') ? (
                <React.Fragment>
                  <div
                    className="mr-2 items-center text-black p-2 border cursor-pointer hover:bg-gray-100 rounded flex justify-around"
                    onClick={() => {
                      Router.push({
                        pathname: '/edit',
                        query: { listId: this.state.listId },
                      });
                    }}>
                    <img className="w-4 h-4 mr-2" src={EditIcon} />
                    Edit
                  </div>
                  <div
                    className="mr-2 items-center text-black p-2 border cursor-pointer hover:bg-gray-100 rounded flex justify-around"
                    onClick={this.toggleShowDeletePlaylist}>
                    <img className="w-4 h-4 mr-2" src={DeleteIcon} />
                    Delete
                  </div>
                </React.Fragment>
              ) : null}
            </div>
          </div>
        </div>
        <ul className="songlist_wrap flex flex-col w-full border">
          {songs.map(
            (
              { sourceId, name: songName, cover: songCover, duration },
              index,
            ) => (
              <li
                key={sourceId}
                className="hover:bg-gray-100 cursor-pointer border-b flex items-center justify-between"
                data-id={sourceId}
                onClick={this.handleChangeCurrentPlayingSong}>
                <div className="flex items-center" data-id={sourceId}>
                  <div className="w-12 text-right p-4" data-id={sourceId}>
                    {index + 1}
                  </div>
                  <div data-id={sourceId}>{songName}</div>
                </div>
                <div className="p-4" data-id={sourceId}>
                  <div data-id={sourceId}>
                    {convertYoutubeDurationToMinSec(duration)}
                  </div>
                </div>
              </li>
            ),
          )}
        </ul>
      </div>
    );
  }

  render() {
    const { metaData } = this.props;
    const { playlist } = this.state;
    const metaTitle = metaData
      ? `${metaData.playlistName} by ${metaData.ownerName}`
      : playlist
      ? `${playlist.name} by ${playlist.owner.name}`
      : 'Playlisten';
    return (
      <React.Fragment>
        <NextSeo
          title={metaTitle}
          description="Playlisten - Share and Discover Music Playlist"
          openGraph={{
            type: 'website',
            title: metaTitle,
            description: 'Playlisten - Share and Discover Music Playlist',
          }}
        />
        {this.state.showDeleteConfirm ? (
          <ConfirmModal
            title={'Do you want to delete this playlist?'}
            rightAction={this.deletePlaylist}
            leftAction={this.toggleShowDeletePlaylist}
            rightLabel={'Delete'}
            leftLabel={'Cancel'}
          />
        ) : null}
        <div id="playlist" className="py-20 flex items-center justify-around">
          {this.state.isLoading && <Loader />}
          {this.state.listId && this.renderPlaylist()}
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
function mapStateToProps({ PlaylistContainerReducer }) {
  return {
    PlaylistReducer: PlaylistContainerReducer,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Playlist);
