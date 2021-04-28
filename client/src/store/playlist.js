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
    // console.log("234234324324234324324324324324")
    // console.log(serverRes)
    // console.log(res);
    dispatch(storeUserPlaylist(serverRes))

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








