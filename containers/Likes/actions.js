import { CHANGE_CURRENT_PLAYING_SONG } from '../Player/constant';

export const changeCurrentPlayingSong = (songId, playlist) => dispatch => {
  dispatch({
    type: CHANGE_CURRENT_PLAYING_SONG,
    payload: { currentPlayingSong: songId, currentPlayingPlaylist: playlist },
  });
};
