import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { gql } from 'apollo-boost';
import { connect } from 'react-redux';

import { NextSeo } from 'next-seo';

import Loader from '../../components/Loader';
import Followers from '../../components/Followers';
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
      }
      savedPlaylists {
        playlist {
          id
          name
          des
          cover
          createdAt
          updatedAt
        }
        savedAt
      }
    }
  }
`;

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      userInfo: '',
      playlists: '',
      savedPlaylists: '',
      isLoading: false,
      showFollowers: false,
      tab: 'playlist',
    };
    this.fetchUser = this.fetchUser.bind(this);
    this.renderPlaylistWrap = this.renderPlaylistWrap.bind(this);
    this.renderUserWrap = this.renderUserWrap.bind(this);
    this.toggleShowFollowers = this.toggleShowFollowers.bind(this);
    this.setSeoHeader = this.setSeoHeader.bind(this);
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    const params = new URLSearchParams(window.location.search);
    const userId = params.get('userId');
    const data = await this.fetchUser(this.props.client, userId);
    console.log(data);
    const { user } = data;
    const { playlists, savedPlaylists, ...userInfo } = user;
    this.setState({
      playlists,
      savedPlaylists,
      userInfo,
      userId,
      isLoading: false,
    });
  }

  async fetchUser(client, userId) {
    const { data } = await client.query({
      query: GET_USER,
      variables: { userId },
    });
    return data;
  }

  toggleShowFollowers() {
    this.setState({ showFollowers: !this.state.showFollowers });
  }

  renderPlaylistWrap() {
    let renderPlaylist;

    if (this.state.tab === 'playlist') {
      renderPlaylist = this.state.playlists;
      renderPlaylist.sort((b, a) => a.createdAt - b.createdAt);
    } else {
      renderPlaylist = this.state.savedPlaylists;
      renderPlaylist.sort((b, a) => a.savedAt - b.savedAt);
      renderPlaylist = renderPlaylist.map(({ playlist }) => playlist);
    }

    return (
      <div className="flex flex-wrap items-center w-full lg:w-8/12">
        {renderPlaylist.map(playlist => (
          <PlaylistCover key={playlist.id} playlist={playlist} />
        ))}
      </div>
    );
  }

  renderUserWrap() {
    const { name, bio, avatar } = this.state.userInfo;
    return (
      <div className="flex mb-6 mt-12 w-full lg:w-8/12">
        <div className="flex flex-col">
          <div className="text-3xl mb-4 flex px-4">{name}</div>
          <div className="flex">
            <div className="flex">
              <div
                className="text-lg text-gray-600 cursor-pointer px-4 py-2 border-r-2 hover:text-black"
                onClick={() => {
                  if (this.state.tab !== 'playlist') {
                    this.setState({ tab: 'playlist' });
                  }
                }}>
                {this.state.playlists.length}{' '}
                {this.state.playlists.length > 1 ? 'Playlists' : 'Playlist'}
              </div>
              <div
                className="text-lg text-gray-600 cursor-pointer px-4 py-2 hover:text-black"
                onClick={() => {
                  if (this.state.tab !== 'likes') {
                    this.setState({ tab: 'likes' });
                  }
                }}>
                {this.state.savedPlaylists.length}{' '}
                {this.state.savedPlaylists.length > 1 ? 'Likes' : 'Like'}
              </div>
            </div>
            {/**
               <div className="flex">
              <div className="text-lg text-gray-600 cursor-pointer px-4 py-2 border-r-2 hover:text-black">
                {this.state.playlists.length}{' '}
                {this.state.playlists.length > 1 ? 'Followings' : 'Following'}
              </div>
              <div className="text-lg text-gray-600 cursor-pointer px-4 py-2 hover:text-black">
                {this.state.playlists.length}{' '}
                {this.state.playlists.length > 1 ? 'Followers' : 'Follower'}
              </div>
            </div>
             */}
          </div>
        </div>
      </div>
    );
  }

  setSeoHeader() {
    const { metaData } = this.props;
    const { userInfo } = this.state;
    const metaTitle = metaData
      ? `${metaData.userName}'s Playlisten`
      : userInfo
      ? `${userInfo.name}'s Playlisten`
      : 'Playlisten';
    return (
      <NextSeo
        title={metaTitle}
        description="Playlisten - Share and Discover Music Playlist"
        openGraph={{
          type: 'website',
          title: metaTitle,
          description: 'Playlisten - Share and Discover Music Playlist',
        }}
      />
    );
  }

  render() {
    return (
      <React.Fragment>
        {this.setSeoHeader()}
        {this.state.showFollowers && (
          <Followers toggleShowFollowers={this.toggleShowFollowers} />
        )}
        <div
          id="profile"
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
function mapStateToProps({ ProfileContainerReducer }) {
  return {
    ProfileReducer: ProfileContainerReducer,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile);
