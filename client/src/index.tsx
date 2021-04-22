/*
//=====================\\
||INIT-----------------||
\\=====================//
 */
// @ts-nocheck
//Style
import './index.css';

//React
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

//Csurf protections
import { restoreCSRF, csrfFetch } from './store/csrf';

//Session actions
import * as sessionActions from './store/session';

//Redux
import { Provider } from 'react-redux';
import configureStore from './store';
const store = configureStore();
if (process.env.NODE_ENV !== 'production') {
    restoreCSRF();

    window.csrfFetch = csrfFetch;
    window.store = store;
    window.sessionActions = sessionActions;
}

//Extras
import reportWebVitals from './reportWebVitals';

//Don't expose store in production
if (process.env.NODE_ENV !== 'production') {
    // @ts-ignore
    window.store = store;
}

//Components
import App from './App';




/*
//=====================\\
||RENDER---------------||
\\=====================//
 */
ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
          <BrowserRouter>
              <App />
          </BrowserRouter>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);




// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
