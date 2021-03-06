import React, { Component } from 'react';
import { Mutation, ApolloConsumer } from 'react-apollo';
import { gql } from 'apollo-boost';
import { Router, Link } from '../../routes';
import Loader from '../Loader';
import { logEvent } from '../../utils/generalUtils';

import { STAGE } from '../../containers/Publish/constant';

const CREATE_PLAYLIST = gql`
  mutation($playlistInput: CreatePlaylistInput!) {
    createPlaylist(data: $playlistInput) {
      id
    }
  }
`;

const UPDATE_PLAYLIST = gql`
  mutation($updatedPlaylistInput: UpdatePlaylistInput!) {
    updatePlaylist(data: $updatedPlaylistInput) {
      id
    }
  }
`;

class AddInfo extends Component {
  constructor(props) {
    super(props);
    this.state = { tab: 'playlist', isLoading: false };
    this.handleEditSong = this.handleEditSong.bind(this);
    this.handleEditImage = this.handleEditImage.bind(this);
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
    this.renderPublishPlaylistButton = this.renderPublishPlaylistButton.bind(
      this,
    );
    this.handlePublishPlaylist = this.handlePublishPlaylist.bind(this);
  }

  handleEditImage() {
    this.props.handleChangeStage(STAGE.ADD_IMAGE);
  }

  handleEditSong() {
    this.props.handleChangeStage(STAGE.ADD_SONG);
  }

  renderCover() {
    return (
      <div className="border flex flex-col items-center w-full h-full">
        <img
          className="w-96 h-64 shadow p-4 mt-8"
          src={
            this.props.coverPreviewUrl ||
            'https://image.shutterstock.com/image-vector/grunge-red-sample-word-round-260nw-1242668641.jpg'
          }
          alt="Cover"
        />
        <div
          className="border mt-4 p-2 cursor-pointer hover:bg-gray-100 rounded"
          onClick={this.handleEditImage}>
          Edit
        </div>
      </div>
    );
  }

  renderPlaylist() {
    const { playlist } = this.props;
    return (
      <div className="border flex flex-col items-center w-full h-full">
        <ul className="flex flex-col w-full">
          <p className="p-4 text-sm">{`There are ${playlist.length} songs in the list`}</p>
          {playlist.map(({ name, sourceId }) => (
            <li key={sourceId} className="border-t border-b flex items-center">
              <div className="px-4 py-2 text-sm">{name}</div>
            </li>
          ))}
        </ul>
        <div
          className="border mt-4 p-2 cursor-pointer hover:bg-gray-100 rounded"
          onClick={this.handleEditSong}>
          Edit
        </div>
      </div>
    );
  }

  handleChangeTitle(e) {
    this.props.handleChangeTitle(e.target.value);
  }

  handleChangeDescription(e) {
    this.props.handleChangeDescription(e.target.value);
  }

  async handlePublishPlaylist(client) {
    if (this.state.isLoading) return;
    if (this.props.title === '') {
      alert('Please add a title for your playlist:)');
      return;
    }
    if (!this.props.playlist || this.props.playlist.length === 0) {
      alert('Please add a song in your playlist:)');
      return;
    }
    this.setState({ isLoading: true });

    const playlistInput = {
      name: this.props.title,
      ownerId: localStorage.getItem('userId'),
      des: this.props.description,
      cover: this.props.coverPreviewUrl,
      songs: [
        ...this.props.playlist.map(({ id, __typename, ...others }) => {
          return { ...others };
        }),
      ],
    };

    if (this.props.type === 'edit') {
      logEvent('playlist', 'playlist_edit');

      const updatedPlaylistInput = {
        listInfo: playlistInput,
        oldId: this.props.listId,
        createdAt: new Date(this.props.createdAt),
      };

      const { data } = await client.mutate({
        mutation: UPDATE_PLAYLIST,
        variables: {
          updatedPlaylistInput,
        },
      });
      const { updatePlaylist } = data;

      window.location = `/playlist?listId=${updatePlaylist.id}`;
    } else {
      logEvent('playlist', 'playlist_create');

      const { data } = await client.mutate({
        mutation: CREATE_PLAYLIST,
        variables: {
          playlistInput,
        },
      });
      const { createPlaylist } = data;

      window.location = `/playlist?listId=${createPlaylist.id}`;
    }
    this.setState({ isLoading: false });
  }

  renderPublishPlaylistButton(client) {
    return (
      <div
        className="right-0 absolute p-4 border-l cursor-pointer hover:bg-gray-100 rounded"
        onClick={() => {
          this.handlePublishPlaylist(client);
        }}>
        Publish
      </div>
    );
  }

  render() {
    return (
      <ApolloConsumer>
        {client => (
          <div id="AddInfo" className="flex items-center justify-around w-full">
            {this.state.isLoading && (
              <div className="fixed">
                <Loader />
              </div>
            )}
            <div className="addInfo_container flex justify-between w-10/12">
              <div className="flex flex-col w-1/2">
                <div className="flex">
                  <p
                    className={
                      this.state.tab === 'playlist'
                        ? 'p-4 cursor-pointer border border-b-white -mb-px z-10'
                        : 'p-4 cursor-pointer'
                    }
                    onClick={() => this.setState({ tab: 'playlist' })}>
                    Playlist
                  </p>
                  <p
                    className={
                      this.state.tab === 'cover'
                        ? 'p-4 cursor-pointer border border-b-white -mb-px z-10 '
                        : 'p-4 cursor-pointer'
                    }
                    onClick={() => this.setState({ tab: 'cover' })}>
                    Cover
                  </p>
                </div>
                {this.state.tab === 'cover'
                  ? this.renderCover()
                  : this.renderPlaylist()}
              </div>
              <div className="border relative flex flex-col ml-4 h-full w-1/2">
                <input
                  className="border-b p-4"
                  placeholder="Title"
                  onChange={this.handleChangeTitle}
                  value={this.props.title}
                />
                <textarea
                  rows="20"
                  className="p-4 h-full"
                  placeholder="Description"
                  onChange={this.handleChangeDescription}
                  value={this.props.description}
                />
                {this.renderPublishPlaylistButton(client)}
              </div>
            </div>
          </div>
        )}
      </ApolloConsumer>
    );
  }
}

export default AddInfo;
