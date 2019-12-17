import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { gql } from 'apollo-boost';
import { Query, Mutation, ApolloConsumer } from 'react-apollo';
import { connect } from 'react-redux';

import Loader from '../../components/Loader';
import ConfirmModal from '../../components/ConfirmModal';
import { Router, Link } from '../../routes';
import * as actions from './actions';
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

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min)) + min;
  return num;
}

class Explore extends Component {
  constructor(props) {
    super(props);
    this.state = { playlists: [], isLoading: false };
  }

  async componentDidMount() {
    this.setState({ isLoading: true });

    const data = await this.fetchExplorePlaylists(this.props.client);
    const { exploreList } = data;
    console.log(exploreList);

    const playlists = exploreList.map(({ id, name, cover }) => {
      return {
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

  renderFloatingPlaylist({ id, name, cover }) {
    const customizedStyle = {
      top: `calc(${random(0, 100)}% + 100px)`,
      right: `calc(${random(0, 100)}% - 100px)`,
      animationDelay: `${random(-6, 0)}s`,
      backgroundImage: `url(${cover})`,
    };
    return (
      <a
        href={`/playlist?listId=${id}`}
        key={id}
        className="album shadow"
        style={customizedStyle}></a>
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
