import { csrfFetch } from './csrf';

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
    dispatch(storeUser(data.user));
    return response;
};
//Thunk Creator                                    //Thunk
export const restoreUser = () => async dispatch => {
    const response = await csrfFetch('/api/session');
    const data = await response.json();
    dispatch(storeUser(data.user));
    return response;
};
//Thunk Creator                                            //Thunk
export const signup = (newUserData) => async (dispatch) => {
    // console.log(newUserData);
    const {email, password, username} = newUserData;
    // console.log(email);
    const res = await csrfFetch('/api/users', {
        method: "POST",
        body: JSON.stringify({
            username,
            email,
            password
        })
    })
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
        case STORE_USER:
            newState = Object.assign({}, state);
            newState.user = action.payload;
            return newState;
        case REMOVE_USER:
            newState = Object.assign({}, state);
            newState.user = null;
            return newState;
        default:
            return state;
    }
};

export default sessionReducer;
