import React, { Component } from 'react';
import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';
import cx from 'classnames';
import { Router, Link } from '../../routes';
import * as actions from './actions';
import PlayIcon from '../../static/imgs/play.svg';

class Playlist extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div id="playlist" className="py-20 flex items-center justify-around">
        <div className="flex flex-col border w-8/12">
          <div className="flex">
            <div>
              <img
                className="w-full h-full p-4 border"
                src={
                  'https://image.shutterstock.com/image-vector/grunge-red-sample-word-round-260nw-1242668641.jpg'
                }
                alt="Cover"
              />
            </div>
            <div className="flex flex-col w-3/4">
              <div className="flex justify-between w-full p-4 pb-0">
                <h1 className="text-4xl font-bold">October Mood</h1>{' '}
                <div className="text-gray-600">Jan 1</div>
              </div>
              <div className="flex items-center">
                <div className="px-4">
                  by{' '}
                  <span className="text-gray-600 cursor-pointer">
                    winnieehu
                  </span>
                </div>
              </div>
              <div className="px-4 pt-2">
                <p>A playlist that helps you be both high and down.</p>
              </div>
            </div>
          </div>
          <ul className="songlist_wrap flex flex-col w-full border">
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
function mapStateToProps({ PlaylistContainerReducer }) {
  return {
    PlaylistReducer: PlaylistContainerReducer,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Playlist);
