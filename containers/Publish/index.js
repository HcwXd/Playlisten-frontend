import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { withRouter } from 'next/router';
import { gql } from 'apollo-boost';

import { connect } from 'react-redux';
import cx from 'classnames';
import { Router, Link } from '../../routes';
import * as actions from './actions';
import AddSong from '../../components/AddSong';
import AddImage from '../../components/AddImage';
import AddInfo from '../../components/AddInfo';
import { STAGE } from './constant';

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
      songs {
        sourceId
        name
        cover
        duration
      }
    }
  }
`;

class Publish extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stage:
        this.props.router.route === '/publish'
          ? STAGE.ADD_SONG
          : STAGE.ADD_INFO,
      // stage: STAGE.ADD_IMAGE,
      // stage: STAGE.ADD_INFO,
      playlist: [],
      coverFile: null,
      coverPreviewUrl: '',
      title: '',
      description: '',
      listId: null,
      createdAt: null,
    };
    this.handleChangeStage = this.handleChangeStage.bind(this);
    this.handleChangeCoverPhoto = this.handleChangeCoverPhoto.bind(this);
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
    this.handleChangePlaylist = this.handleChangePlaylist.bind(this);
  }

  async componentDidMount() {
    if (this.props.router.route === '/publish') return;
    const params = new URLSearchParams(window.location.search);
    const listId = params.get('listId');
    const data = await this.fetchPlaylist(this.props.client, listId);
    const { playlist } = data;
    const { name, cover, des, songs, createdAt } = playlist;

    this.setState({
      listId,
      createdAt,
      title: name,
      coverPreviewUrl: cover,
      description: des,
      playlist: songs,
    });
  }

  async fetchPlaylist(client, listId) {
    const { data } = await client.query({
      query: GET_PLAYLIST,
      variables: { listId },
    });
    return data;
  }

  handleChangeStage(newStage) {
    this.setState({ stage: newStage });
  }

  handleChangePlaylist(playlist) {
    this.setState({ playlist });
  }

  handleChangeCoverPhoto(coverFile, coverPreviewUrl) {
    this.setState({ coverFile, coverPreviewUrl });
  }

  handleChangeTitle(title) {
    this.setState({ title });
  }

  handleChangeDescription(description) {
    this.setState({ description });
  }

  render() {
    return (
      <div id="publish" className="py-20 flex items-center justify-around">
        {this.state.stage === 'addSong' ? (
          <AddSong
            handleChangeStage={this.handleChangeStage}
            playlist={this.state.playlist}
            handleChangePlaylist={this.handleChangePlaylist}
          />
        ) : null}
        {this.state.stage === 'addImage' ? (
          <AddImage
            handleChangeStage={this.handleChangeStage}
            handleChangeCoverPhoto={this.handleChangeCoverPhoto}
            coverPreviewUrl={this.state.coverPreviewUrl}
            coverFile={this.state.coverFile}
            playlist={this.state.playlist}
          />
        ) : null}
        {this.state.stage === 'addInfo' ? (
          <AddInfo
            coverPreviewUrl={this.state.coverPreviewUrl}
            playlist={this.state.playlist}
            title={this.state.title}
            description={this.state.description}
            handleChangeStage={this.handleChangeStage}
            handleChangeTitle={this.handleChangeTitle}
            handleChangeDescription={this.handleChangeDescription}
            type={this.props.router.route.slice(1)}
            listId={this.state.listId}
            createdAt={this.state.createdAt}
          />
        ) : null}
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
function mapStateToProps({ PublishContainerReducer }) {
  return {
    PublishReducer: PublishContainerReducer,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(Publish));
