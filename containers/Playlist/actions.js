import { CHANGE_CURRENT_PLAYING_SONG } from '../Player/constant';

export const changeCurrentPlayingSong = songId => dispatch => {
  dispatch({
    type: CHANGE_CURRENT_PLAYING_SONG,
    payload: { currentPlayingSong: songId },
  });
};
