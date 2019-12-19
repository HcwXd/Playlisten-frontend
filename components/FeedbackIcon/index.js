import React from 'react';
import HoverableIcon from '../HoverableIcon';
import SendIcon from '../../static/imgs/send.svg';
import SendHoverIcon from '../../static/imgs/send-hover.svg';

const FeedbackIcon = props => {
  return (
    <div className="fixed bottom-0 left-0 p-4 z-50">
      <a href="http://bit.ly/35EBZFt" rel="noopener noreferrer" target="_blank">
        <HoverableIcon size={8} Icon={SendIcon} HoverIcon={SendHoverIcon} />
      </a>
    </div>
  );
};

export default FeedbackIcon;
