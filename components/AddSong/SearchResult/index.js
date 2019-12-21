import React, { useState } from 'react';
import HoverableIcon from '../../HoverableIcon';
import LinkIcon from '../../../static/imgs/external-link.svg';
import LinkHoverIcon from '../../../static/imgs/external-link-hover.svg';

function SearchResult(props) {
  const { sourceId, name, cover, handleClickOnSearchResult } = props;
  const [showPreview, setShowPreview] = useState(false);

  return (
    <li
      className="border-t border-b flex items-center hover:bg-gray-100 relative"
      onMouseEnter={() => setShowPreview(true)}
      onMouseLeave={() => setShowPreview(false)}>
      <div
        className="p-4 w-full cursor-pointer"
        data-id={sourceId}
        onClick={handleClickOnSearchResult}>
        {name}
      </div>
      <div className="p-4">
        <a
          href={`https://www.youtube.com/watch?v=${sourceId}`}
          rel="noopener noreferrer"
          target="_blank">
          <HoverableIcon size={6} Icon={LinkIcon} HoverIcon={LinkHoverIcon} />
        </a>
      </div>
      {showPreview && (
        <div className="absolute w-32 left-100">
          <img src={cover} />
        </div>
      )}
    </li>
  );
}

export default SearchResult;
