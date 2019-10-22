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
import { convertYoutubeDurationToMinSec } from '../../utils/generalUtils';

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

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    // const params = new URLSearchParams(window.location.search);
    // const profileId = params.get('profileId');
    // const data = await this.fetchPlaylist(this.props.client, profileId);
    // const { playlist } = data;
    // this.setState({ profileId, playlist });
  }

  async fetchPlaylist(client, listId) {
    const { data } = await client.query({
      query: GET_PLAYLIST,
      variables: { listId },
    });
    return data;
  }

  render() {
    if (!this.state.listId) return null;
    return (
      <div
        id="profile"
        className="py-20 flex items-center justify-around"></div>
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
