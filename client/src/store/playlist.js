import { csrfFetch } from './csrf';




/*
==============================
STORE PLAYLISTS FOR USER
==============================
 */
//Type
const STORE_USERPLAYLIST = 'playlist/storeUserPlaylist'
//Action Creator
const storeUserPlaylist = (playlists) => {
    return {
        type: STORE_USERPLAYLIST,
        payload: playlists,
    }
}
//Thunk Creator                                                   //Thunk
export const getUserPlaylist = (userId) => async (dispatch) => {
    const res = await csrfFetch(`/api/playlist/${userId}`, {
        method: 'GET',
    });
    const serverRes = await res.json();

    dispatch(storeUserPlaylist(serverRes))

    return res;
}



/*
==============================
CREATE PLAYLIST FOR USER
==============================
*/
//Thunk Creator                                                   //Thunk
export const createUserPlaylist = (data) => async (dispatch) => {
    const res = await csrfFetch(`/api/playlist/`, {
        method: 'POST',
        body: JSON.stringify( {
            name: data.name,
            isPrivate: data.isPrivate,
            userId: data.userId
        }
        )
    });
    const serverRes = await res.json();
    dispatch(getUserPlaylist(data.userId))

    return res;
}



/*
==============================
REDUCER
==============================
*/
const initialState = { playlists: [] };
const playlistReducer = (state = initialState, action) => {
    switch (action.type) {
        case STORE_USERPLAYLIST:
            return { ...state, playlists: action.payload };
        default:
            return state;
    }
};

export default playlistReducer;








