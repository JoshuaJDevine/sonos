import { csrfFetch } from './csrf';



/*
==============================
GET TRACK LIKES
==============================
 */
//Type
const STORE_TRACKLIKE = 'likes/storeTrackLike';
//Action Creator
const storeTrackLike = (like) => {
    return {
        type: STORE_TRACKLIKE,
        payload: like,
    }
}
//Thunk Creator                                                   //Thunk
export const getTrackLike = (userId, trackId) => async (dispatch) => {
    const res = await csrfFetch(`/api/track/${trackId}/${userId}/like`);
    const serverRes = await res.json();
    console.log("====GETTING TRACK LIKE=====");
    console.log(serverRes.likes);
    if (serverRes.likes != null){
        dispatch(storeTrackLike(true))
    }
    else {
        dispatch(storeTrackLike(false))
    }
    return res;
}

//Thunk Creator                                                   //Thunk
export const updateTrackLike = (userId, trackId) => async (dispatch) => {
    const res = await csrfFetch(`/api/track/${trackId}/${userId}/like`, {
        method: 'POST'
    });
    const serverRes = await res.json();
    console.log("====UPDATING TRACK LIKE=====");
    console.log(serverRes.like);
    if (serverRes.like === "Destroyed!! What else is there to return? Probably something I don't remember atm..."){
        console.log("DISPATCHING FALSE");
        dispatch(storeTrackLike(false))
    }
    else {
        console.log("DISPATCHING TRUE");
        dispatch(storeTrackLike(true))
    }
    return res;
}



/*
==============================
REDUCER
==============================
*/
const initialState = { trackLike: false };
const likeReducer = (state = initialState, action) => {
    switch (action.type) {
        case STORE_TRACKLIKE:
            return { ...state, trackLike: action.payload };
        default:
            return state;
    }
};

export default likeReducer;
