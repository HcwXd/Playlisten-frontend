import React, { useEffect, useRef } from 'react';

const Followers = props => {
  const wrapperRef = useRef(null);

  const handleClickOutside = event => {
    if (!wrapperRef.current) return;
    if (!wrapperRef.current.contains(event.target)) {
      props.toggleShowFollowers();
      document.removeEventListener('mousedown', handleClickOutside);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  console.log(props);

  return (
    <div className="fixed w-full h-full flex items-center justify-around bg-black-75 z-50">
      <div
        ref={wrapperRef}
        id="followers"
        className="flex flex-col border bg-white px-8 py-4 rounded">
        <div className="border-b mb-4 text-2xl">
          {props.isFollowings ? 'Followings' : 'Followers'}
        </div>

        <ul className="w-64 px-2">
          {props.followers.map(({ name, id }, index) => {
            return (
              <li
                key={index}
                className="mb-2 flex justify-between items-center">
                <a href={`/profile?userId=${id}`}>
                  <div>{name}</div>
                </a>
                {/**
                  <div className="cursor-pointer hover:bg-gray-100 rounded p-2 border">
                  Follow
                </div>
                 */}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Followers;
