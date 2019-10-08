import React, { Component } from 'react';
import { STAGE } from '../../containers/Publish/constant';

class AddInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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

  render() {
    return (
      <div id="AddInfo" className="mt-8 flex items-center justify-around">
        <div className="addInfo_container flex items-center justify-between">
          <div className="songlist_wrap border flex flex-col">
            <img
              className="w-full h-full"
              src={
                'https://image.shutterstock.com/image-vector/grunge-red-sample-word-round-260nw-1242668641.jpg'
              }
              alt="Cover"
            />
            <div className="next_btn border" onClick={this.handleEditImage}>
              Edit
            </div>
            <ul className="songlist_wrap border flex flex-col">
              <li className="border flex">
                <div>X</div>
                <div>This is a song</div>
              </li>
              <li className="border flex">
                <div>X</div>
                <div>This is a song</div>
              </li>
              <li className="border flex">
                <div>X</div>
                <div>This is a song</div>
              </li>
              <li className="border flex">
                <div>X</div>
                <div>This is a song</div>
              </li>
            </ul>
            <div className="next_btn border" onClick={this.handleEditSong}>
              Edit
            </div>
          </div>
          <div className="songInfo_wrap flex flex-col ml-4">
            <input className="search_input border" placeholder="標題" />
            <textarea className="search_input border" placeholder="文字" />
          </div>
          <div className="next_btn border" onClick={this.handlePublishPlaylist}>
            Publish
          </div>
        </div>
      </div>
    );
  }
}

export default AddInfo;
