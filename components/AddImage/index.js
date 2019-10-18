import React, { Component } from 'react';
import { STAGE } from '../../containers/Publish/constant';
import { IMGUR_UPLOAD_URL } from '../../utils/configConst';
import Loader from '../loader';

class AddImage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleNextStage = this.handleNextStage.bind(this);
    this.handleBackStage = this.handleBackStage.bind(this);
    this.handlePhotoUpload = this.handlePhotoUpload.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
  }

  componentDidMount() {
    const { coverPreviewUrl, playlist } = this.props;
    const defaultCoverUrl =
      playlist.length > 0
        ? playlist[0].cover
        : 'https://image.shutterstock.com/image-vector/grunge-red-sample-word-round-260nw-1242668641.jpg';
    if (!coverPreviewUrl) {
      this.props.handleChangeCoverPhoto(null, defaultCoverUrl);
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.coverFile && this.props.coverFile) {
      this.uploadImage();
    }
  }

  handleBackStage() {
    this.props.handleChangeStage(STAGE.ADD_SONG);
  }

  handleNextStage() {
    this.props.handleChangeStage(STAGE.ADD_INFO);
  }

  uploadImage(e) {
    // TODO: Use axios to improve readabilty
    if (!e) return;
    e.preventDefault();
    const request = new XMLHttpRequest();
    const formData = new FormData();
    const file = e.target.files[0];
    const self = this;
    formData.append('image', file);
    request.open('POST', IMGUR_UPLOAD_URL);
    request.setRequestHeader(
      'Authorization',
      `Client-ID ${process.env.IMGUR_KEY}`,
    );
    console.log(process.env.IMGUR_KEY);
    request.onreadystatechange = function() {
      if (request.status === 200 && request.readyState === 4) {
        const res = JSON.parse(request.responseText);
        const coverUrl = `https://i.imgur.com/${res.data.id}.png`;
        self.props.handleChangeCoverPhoto(file, coverUrl);
      }
    };
    request.send(formData);
  }

  handlePhotoUpload(e) {
    // TODO: Will use FileReader as cache for further performance improvement
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      this.props.handleChangeCoverPhoto(file, reader.result);
    };
    reader.readAsDataURL(file);
  }

  render() {
    const { coverPreviewUrl } = this.props;
    return (
      <div id="AddImage" className="mt-8 flex items-center justify-around">
        <div className="addImage_container flex flex-col items-center justify-between">
          <div className="mb-4">Add a Cover Photo to Playlist</div>
          <Loader />
          {coverPreviewUrl ? (
            <img
              className="w-96 h-64 shadow p-4"
              src={coverPreviewUrl}
              alt="Cover"
            />
          ) : null}
          <div className="relative mt-4 p-2 border hover:bg-gray-100 rounded cursor-pointer">
            <p>Pick your own Photo</p>
            <input
              className="top-0 right-0 left-0 bottom-0 w-full h-full opacity-0 absolute cursor-pointer"
              type="file"
              accept="image/*"
              onChange={this.uploadImage}
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
              {coverPreviewUrl ? 'next' : 'skip'}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddImage;
