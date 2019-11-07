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
