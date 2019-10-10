import React, { Component } from 'react';

class HoverableIcon extends Component {
  constructor(props) {
    super(props);
    this.state = { isHover: false };
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  handleMouseEnter() {
    this.setState({ isHover: true });
  }

  handleMouseLeave(e) {
    this.setState({ isHover: false });
  }

  render() {
    const { Icon, HoverIcon, size, style } = this.props;
    return (
      <div
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        className={style || 'cursor-pointer'}>
        <img
          className={`w-${size} h-${size}`}
          src={this.state.isHover ? HoverIcon : Icon}
        />
      </div>
    );
  }
}

export default HoverableIcon;
