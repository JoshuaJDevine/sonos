import { csrfFetch } from './csrf';

/*
==============================
UPLOAD_TRACK
==============================
 */
//Type
const STORE_TRACK = 'track/uploadTrack';
//Action Creator
const storeTrack = (track) => {
    return {
        type: STORE_TRACK,
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
    dispatch(storeTrack(serverRes.track))
    return res;
}

/*
==============================
REDUCER
==============================
*/
const initialState = { track: null };
const trackReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case STORE_TRACK:
            return { ...state, track: action.payload };
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
