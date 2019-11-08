import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { gql } from 'apollo-boost';
import { Query, Mutation, ApolloConsumer } from 'react-apollo';
import { connect } from 'react-redux';
import cx from 'classnames';

import DefaultProfile from '../../static/imgs/default-profile.jpeg';
import PlaylistCover from '../../components/PlaylistCover';
import { Router, Link } from '../../routes';
import * as actions from './actions';
import HoverableIcon from '../../components/HoverableIcon';
import PlayIcon from '../../static/imgs/play.svg';
import PlayHoverIcon from '../../static/imgs/play-hover.svg';
import { convertYoutubeDurationToMinSec } from '../../utils/generalUtils';

const GET_USER = gql`
  query($userId: String!) {
    user(userId: $userId) {
      id
      name
      bio
      avatar
      playlists {
        id
        name
        des
        cover
        createdAt
        updatedAt
        songs {
          id
          listId
          sourceId
          name
          cover
          duration
        }
      }
    }
  }
`;

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { userId: '', userInfo: '', playlists: '' };
    this.fetchUser = this.fetchUser.bind(this);
    this.renderPlaylistWrap = this.renderPlaylistWrap.bind(this);
    this.renderRowOfPlaylist = this.renderRowOfPlaylist.bind(this);
    this.renderUserWrap = this.renderUserWrap.bind(this);
  }

  async componentDidMount() {
    const params = new URLSearchParams(window.location.search);
    const userId = params.get('userId');
    const data = await this.fetchUser(this.props.client, userId);
    console.log(data);
    const { user } = data;
    const { playlists, ...userInfo } = user;
    this.setState({ playlists, userInfo, userId });
  }

  async fetchUser(client, userId) {
    const { data } = await client.query({
      query: GET_USER,
      variables: { userId },
    });
    return data;
  }

  renderRowOfPlaylist(singleRow) {
    return (
      <div className="flex justify-start w-full">
        {singleRow.map(playlist => (
          <PlaylistCover key={playlist.id} playlist={playlist} />
        ))}
      </div>
    );
  }

  renderPlaylistWrap() {
    const rowsOfPlaylist = [];
    this.state.playlists.reverse().forEach((playlist, idx) => {
      if (idx % 3 === 0) rowsOfPlaylist.push([]);
      rowsOfPlaylist[rowsOfPlaylist.length - 1].push(playlist);
    });
    return (
      <div className="flex flex-col items-center w-full lg:w-8/12">
        {rowsOfPlaylist.map(singleRow => this.renderRowOfPlaylist(singleRow))}
      </div>
    );
  }

  renderUserWrap() {
    const { name, bio, avatar } = this.state.userInfo;
    return (
      <div className="flex justify-around mb-12 mt-12">
        <img
          className="w-32 h-32 rounded-full shadow-2xl p-2"
          src={DefaultProfile}
        />
        <div className="ml-12">
          <div className="text-3xl">{name}</div>
          <span className="text-xl text-gray-600">
            {this.state.playlists.length}{' '}
            <span className="text-gray-500">Playlists</span>
          </span>
        </div>
      </div>
    );
  }

  render() {
    if (!this.state.userId) return null;
    return (
      <div
        id="profile"
        className="py-20 flex flex-col items-center justify-around">
        {this.state.userInfo ? this.renderUserWrap() : null}
        {this.state.playlists && this.state.playlists.length > 0
          ? this.renderPlaylistWrap()
          : null}
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
function mapStateToProps({ ProfileContainerReducer }) {
  return {
    ProfileReducer: ProfileContainerReducer,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile);
