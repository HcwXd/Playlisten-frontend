import React, { Component } from 'react';
import { STAGE } from '../../containers/Publish/constant';
import SearchIcon from '../../static/imgs/search.svg';

class AddSong extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleSearch = this.handleSearch.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleNextStage = this.handleNextStage.bind(this);
  }

  handleSearch() {
    console.log('handleSearch');
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

  render() {
    return (
      <div id="AddSong" className="mt-8 flex items-center justify-around">
        <div className="addSong_container flex flex-col items-center justify-between">
          <div className="search_wrap flex">
            <input
              id="search"
              className="search_input border"
              placeholder="請輸入歌曲名稱 / 歌曲的 Youtube 網址 / 歌單的 Youtube 網址"
              onKeyDown={this.handleKeyDown}
            />
            <div
              className="ml-4 border cursor-pointer"
              onClick={this.handleSearch}>
              <img className="w-full h-full" src={SearchIcon} alt="Cover" />
            </div>
          </div>
          <div className="search_result hidden border flex"></div>
          <ul className="songlist_wrap mt-4 border flex flex-col">
            <li className="border flex">
              <div className="mr-4">X</div>
              <div>This is a song</div>
            </li>
            <li className="border flex">
              <div className="mr-4">X</div>
              <div>This is a song</div>
            </li>
            <li className="border flex">
              <div className="mr-4">X</div>
              <div>This is a song</div>
            </li>
            <li className="border flex">
              <div className="mr-4">X</div>
              <div>This is a song</div>
            </li>
          </ul>
          <div className="next_btn border mt-4" onClick={this.handleNextStage}>
            Next
          </div>
        </div>
      </div>
    );
  }
}

export default AddSong;
