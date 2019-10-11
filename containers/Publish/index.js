import React, { Component } from 'react';
import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';
import cx from 'classnames';
import { Router, Link } from '../../routes';
import * as actions from './actions';
import AddSong from '../../components/AddSong';
import AddImage from '../../components/AddImage';
import AddInfo from '../../components/AddInfo';
import { STAGE } from './constant';

const fakePlaylist = [
  { title: 'Mary See the Future 先知瑪莉｜Cheer（Official Video）', id: 1 },
  {
    title: '遊樂 Amuse - 徹夜狂歡 Dance All Night 【Official Music Video】',
    id: 2,
  },
  {
    title: '美秀集團 Amazing Show－細粒的目睭【Official Lyrics Video】',
    id: 3,
  },
  { title: 'The Roadside Inn【怎麼喝】音樂錄影帶 Official Music Video', id: 4 },
  { title: '杜爾與索克 –【 自己做愛】No one loves me 歌詞版MV', id: 5 },
  { title: 'I Mean Us - 12345 I HATE YOU (Demo)', id: 6 },
];

class Publish extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: STAGE.ADD_SONG,
      // stage: STAGE.ADD_IMAGE,
      // stage: STAGE.ADD_INFO,
      playlist: fakePlaylist || [],
      coverFile: null,
      coverPreviewUrl: '',
      title: '',
      description: '',
    };
    this.handleChangeStage = this.handleChangeStage.bind(this);
    this.handleChangeCoverPhoto = this.handleChangeCoverPhoto.bind(this);
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
    this.handlePublishPlaylist = this.handlePublishPlaylist.bind(this);
  }

  handleChangeStage(newStage) {
    this.setState({ stage: newStage });
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

  handlePublishPlaylist() {
    console.log(this.state);
  }

  render() {
    return (
      <div id="publish" className="py-20 flex items-center justify-around">
        {this.state.stage === 'addSong' ? (
          <AddSong
            handleChangeStage={this.handleChangeStage}
            playlist={this.state.playlist}
          />
        ) : null}
        {this.state.stage === 'addImage' ? (
          <AddImage
            handleChangeStage={this.handleChangeStage}
            handleChangeCoverPhoto={this.handleChangeCoverPhoto}
            coverPreviewUrl={this.state.coverPreviewUrl}
          />
        ) : null}
        {this.state.stage === 'addInfo' ? (
          <AddInfo
            handleChangeStage={this.handleChangeStage}
            coverPreviewUrl={this.state.coverPreviewUrl}
            playlist={this.state.playlist}
            handleChangeTitle={this.handleChangeTitle}
            handleChangeDescription={this.handleChangeDescription}
            handlePublishPlaylist={this.handlePublishPlaylist}
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
)(Publish);
