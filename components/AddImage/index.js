import React, { Component } from 'react';

class AddImage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleNextStage = this.handleNextStage.bind(this);
    this.handleBackStage = this.handleBackStage.bind(this);
  }

  handleBackStage() {
    this.props.handleChangeStage('addSong');
  }

  handleNextStage() {
    this.props.handleChangeStage('addInfo');
  }

  render() {
    return (
      <div id="AddImage" className="mt-8 flex items-center justify-around">
        <div className="addImage_container flex flex-col items-center justify-between">
          <div className="search_wrap border flex">
            <input
              type="file"
              accept="image/*"
              name="photo"
              className="w-full h-full cursor-pointer"
            />
          </div>
          <div className="next_btn border" onClick={this.handleBackStage}>
            Back
          </div>
          <div className="next_btn border" onClick={this.handleNextStage}>
            Next
          </div>
        </div>
      </div>
    );
  }
}

export default AddImage;
