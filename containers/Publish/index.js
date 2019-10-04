import React, { Component } from 'react';
import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';
import cx from 'classnames';
import { Router, Link } from '../../routes';
import * as actions from './actions';
import AddSong from '../../components/AddSong';
import AddImage from '../../components/AddImage';
import AddInfo from '../../components/AddInfo';

class Publish extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: 'addInfo',
    };
    this.handleChangeStage = this.handleChangeStage.bind(this);
  }

  handleChangeStage(newStage) {
    this.setState({ stage: newStage });
  }

  render() {
    return (
      <div
        id="publish"
        className="mt-8 flex items-center justify-around border">
        {this.state.stage === 'addSong' ? (
          <AddSong handleChangeStage={this.handleChangeStage} />
        ) : null}
        {this.state.stage === 'addImage' ? (
          <AddImage handleChangeStage={this.handleChangeStage} />
        ) : null}
        {this.state.stage === 'addInfo' ? (
          <AddInfo handleChangeStage={this.handleChangeStage} />
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
