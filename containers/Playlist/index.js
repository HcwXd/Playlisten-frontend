import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { gql } from 'apollo-boost';
import { connect } from 'react-redux';
import { NextSeo } from 'next-seo';
import Head from 'next/head';
import anchorme from 'anchorme';
import escape from 'escape-html';

import Loader from '../../components/Loader';
import ConfirmModal from '../../components/ConfirmModal';
import { Router, Link } from '../../routes';
import * as actions from './actions';
import HoverableIcon from '../../components/HoverableIcon';
import EditIcon from '../../static/imgs/edit.svg';
import LikeIcon from '../../static/imgs/heart.svg';
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
      isSaved
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
  mutation($input: DeletePlaylistInput!) {
    deletePlaylist(data: $input) {
      listId
    }
  }
`;

const SAVE_PLAYLIST = gql`
  mutation($input: SavePlaylistInput!) {
    savePlaylist(data: $input) {
      success
    }
  }
`;

const UNSAVE_PLAYLIST = gql`
  mutation($input: DeleteSavedPlaylistInput!) {
    deleteSavedPlaylist(data: $input) {
      success
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
    this.renderPlaylistCover = this.renderPlaylistCover.bind(this);
    this.renderPlaylistInfo = this.renderPlaylistInfo.bind(this);
    this.renderPlaylistSongs = this.renderPlaylistSongs.bind(this);
    this.renderControlPanel = this.renderControlPanel.bind(this);
    this.handleLikePlaylist = this.handleLikePlaylist.bind(this);
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

  renderPlaylistCover() {
    const { cover } = this.state.playlist;
    return (
      <div
        className="relative bg-black flex justify-around"
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
        <div className="w-96 h-64 md:border">
          <img className="w-full h-full" src={cover} alt="Cover" />
        </div>
      </div>
    );
  }

  renderPlaylistInfo() {
    const { des, name, owner, createdAt } = this.state.playlist;
    const timestamp = new Date(createdAt);
    const formattedDesc = {
      __html: anchorme(escape(des).replace(/(?:\r\n|\r|\n)/g, '<br/>'), {
        truncate: 40,
        attributes: [
          {
            name: 'target',
            value: '_blank',
          },
          { name: 'class', value: 'text-gray-600' },
        ],
      }),
    };

    return (
      <div className="flex flex-col justify-between md:w-3/4 w-full">
        <div>
          <div className="flex justify-between w-full p-4 pb-0">
            <h1 className="text-4xl font-bold break-all">{name}</h1>{' '}
            <div className="text-gray-600">
              {timestamp.toLocaleDateString()}
            </div>
          </div>
          <div className="flex items-center">
            <div className="px-4">
              by{' '}
              <a href={`/profile?userId=${owner.id}`}>
                <span className="text-gray-600 cursor-pointer">
                  {owner.name}
                </span>
              </a>
            </div>
          </div>
          <div className="px-4 pt-2 break-all md:h-32 overflow-scroll">
            <div dangerouslySetInnerHTML={formattedDesc} />
          </div>
        </div>
      </div>
    );
  }

  renderPlaylistSongs() {
    const { songs } = this.state.playlist;

    return (
      <ul className="songlist_wrap flex flex-col w-full">
        {songs.map(
          ({ sourceId, name: songName, cover: songCover, duration }, index) => (
            <li
              key={sourceId}
              className="hover:bg-gray-100 cursor-pointer border-b flex items-center justify-between"
              data-id={sourceId}
              onClick={this.handleChangeCurrentPlayingSong}>
              <div className="flex items-center" data-id={sourceId}>
                <div className="w-12 text-right p-4" data-id={sourceId}>
                  {index + 1}
                </div>
                <div className="w-full" data-id={sourceId}>
                  {songName}
                </div>
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
    );
  }

  renderPlaylist() {
    if (!this.state.playlist) return null;

    return (
      <div className="flex flex-col border w-full lg:w-8/12 mb-8">
        <div className="flex flex-col md:flex-row border-b">
          {this.renderPlaylistCover()}
          {this.renderPlaylistInfo()}
        </div>
        {this.renderControlPanel()}
        {this.renderPlaylistSongs()}
      </div>
    );
  }

  async handleLikePlaylist() {
    if (!localStorage.getItem('userId')) {
      alert('Please Sign In');
      return;
    }
    const { client } = this.props;
    const input = {
      listId: this.state.listId,
      userId: localStorage.getItem('userId'),
    };

    const { isSaved } = this.state.playlist;
    if (isSaved) {
      const { data } = await client.mutate({
        mutation: UNSAVE_PLAYLIST,
        variables: { input },
      });
      console.log(data);

      if (data.deleteSavedPlaylist.success) {
        this.setState({ playlist: { ...this.state.playlist, isSaved: false } });
      }
    } else {
      const { data } = await client.mutate({
        mutation: SAVE_PLAYLIST,
        variables: { input },
      });
      console.log(data);

      if (data.savePlaylist.success) {
        this.setState({ playlist: { ...this.state.playlist, isSaved: true } });
      }
    }
  }

  renderControlPanel() {
    const { owner, isSaved } = this.state.playlist;

    return (
      <div className="p-2 w-full flex items-center border-b">
        <div
          className="mr-2 items-center text-black p-2 border cursor-pointer hover:bg-gray-100 rounded flex justify-around"
          onClick={this.handleClickOnCover}>
          <img className="w-4 h-4 mr-2" src={PlayHoverIcon} /> Play
        </div>
        <div
          className="mr-2 items-center text-black p-2 border cursor-pointer hover:bg-gray-100 rounded flex justify-around"
          onClick={() => {
            this.handleLikePlaylist();
          }}>
          <img className="w-4 h-4 mr-2" src={LikeIcon} />
          {isSaved ? `Unlike` : `Like`}
        </div>
        {process.browser && owner.id === localStorage.getItem('userId') ? (
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
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1"
          />
        </Head>
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
