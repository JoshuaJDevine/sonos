/*
//=====================\\
||INIT-----------------||
\\=====================//
 */
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from './session';
import trackReducer from "./track";
import commentsReducer from "./comments";
import likeReducer from "./likes";
import playlistReducer from "./playlist";




/*
//=====================\\
||CONFIG---------------||
\\=====================//
 */
const rootReducer = combineReducers({
    session: sessionReducer,
    tracks: trackReducer,
    comments: commentsReducer,
    likes: likeReducer,
    playlists: playlistReducer
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
    enhancer = applyMiddleware(thunk);
} else {
    const logger = require('redux-logger').default;
    const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
};




/*
//=====================\\
||EXPORT---------------||
\\=====================//
 */
export default configureStore;
