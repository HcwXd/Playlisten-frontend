import React, { Component, Fragment } from 'react';

class ConfirmModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.wrapperRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside(event) {
    if (!this.wrapperRef.current) return;
    if (!this.wrapperRef.current.contains(event.target)) {
      this.props.leftAction();
      document.removeEventListener('mousedown', this.handleClickOutside);
    }
  }

  render() {
    const {
      title,
      rightAction,
      leftAction,
      rightLabel,
      leftLabel,
    } = this.props;
    return (
      <div className="fixed w-full h-full flex items-center justify-around bg-black-75 z-50">
        <div
          ref={this.wrapperRef}
          className="flex flex-col items-center mt-20 border bg-white px-16 py-8 rounded">
          <div className="text-xl mb-8">{title}</div>
          <div className="flex w-full justify-between">
            <div className="border px-4 py-2 rounded cursor-pointer hover:bg-gray-100">
              <span className="text-gray" onClick={leftAction}>
                {leftLabel}
              </span>
            </div>
            <div className="border px-4 py-2 rounded cursor-pointer hover:bg-gray-100">
              <span className="text-gray" onClick={rightAction}>
                {rightLabel}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ConfirmModal;
