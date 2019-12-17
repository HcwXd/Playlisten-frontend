import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { gql } from 'apollo-boost';
import { Query, Mutation, ApolloConsumer } from 'react-apollo';
import { connect } from 'react-redux';

import Loader from '../../components/Loader';
import ConfirmModal from '../../components/ConfirmModal';
import { Router, Link } from '../../routes';
import * as actions from './actions';

const GET_EXPLORE_PLAYLIST = gql`
  query($limit: Int!) {
    exploreList(num: $limit) {
      id
    }
  }
`;

class Explore extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    this.setState({ isLoading: true });

    const data = await this.fetchExplorePlaylist(this.props.client);
    const { exploreList } = data;
    console.log(exploreList);

    this.setState({ isLoading: false });
  }

  async fetchExplorePlaylist(client) {
    const { data } = await client.query({
      query: GET_EXPLORE_PLAYLIST,
      variables: { limit: 5 },
    });
    return data;
  }

  render() {
    return (
      <div id="explore" className="py-20 flex items-center justify-around">
        {this.state.isLoading && <Loader />}
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
