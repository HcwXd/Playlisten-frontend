import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { gql } from 'apollo-boost';
import { connect } from 'react-redux';

import { NextSeo } from 'next-seo';

import Loader from '../../components/Loader';
import DefaultProfile from '../../static/imgs/default-profile.jpeg';
import PlaylistCover from '../../components/PlaylistCover';
import { Router, Link } from '../../routes';
import * as actions from './actions';

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

class Likes extends Component {
  constructor(props) {
    super(props);
    this.state = { userId: '', userInfo: '', playlists: '', isLoading: false };
    this.fetchUser = this.fetchUser.bind(this);
    this.renderPlaylistWrap = this.renderPlaylistWrap.bind(this);
    this.renderUserWrap = this.renderUserWrap.bind(this);
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    const params = new URLSearchParams(window.location.search);
    const userId = params.get('userId');
    const data = await this.fetchUser(this.props.client, userId);
    console.log(data);
    const { user } = data;
    const { playlists, ...userInfo } = user;
    this.setState({ playlists, userInfo, userId, isLoading: false });
  }

  async fetchUser(client, userId) {
    const { data } = await client.query({
      query: GET_USER,
      variables: { userId },
    });
    return data;
  }

  renderPlaylistWrap() {
    this.state.playlists.sort((b, a) => a.createdAt - b.createdAt);

    return (
      <div className="flex flex-wrap items-center w-full lg:w-8/12">
        {this.state.playlists.map(playlist => (
          <PlaylistCover key={playlist.id} playlist={playlist} />
        ))}
      </div>
    );
  }

  renderUserWrap() {
    const { name, bio, avatar } = this.state.userInfo;
    return (
      <div className="flex justify-around mb-12 mt-12">
        <div className="ml-12">
          <div className="text-3xl">{`${name}'s Liked Playlists`}</div>
          <span className="text-xl text-gray-600">
            {this.state.playlists.length}{' '}
            <span className="text-gray-500">
              {this.state.playlists.length > 1 ? 'Playlists' : 'Playlist'}
            </span>
          </span>
        </div>
      </div>
    );
  }

  render() {
    const { metaData } = this.props;
    const { userInfo } = this.state;
    const metaTitle = metaData
      ? `${metaData.userName}'s Liked Playlists`
      : userInfo
      ? `${userInfo.name}'s Liked Playlists`
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
        <div
          id="Likes"
          className="py-20 flex flex-col items-center justify-around">
          {this.state.isLoading && <Loader />}
          {this.state.userInfo && this.renderUserWrap()}
          {this.state.playlists && this.state.playlists.length > 0
            ? this.renderPlaylistWrap()
            : null}
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
function mapStateToProps({ LikesContainerReducer }) {
  return {
    LikesReducer: LikesContainerReducer,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Likes);
