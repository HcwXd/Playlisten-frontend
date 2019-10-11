import React, { Component } from 'react';
import { STAGE } from '../../containers/Publish/constant';
import SearchIcon from '../../static/imgs/search.svg';
import YoutubeSearchInput from '../YoutubeSearchInput';

const fakeSearchResults = [
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

class AddSong extends Component {
  constructor(props) {
    super(props);
    this.state = { searchInput: '', searchResults: fakeSearchResults || [] };
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

  renderSearchResults() {
    return (
      <div className="border flex flex-col w-1/2">
        <p className="p-4">Select the song you want to add</p>
        <ul className="flex flex-col w-full">
          {this.state.searchResults.map(({ title, id }) => (
            <li
              className="border-t border-b flex items-center hover:bg-gray-100 cursor-pointer"
              key={id}>
              <div className="p-4">{title}</div>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  renderCurrentPlaylist() {
    return (
      <div className="mt-4 border flex flex-col w-1/2">
        <p className="p-4">Current Playlist</p>
        <ul className="flex flex-col w-full">
          {this.props.playlist.map(({ title, id }) => (
            <li className="border-t border-b flex items-center" key={id}>
              <div className="p-4 cursor-pointer hover:bg-gray-100">X</div>
              <div>{title}</div>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  render() {
    const { playlist } = this.props;
    const { searchResults } = this.state;
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
          {searchResults.length > 0 ? this.renderSearchResults() : null}
          {playlist.length > 0 ? this.renderCurrentPlaylist() : null}
          {playlist.length > 0 ? (
            <div
              className="border mt-4 p-2 cursor-pointer hover:bg-gray-100 rounded"
              onClick={this.handleNextStage}>
              Next
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default AddSong;
