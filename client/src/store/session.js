import { csrfFetch } from './csrf';
import {getUserPlaylist} from "./playlist";
import {getRandomTrack, getUsersTracks} from "./track";

/*
==============================
STORE_USER
==============================
 */
//Type
const STORE_USER = 'session/storeUser';
//Action Creator
const storeUser = (user) => {
    return {
        type: STORE_USER,
        payload: user,
    };
};
//Thunk Creator                                    //Thunk
export const login = (user) => async (dispatch) => {
    const { credential, password } = user;
    const response = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({
            credential,
            password,
        }),
    });
    const data = await response.json();

    console.log("THE USER IS")
    console.log(data);

    dispatch(storeUser(data.user));
    return response;
};
//Thunk Creator                                    //Thunk
export const restoreUser = () => async dispatch => {
    const response = await csrfFetch('/api/session');
    const data = await response.json();
    console.log("RESTORE USER DATA IS: ")
    console.log(data);

    //TODO Add Demo User
    if (data.length > 0){
        dispatch(getUserPlaylist(data.user.id))
        dispatch(getUsersTracks(data.user.id))

    }
    dispatch(storeUser(data.user));
    dispatch(getRandomTrack());
    return response;
};
//Thunk Creator                                            //Thunk
export const signup = (newUserData) => async (dispatch) => {
    const {email, password, username, image, images} = newUserData;
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);


    // for multiple files
    if (images && images.length !== 0) {
        for (var i = 0; i < images.length; i++) {
            formData.append("images", images[i]);
        }
    }

    // for single file
    if (image) formData.append("image", image);

    const res = await csrfFetch(`/api/users/`, {
        method: "POST",
        headers: {
            "Content-Type": "multipart/form-data",
        },
        body: formData,
    });
    const serverRes = await res.json();
    console.log("The server responded with ", serverRes);
    dispatch(storeUser(serverRes.user));
    return res;
}




/*
==============================
REMOVE_USER
==============================
*/
//Type
const REMOVE_USER = 'session/removeUser';
//Action Creator
const removeUser = () => {
    return {
        type: REMOVE_USER,
    };
};
//Thunk Creator                                 //Thunk
export const logout = () => async (dispatch) => {
    const res = await csrfFetch('/api/session', {
        method: "DELETE",
    })
    dispatch(removeUser());
    return res;
}





/*
==============================
REDUCER
==============================
*/
const initialState = { user: null };
const sessionReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        // case STORE_USER:
        //     newState = Object.assign({}, state);
        //     newState.user = action.payload;
        //     return newState;
        case STORE_USER:
            return { ...state, user: action.payload };
        case REMOVE_USER:
            newState = Object.assign({}, state);
            newState.user = null;
            return newState;
        default:
            return state;
    }
};

export default sessionReducer;
