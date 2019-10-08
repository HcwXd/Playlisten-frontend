import React, { Component } from 'react';
import { STAGE } from '../../containers/Publish/constant';

class AddInfo extends Component {
  constructor(props) {
    super(props);
    this.state = { page: 'cover' };
    this.handleEditSong = this.handleEditSong.bind(this);
    this.handleEditImage = this.handleEditImage.bind(this);
    this.handlePublishPlaylist = this.handlePublishPlaylist.bind(this);
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

  handleEditImage() {
    this.props.handleChangeStage(STAGE.ADD_IMAGE);
  }

  handleEditSong() {
    this.props.handleChangeStage(STAGE.ADD_SONG);
  }

  handlePublishPlaylist() {
    console.log('Publish');
  }

  renderCover() {
    return (
      <div className="border flex flex-col items-center w-full h-full">
        <img
          className="w-3/4 h-3/4 shadow p-4 mt-8"
          src={
            'https://image.shutterstock.com/image-vector/grunge-red-sample-word-round-260nw-1242668641.jpg'
          }
          alt="Cover"
        />
        <div
          className="border mt-4 p-2 cursor-pointer hover:bg-gray-100 rounded"
          onClick={this.handleEditImage}>
          Edit
        </div>
      </div>
    );
  }

  renderPlaylist() {
    return (
      <div className="border flex flex-col items-center w-full h-full">
        <ul className="flex flex-col w-full">
          <p className="p-4 text-sm">There are 6 songs in the list</p>
          <li className="border-t border-b flex items-center hover:bg-gray-100 cursor-pointer">
            <div className="px-4 py-2 text-sm">
              Mary See the Future 先知瑪莉｜Cheer（Official Video）
            </div>
          </li>
          <li className="border-b flex items-center hover:bg-gray-100 cursor-pointer">
            <div className="px-4 py-2 text-sm">
              遊樂 Amuse - 徹夜狂歡 Dance All Night 【Official Music Video】
            </div>
          </li>
          <li className="border-b flex items-center hover:bg-gray-100 cursor-pointer">
            <div className="px-4 py-2 text-sm">
              美秀集團 Amazing Show－細粒的目睭【Official Lyrics Video】
            </div>
          </li>
          <li className="border-b flex items-center hover:bg-gray-100 cursor-pointer">
            <div className="px-4 py-2 text-sm">
              The Roadside Inn【怎麼喝】音樂錄影帶 Official Music Video
            </div>
          </li>
          <li className="border-b flex items-center hover:bg-gray-100 cursor-pointer">
            <div className="px-4 py-2 text-sm">
              杜爾與索克 –【 自己做愛】No one loves me 歌詞版MV
            </div>
          </li>
          <li className="border-b flex items-center hover:bg-gray-100 cursor-pointer">
            <div className="px-4 py-2 text-sm">
              I Mean Us - 12345 I HATE YOU (Demo)
            </div>
          </li>
        </ul>
        <div
          className="border mt-4 p-2 cursor-pointer hover:bg-gray-100 rounded"
          onClick={this.handleEditSong}>
          Edit
        </div>
      </div>
    );
  }

  render() {
    return (
      <div id="AddInfo" className="flex items-center justify-around w-full">
        <div className="addInfo_container flex justify-between w-10/12">
          <div className="flex flex-col w-1/2">
            <div className="flex">
              <p
                className={
                  this.state.page === 'cover'
                    ? 'p-4 border border-b-white -mb-px z-10 cursor-pointer'
                    : 'p-4 cursor-pointer'
                }
                onClick={() => this.setState({ page: 'cover' })}>
                Cover
              </p>
              <p
                className={
                  this.state.page === 'playlist'
                    ? 'p-4 border border-b-white -mb-px z-10 cursor-pointer'
                    : 'p-4 cursor-pointer'
                }
                onClick={() => this.setState({ page: 'playlist' })}>
                Playlist
              </p>
            </div>
            {this.state.page === 'cover'
              ? this.renderCover()
              : this.renderPlaylist()}
          </div>
          <div className="border relative flex flex-col ml-4 h-full w-1/2">
            <input className="border-b p-4" placeholder="Title" />
            <textarea
              rows="20"
              className="p-4 h-full"
              placeholder="Description"
            />
            <div
              className="right-0 absolute p-4 border-l cursor-pointer hover:bg-gray-100 rounded"
              onClick={this.handlePublishPlaylist}>
              Publish
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddInfo;
