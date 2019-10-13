import React, { Component } from 'react';
import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';
import cx from 'classnames';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Router, Link } from '../../routes';
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
    this.state = { showFullScreenPlayer: false };
    this.toggleShowFullScreenPlayer = this.toggleShowFullScreenPlayer.bind(
      this,
    );
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
    console.log(`Player`, this.props.currentPlayingSong, this.props);
  }

  toggleShowFullScreenPlayer() {
    this.setState({ showFullScreenPlayer: !this.state.showFullScreenPlayer });
  }

  renderFullScreenPlayer() {
    if (!this.props.currentPlayingPlaylist) return;

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
              src={
                this.props.currentPlayingPlaylist.songs[0].cover ||
                'https://media.pitchfork.com/photos/5929b5bb13d197565213ace9/1:1/w_320/c5e30897.jpg'
              }
              alt="Cover"
            />
          </div>
          <div className="mt-4">
            {this.props.currentPlayingPlaylist.songs[0].name}
          </div>
          <div className="mt-4 flex flex-col items-center w-full">
            <div className="relative w-10/12 h-0 border">
              <div
                className="absolute bg-gray-500 w-2 h-2 rounded-full absolute-center"
                style={{ left: '15%' }}></div>
            </div>
            <div className="mt-4 w-10/12 flex justify-between">
              <p className="text-gray-500">1:12</p>
              <p className="text-gray-500">3:34</p>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-around w-full">
            <HoverableIcon
              size={6}
              Icon={RandomIcon}
              HoverIcon={RandomHoverIcon}
            />
            <HoverableIcon
              size={6}
              Icon={BackwardIcon}
              HoverIcon={BackwardHoverIcon}
            />
            <HoverableIcon size={6} Icon={PlayIcon} HoverIcon={PlayHoverIcon} />
            <HoverableIcon
              size={6}
              Icon={ForwardIcon}
              HoverIcon={ForwardHoverIcon}
            />
            <HoverableIcon
              size={6}
              Icon={RepeatIcon}
              HoverIcon={RepeatHoverIcon}
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
          <li className="hover:bg-gray-100 cursor-pointer justify-between border-b flex items-center">
            <div className="flex items-center">
              <div className="w-12 text-right p-4">2</div>
              <div>
                遊樂 Amuse - 徹夜狂歡 Dance All Night 【Official Music Video】
              </div>
            </div>
            <div className="p-4">
              <div>3:52</div>
            </div>
          </li>
          <li className="hover:bg-gray-100 cursor-pointer justify-between border-b flex items-center">
            <div className="flex items-center">
              <div className="w-12 text-right p-4">3</div>
              <div>
                美秀集團 Amazing Show－細粒的目睭【Official Lyrics Video】
              </div>
            </div>
            <div className="p-4">
              <div>3:52</div>
            </div>
          </li>
          <li className="hover:bg-gray-100 cursor-pointer justify-between border-b flex items-center">
            <div className="flex items-center">
              <div className="w-12 text-right p-4">4</div>
              <div>
                The Roadside Inn【怎麼喝】音樂錄影帶 Official Music Video
              </div>
            </div>
            <div className="p-4">
              <div>3:52</div>
            </div>
          </li>
          <li className="hover:bg-gray-100 cursor-pointer justify-between border-b flex items-center">
            <div className="flex items-center">
              <div className="w-12 text-right p-4">5</div>
              <div>杜爾與索克 –【 自己做愛】No one loves me 歌詞版MV</div>
            </div>
            <div className="p-4">
              <div>3:52</div>
            </div>
          </li>
          <li className="hover:bg-gray-100 cursor-pointer justify-between border-b flex items-center">
            <div className="flex items-center">
              <div className="w-12 text-right p-4">6</div>
              <div>I Mean Us - 12345 I HATE YOU (Demo)</div>
            </div>
            <div className="p-4">
              <div>3:52</div>
            </div>
          </li>
          <li className="hover:bg-gray-100 cursor-pointer justify-between border-b flex items-center">
            <div className="flex items-center">
              <div className="w-12 text-right p-4">7</div>
              <div>調澀盤 - 頹垣敗瓦(demo)</div>
            </div>
            <div className="p-4">
              <div>3:52</div>
            </div>
          </li>
          <li className="hover:bg-gray-100 cursor-pointer justify-between border-b flex items-center">
            <div className="flex items-center">
              <div className="w-12 text-right p-4">8</div>
              <div>五十赫茲 50Hz 《公路電影 Road Trip》 (Official Video)</div>
            </div>
            <div className="p-4">
              <div>3:52</div>
            </div>
          </li>
          <li className="hover:bg-gray-100 cursor-pointer justify-between border-b flex items-center">
            <div className="flex items-center">
              <div className="w-12 text-right p-4">9</div>
              <div>脆弱少女組-不如跳舞Demo</div>
            </div>
            <div className="p-4">
              <div>3:52</div>
            </div>
          </li>
          <li className="hover:bg-gray-100 cursor-pointer justify-between border-b flex items-center">
            <div className="flex items-center">
              <div className="w-12 text-right p-4">10</div>
              <div>雨國 Kingdom of Rain - 漩渦</div>
            </div>
            <div className="p-4">
              <div>3:52</div>
            </div>
          </li>
          <li className="hover:bg-gray-100 cursor-pointer justify-between flex items-center">
            <div className="flex items-center">
              <div className="w-12 text-right p-4">11</div>
              <div>
                The Roadside Inn【怎麼喝】音樂錄影帶 Official Music Video
              </div>
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
    return (
      <div
        id="player"
        className="w-96 bg-white flex flex-col border items-center py-4 rounded-lg">
        <div className="flex w-full">
          <div className="w-full px-4 truncate">
            {this.props.currentPlayingPlaylist.songs[0].name}
          </div>
          <div className="mr-4" onClick={this.toggleShowFullScreenPlayer}>
            <HoverableIcon size={6} Icon={UpIcon} HoverIcon={UpHoverIcon} />
          </div>
        </div>
        <div className="mt-4 flex items-center justify-around w-full">
          <HoverableIcon size={6} Icon={PlayIcon} HoverIcon={PlayHoverIcon} />
        </div>
      </div>
    );
  }

  render() {
    return (
      <div id="bg-cover">
        {this.props.currentPlayingSong ? (
          <TransitionGroup>
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
  return {
    PlayerReducer: PlayerContainerReducer,
    currentPlayingSong: PlayerContainerReducer.currentPlayingSong,
    currentPlayingPlaylist: PlayerContainerReducer.currentPlayingPlaylist,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Player);
