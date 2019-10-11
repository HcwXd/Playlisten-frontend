import {
  CHANGE_CURRENT_PLAYING_PLAYLIST,
  CHANGE_CURRENT_PLAYING_SONG,
} from './constant';

const initialState = {
  currentPlayingPlaylist: null,
  currentPlayingSong: null,
};

export default function reducer(state = initialState, actions) {
  const { type, payload } = actions;

  switch (type) {
    case CHANGE_CURRENT_PLAYING_SONG:
      const { currentPlayingSong } = payload;
      return { ...state, currentPlayingSong };
    default:
      return state;
  }
}
