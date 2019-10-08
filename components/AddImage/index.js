import React, { Component } from 'react';
import { STAGE } from '../../containers/Publish/constant';

class AddImage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleNextStage = this.handleNextStage.bind(this);
    this.handleBackStage = this.handleBackStage.bind(this);
  }

  handleBackStage() {
    this.props.handleChangeStage(STAGE.ADD_SONG);
  }

  handleNextStage() {
    this.props.handleChangeStage(STAGE.ADD_INFO);
  }

  render() {
    return (
      <div id="AddImage" className="mt-8 flex items-center justify-around">
        <div className="addImage_container flex flex-col items-center justify-between">
          <div className="mb-4">Add a Cover Photo to Playlist</div>
          <img
            className="w-full h-full shadow p-4"
            src={
              'https://image.shutterstock.com/image-vector/grunge-red-sample-word-round-260nw-1242668641.jpg'
            }
            alt="Cover"
          />
          <div className="relative mt-4 p-2 border hover:bg-gray-100 rounded cursor-pointer">
            <p>Pick a Photo</p>
            <input
              className="top-0 right-0 left-0 bottom-0 w-full h-full opacity-0 absolute cursor-pointer"
              type="file"
              accept="image/*"
              ref={c => {
                this.input = c;
              }}
              onChange={this.onChange}
            />
          </div>
          <div className="btn_wrap flex mt-4">
            <div
              className="border mt-4 p-2 cursor-pointer hover:bg-gray-100 rounded mr-4"
              onClick={this.handleBackStage}>
              Back
            </div>
            <div
              className="border mt-4 p-2 cursor-pointer hover:bg-gray-100 rounded"
              onClick={this.handleNextStage}>
              Next
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddImage;
