import React, { Component } from 'react';
import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';
import cx from 'classnames';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import ReactPlayer from 'react-player';
import { Router, Link } from '../../routes';

import { convertSecToMinSec } from '../../utils/generalUtils';
import * as actions from './actions';
import HoverableIcon from '../../components/HoverableIcon';
import BackwardIcon from '../../static/imgs/backward.svg';
import ForwardIcon from '../../static/imgs/forward.svg';
import PauseIcon from '../../static/imgs/pause.svg';
import PlayIcon from '../../static/imgs/play.svg';
import RandomIcon from '../../static/imgs/random.svg';
import RepeatIcon from '../../static/imgs/redo.svg';
import BackwardHoverIcon from '../../static/imgs/backward-hover.svg';
import ForwardHoverIcon from '../../static/imgs/forward-hover.svg';
import PauseHoverIcon from '../../static/imgs/pause-hover.svg';
import PlayHoverIcon from '../../static/imgs/play-hover.svg';
import RandomHoverIcon from '../../static/imgs/random-hover.svg';
import RepeatHoverIcon from '../../static/imgs/redo-hover.svg';
import UpIcon from '../../static/imgs/up.svg';
import UpHoverIcon from '../../static/imgs/up-hover.svg';

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showFullScreenPlayer: false,
      playing: true,
      currentDuration: null,
      currentProgress: null,
    };
    this.toggleShowFullScreenPlayer = this.toggleShowFullScreenPlayer.bind(
      this,
    );
    this.togglePlaying = this.togglePlaying.bind(this);
    this.forwardSong = this.forwardSong.bind(this);
    this.backwardSong = this.backwardSong.bind(this);
    this.handleOnDuration = this.handleOnDuration.bind(this);
    this.handleOnProgress = this.handleOnProgress.bind(this);
  }

  componentDidMount() {
    if (this.state.showFullScreenPlayer) {
      disableBodyScroll(document.querySelector('#bg-cover'));
    } else {
      enableBodyScroll(document.querySelector('#bg-cover'));
    }
  }

  componentDidUpdate() {
    if (this.state.showFullScreenPlayer) {
      disableBodyScroll(document.querySelector('#bg-cover'));
    } else {
      enableBodyScroll(document.querySelector('#bg-cover'));
    }
  }

  toggleShowFullScreenPlayer() {
    this.setState({ showFullScreenPlayer: !this.state.showFullScreenPlayer });
  }

  togglePlaying() {
    this.setState({ playing: !this.state.playing });
  }

  forwardSong() {
    const { currentPlayingPlaylist, currentPlayingSong } = this.props;
    const { songs } = currentPlayingPlaylist;
    const currentIdx = songs.findIndex(
      ({ sourceId }) => sourceId === currentPlayingSong,
    );
    const nextSongId =
      currentIdx + 1 === songs.length
        ? songs[0].sourceId
        : songs[currentIdx + 1].sourceId;
    this.props.actions.changeCurrentPlayingSong(
      nextSongId,
      currentPlayingPlaylist,
    );
    this.setState({ currentDuration: null, currentProgress: null });
  }

  backwardSong() {
    const { currentPlayingPlaylist, currentPlayingSong } = this.props;
    const { songs } = currentPlayingPlaylist;
    const currentIdx = songs.findIndex(
      ({ sourceId }) => sourceId === currentPlayingSong,
    );
    const prevSongId =
      currentIdx === 0
        ? songs[songs.length - 1].sourceId
        : songs[currentIdx - 1].sourceId;
    this.props.actions.changeCurrentPlayingSong(
      prevSongId,
      currentPlayingPlaylist,
    );
    this.setState({ currentDuration: null, currentProgress: null });
  }

  renderFullScreenPlayer() {
    if (!this.props.currentPlayingPlaylist) return;
    const { name, cover } = this.props.currentPlayingSongInfo;
    const progress = this.state.currentProgress
      ? this.state.currentProgress.played
      : 0;
    const progressSeconds = this.state.currentProgress
      ? this.state.currentProgress.playedSeconds
      : 0;
    return (
      <div
        id="player"
        className="w-128 h-full bg-white flex flex-col border items-center">
        <div
          className="mt-4 flex justify-end w-full"
          onClick={this.toggleShowFullScreenPlayer}>
          <HoverableIcon
            size={6}
            Icon={UpIcon}
            HoverIcon={UpHoverIcon}
            style={'rotate-180 cursor-pointer mr-4'}
          />
        </div>
        <div className="mt-4 w-11/12 p-4 rounded shadow flex flex-col items-center">
          <div className="relative flex flex-col items-center">
            <div className="absolute rounded-full bg-white absolute-center w-8 h-8 shadow-inner"></div>
            <img
              className="w-32 h-32 rounded-full shadow-2xl"
              src={cover}
              alt="Cover"
            />
          </div>
          <div className="mt-4">{name}</div>
          <div className="mt-4 flex flex-col items-center w-full">
            <div className="relative w-10/12 h-0 border">
              <div
                className="absolute bg-gray-500 w-2 h-2 rounded-full absolute-center"
                style={{ left: `${progress * 100}%` }}></div>
            </div>
            <div className="mt-4 w-10/12 flex justify-between">
              <p className="text-gray-500">
                {convertSecToMinSec(progressSeconds)}
              </p>
              <p className="text-gray-500">
                {convertSecToMinSec(this.state.currentDuration)}
              </p>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-around w-full">
            <HoverableIcon
              size={6}
              Icon={RandomIcon}
              HoverIcon={RandomHoverIcon}
              style={'opacity-0'}
            />
            <HoverableIcon
              size={6}
              Icon={BackwardIcon}
              HoverIcon={BackwardHoverIcon}
              onClick={this.backwardSong}
            />
            {this.state.playing ? (
              <HoverableIcon
                size={6}
                Icon={PauseIcon}
                HoverIcon={PauseHoverIcon}
                onClick={this.togglePlaying}
              />
            ) : (
              <HoverableIcon
                size={6}
                Icon={PlayIcon}
                HoverIcon={PlayHoverIcon}
                onClick={this.togglePlaying}
              />
            )}
            <HoverableIcon
              size={6}
              Icon={ForwardIcon}
              HoverIcon={ForwardHoverIcon}
              onClick={this.forwardSong}
            />
            <HoverableIcon
              size={6}
              Icon={RepeatIcon}
              HoverIcon={RepeatHoverIcon}
              style={'opacity-0'}
            />
          </div>
        </div>
        <ul className="h-full flex flex-col border hidden">
          <li className="hover:bg-gray-100 cursor-pointer border-b flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 text-right p-4">1</div>
              <div>Mary See the Future 先知瑪莉｜Cheer（Official Video）</div>
            </div>
            <div className="p-4">
              <div>3:52</div>
            </div>
          </li>
        </ul>
      </div>
    );
  }

  renderMinimizePlayer() {
    if (!this.props.currentPlayingPlaylist) return;
    const { name, cover } = this.props.currentPlayingSongInfo;
    return (
      <div
        id="player"
        className="w-96 bg-white flex flex-col border items-center py-4 rounded-lg">
        <div className="flex w-full">
          <div className="w-full px-4 truncate">{name}</div>
          <div className="mr-4" onClick={this.toggleShowFullScreenPlayer}>
            <HoverableIcon size={6} Icon={UpIcon} HoverIcon={UpHoverIcon} />
          </div>
        </div>
        <div className="mt-4 flex items-center justify-around w-full">
          {this.state.playing ? (
            <HoverableIcon
              size={6}
              Icon={PauseIcon}
              HoverIcon={PauseHoverIcon}
              onClick={this.togglePlaying}
            />
          ) : (
            <HoverableIcon
              size={6}
              Icon={PlayIcon}
              HoverIcon={PlayHoverIcon}
              onClick={this.togglePlaying}
            />
          )}
        </div>
      </div>
    );
  }

  handleOnDuration(duration) {
    this.setState({ currentDuration: duration });
  }

  handleOnProgress(progress) {
    this.setState({ currentProgress: progress });
  }

  render() {
    return (
      <div id="bg-cover">
        {this.props.currentPlayingSong ? (
          <TransitionGroup>
            <div className="opacity-0 w-0 h-0 overflow-hidden">
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${this.props.currentPlayingSong}`}
                playing={this.state.playing}
                onEnded={this.forwardSong}
                onDuration={this.handleOnDuration}
                onProgress={this.handleOnProgress}
              />
            </div>
            {this.state.showFullScreenPlayer ? (
              <div className="fixed w-full h-full flex justify-end bg-black-90 z-50">
                <CSSTransition
                  in={this.state.showFullScreenPlayer}
                  timeout={300}
                  classNames="fullScreenPlayerAnimation">
                  {this.renderFullScreenPlayer()}
                </CSSTransition>
              </div>
            ) : (
              <div className="fixed z-50 bottom-0 right-0">
                {this.renderMinimizePlayer()}
              </div>
            )}
          </TransitionGroup>
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
function mapStateToProps({ PlayerContainerReducer }) {
  const currentPlayingSongInfo = PlayerContainerReducer.currentPlayingPlaylist
    ? PlayerContainerReducer.currentPlayingPlaylist.songs.find(
        ({ sourceId }) =>
          sourceId === PlayerContainerReducer.currentPlayingSong,
      )
    : null;
  return {
    PlayerReducer: PlayerContainerReducer,
    currentPlayingSong: PlayerContainerReducer.currentPlayingSong,
    currentPlayingSongInfo,
    currentPlayingPlaylist: PlayerContainerReducer.currentPlayingPlaylist,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Player);
