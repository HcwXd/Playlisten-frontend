import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { gql } from 'apollo-boost';
import { Query, Mutation, ApolloConsumer } from 'react-apollo';
import { connect } from 'react-redux';

import Loader from '../../components/Loader';
import ConfirmModal from '../../components/ConfirmModal';
import { Router, Link } from '../../routes';
import * as actions from './actions';
import { random } from '../../utils/generalUtils';
import './style.scss';

const GET_EXPLORE_PLAYLISTs = gql`
  query($limit: Int!) {
    exploreList(num: $limit) {
      id
      name
      cover
    }
  }
`;

class Explore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlists: [],
      isLoading: false,
      showPlaylistInfo: false,
      playlistInfo: null,
    };
    this.setPlaylistInfo = this.setPlaylistInfo.bind(this);
    this.renderPlaylistInfo = this.renderPlaylistInfo.bind(this);
  }

  async componentDidMount() {
    this.setState({ isLoading: true });

    const data = await this.fetchExplorePlaylists(this.props.client);
    const { exploreList } = data;
    console.log(exploreList);

    const playlists = exploreList.map(({ id, name, cover }) => {
      return {
        customizedStyle: {
          top: `calc(${random(0, 100)}% + 100px)`,
          right: `calc(${random(0, 100)}% - 100px)`,
          animationDelay: `${random(-6, 0)}s`,
          backgroundImage: `url(${cover})`,
        },
        id,
        name,
        cover: cover === 'cover' ? 'https://ppt.cc/fLMbhx' : cover, // TODO: wait for backend implementation for empty cover
      };
    });

    this.setState({ isLoading: false, playlists });
  }

  async fetchExplorePlaylists(client) {
    const { data } = await client.query({
      query: GET_EXPLORE_PLAYLISTs,
      variables: { limit: 25 },
    });
    return data;
  }

  renderFloatingPlaylist({ id, name, cover, customizedStyle }) {
    return (
      <a
        href={`/playlist?listId=${id}`}
        data-name={name}
        key={id}
        className="album shadow"
        style={customizedStyle}
        onMouseEnter={this.setPlaylistInfo}
        onMouseLeave={() => {
          this.setState({ showPlaylistInfo: false, playlistInfo: null });
        }}></a>
    );
  }

  setPlaylistInfo(e) {
    const rect = e.target.getBoundingClientRect();
    this.setState({
      showPlaylistInfo: true,
      playlistInfo: {
        href: e.target.href,
        name: e.target.dataset.name,
        customizedStyle: {
          top: `${rect.top - 160}px`,
          right: e.target.style.right,
          backgroundImage: e.target.style.backgroundImage,
        },
      },
    });
  }

  renderPlaylistInfo() {
    const { href, customizedStyle, name } = this.state.playlistInfo;

    return (
      <a
        href={href}
        className="album-active shadow flex justify-around items-end"
        style={customizedStyle}>
        <div className="text-sm text-center -m-10 bg-black text-white p-2 rounded">
          {name}
        </div>
      </a>
    );
  }

  render() {
    return (
      <div
        id="explore"
        className="p-40 flex items-center justify-around w-screen h-screen">
        {this.state.isLoading && <Loader />}
        {this.state.playlists.length > 0 && (
          <div className="w-full h-full relative">
            {this.state.showPlaylistInfo && this.renderPlaylistInfo()}
            {this.state.playlists.map(playlist =>
              this.renderFloatingPlaylist(playlist),
            )}
          </div>
        )}
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
function mapStateToProps({ ExploreContainerReducer }) {
  return {
    ExploreReducer: ExploreContainerReducer,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Explore);
