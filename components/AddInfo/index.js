import React, { Component } from 'react';

class AddInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleNextStage = this.handleNextStage.bind(this);
    this.handleBackStage = this.handleBackStage.bind(this);
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

  handleBackStage() {
    this.props.handleChangeStage('addImage');
  }

  handleNextStage() {
    console.log('Go');
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
          </div>
          <div className="songInfo_wrap border flex flex-col">
            <input className="search_input" placeholder="標題" />
            <textarea className="search_input" placeholder="文字" />
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

export default AddInfo;
