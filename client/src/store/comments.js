import { csrfFetch } from './csrf';




/*
==============================
GET TRACKS COMMENTS
==============================
 */
//Type
const STORE_TRACKCOMMENTS = 'comments/storeTrackComments';
//Action Creator
const storeTrackComments = (comments) => {
    return {
        type: STORE_TRACKCOMMENTS,
        payload: comments,
    }
}
//Thunk Creator                                                   //Thunk
export const getTracksComments = (trackId) => async (dispatch) => {
    const res = await csrfFetch(`/api/comment/${trackId}/comments`);
    const serverRes = await res.json();
    // console.log(serverRes);
    // console.log(res);
    if (serverRes.comments != undefined){
        dispatch(storeTrackComments(serverRes.comments.Comments))
    }
    else {
        console.log("DISPATRCH EMPTY ARRAY")
        dispatch(storeTrackComments([]))
    }
    return res;
}



/*
==============================
REDUCER
==============================
*/
const initialState = { trackComments: null };
const commentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case STORE_TRACKCOMMENTS:
            return { trackComments: action.payload };
        default:
            return state;
    }
};

export default commentsReducer;
