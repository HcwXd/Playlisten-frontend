import React, { Component } from 'react';
import { STAGE } from '../../containers/Publish/constant';
import SearchIcon from '../../static/imgs/search.svg';
import YoutubeSearchInput from '../YoutubeSearchInput';

class AddSong extends Component {
  constructor(props) {
    super(props);
    this.state = { searchInput: '' };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleNextStage = this.handleNextStage.bind(this);
    this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
  }

  handleSearch() {
    console.log(this.state.searchInput);
  }

  handleKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.handleSearch();
    }
  }

  handleNextStage() {
    this.props.handleChangeStage(STAGE.ADD_IMAGE);
  }

  handleSearchInputChange(query) {
    this.setState({
      searchInput: query,
    });
  }

  render() {
    return (
      <div
        id="AddSong"
        className="mt-8 flex items-center justify-around w-full">
        <div className="addSong_container flex flex-col items-center justify-between w-full">
          <div className="search_wrap flex justify-center w-1/2 shadow">
            <YoutubeSearchInput
              handleSearchInputChange={this.handleSearchInputChange}
              handleKeyDown={this.handleKeyDown}
            />
            <div
              className="cursor-pointer p-4 hover:bg-gray-100"
              onClick={this.handleSearch}>
              <img className="w-full h-full" src={SearchIcon} alt="Cover" />
            </div>
          </div>
          <div className="search_result border flex flex-col w-1/2">
            <p className="p-4">Select the song you want to add</p>
            <ul className="songlist_wrap flex flex-col w-full">
              <li className="border-t border-b flex items-center hover:bg-gray-100 cursor-pointer">
                <div className="p-4">
                  Mary See the Future 先知瑪莉｜Cheer（Official Video）
                </div>
              </li>
              <li className="border-b flex items-center hover:bg-gray-100 cursor-pointer">
                <div className="p-4">
                  遊樂 Amuse - 徹夜狂歡 Dance All Night 【Official Music Video】
                </div>
              </li>
              <li className="border-b flex items-center hover:bg-gray-100 cursor-pointer">
                <div className="p-4">
                  美秀集團 Amazing Show－細粒的目睭【Official Lyrics Video】
                </div>
              </li>
              <li className="border-b flex items-center hover:bg-gray-100 cursor-pointer">
                <div className="p-4">
                  The Roadside Inn【怎麼喝】音樂錄影帶 Official Music Video
                </div>
              </li>
              <li className="border-b flex items-center hover:bg-gray-100 cursor-pointer">
                <div className="p-4">
                  杜爾與索克 –【 自己做愛】No one loves me 歌詞版MV
                </div>
              </li>
              <li className="flex items-center hover:bg-gray-100 cursor-pointer">
                <div className="p-4">I Mean Us - 12345 I HATE YOU (Demo)</div>
              </li>
            </ul>
          </div>
          <ul className="songlist_wrap mt-4 flex flex-col w-1/2 border">
            <li className="border-b flex items-center">
              <div className="p-4 cursor-pointer hover:bg-gray-100">X</div>
              <div>Mary See the Future 先知瑪莉｜Cheer（Official Video）</div>
            </li>
            <li className="border-b flex items-center">
              <div className="p-4 cursor-pointer hover:bg-gray-100">X</div>
              <div>
                遊樂 Amuse - 徹夜狂歡 Dance All Night 【Official Music Video】
              </div>
            </li>
            <li className="border-b flex items-center">
              <div className="p-4 cursor-pointer hover:bg-gray-100">X</div>
              <div>
                美秀集團 Amazing Show－細粒的目睭【Official Lyrics Video】
              </div>
            </li>
            <li className="border-b flex items-center">
              <div className="p-4 cursor-pointer hover:bg-gray-100">X</div>
              <div>
                The Roadside Inn【怎麼喝】音樂錄影帶 Official Music Video
              </div>
            </li>
            <li className="border-b flex items-center">
              <div className="p-4 cursor-pointer hover:bg-gray-100">X</div>
              <div>杜爾與索克 –【 自己做愛】No one loves me 歌詞版MV</div>
            </li>
            <li className="border-b flex items-center">
              <div className="p-4 cursor-pointer hover:bg-gray-100">X</div>
              <div>I Mean Us - 12345 I HATE YOU (Demo)</div>
            </li>
            <li className="border-b flex items-center">
              <div className="p-4 cursor-pointer hover:bg-gray-100">X</div>
              <div>調澀盤 - 頹垣敗瓦(demo)</div>
            </li>
            <li className="border-b flex items-center">
              <div className="p-4 cursor-pointer hover:bg-gray-100">X</div>
              <div>五十赫茲 50Hz 《公路電影 Road Trip》 (Official Video)</div>
            </li>
            <li className="border-b flex items-center">
              <div className="p-4 cursor-pointer hover:bg-gray-100">X</div>
              <div>脆弱少女組-不如跳舞Demo</div>
            </li>
            <li className="border-b flex items-center">
              <div className="p-4 cursor-pointer hover:bg-gray-100">X</div>
              <div>雨國 Kingdom of Rain - 漩渦</div>
            </li>
            <li className="flex items-center">
              <div className="p-4 cursor-pointer hover:bg-gray-100">X</div>
              <div>
                The Roadside Inn【怎麼喝】音樂錄影帶 Official Music Video
              </div>
            </li>
          </ul>
          <div
            className="border mt-4 p-2 cursor-pointer hover:bg-gray-100 rounded"
            onClick={this.handleNextStage}>
            Next
          </div>
        </div>
      </div>
    );
  }
}

export default AddSong;
