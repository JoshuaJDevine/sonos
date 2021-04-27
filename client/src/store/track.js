import { csrfFetch } from './csrf';

/*
==============================
UPLOAD_TRACK
==============================
 */
//Type
const STORE_NEWTRACK = 'track/uploadNewTrack';
//Action Creator
const storeNewTrack = (track) => {
    return {
        type: STORE_NEWTRACK,
        payload: track,
    }
}
//Thunk Creator                                                     //Thunk
export const uploadNewTrack = (newTrackData) => async (dispatch) => {
    const { track, trackName, userId } = newTrackData;
    const formData = new FormData();
    formData.append("mp3", track);
    formData.append('trackName', trackName);
    formData.append('userId', userId);

    const res = await csrfFetch(`/api/track/`, {
        method: "POST",
        headers: {
            "Content-Type": "multipart/form-data",
        },
        body: formData,
    });
    const serverRes = await res.json();
    dispatch(storeNewTrack(serverRes.track))
    return res;
}



/*
==============================
GET USERS TRACKS
==============================
 */
//Type
const STORE_USERTRACKS = 'track/storeUserTracks';
//Action Creator
const storeUserTracks = (tracks) => {
    return {
        type: STORE_USERTRACKS,
        payload: tracks,
    }
}
//Thunk Creator                                                     //Thunk
export const getUsersTracks = (userData) => async (dispatch) => {
    const res = await csrfFetch(`/api/users/${userData}/tracks`);

    const serverRes = await res.json();

    dispatch(storeUserTracks(serverRes.User.Tracks))
    return res;

}




/*
==============================
REDUCER
==============================
*/
const initialState = { userTracks: null };
const trackReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case STORE_NEWTRACK:
            return { ...state, newTrack: action.payload };
        case STORE_USERTRACKS:
            return { ...state, userTracks: action.payload}
        // case REMOVE_USER:
        //     newState = Object.assign({}, state);
        //     newState.user = null;
        //     return newState;
        default:
            return state;
    }
};

//
// console.log("==============================================")
// console.log("Redux track store is sending a request to the server")
// console.log("The request will be POST /api/track")
// console.log("The content is:")
// console.log(formData.get('track'), formData.get('trackName'), formData.get('userId'))
//
//
// console.log("==============================================")
// console.log("Redux track store sent a request to the server")
// console.log("The the request was POST /api/track")
// console.log("The response from the server was:")
// console.log(serverRes);
export default trackReducer;
