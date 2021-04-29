/*
//=====================\\
||INIT-----------------||
\\=====================//
 */
// @ts-nocheck
//Style
import './App.css';

//React
import React, {useEffect, useState} from 'react';
import SONOS from "./components/SONOS";

//Theme context provider
import {Theme, ThemeContext} from "./context/ThemeContext";
import {useDispatch} from "react-redux";
import * as sessionActions from "./store/session";

import { ModalProvider } from "./context/Modal";

// @ts-ignore
// eslint-disable-next-line react/prop-types
function App() {
    //theme slice of state
    const [theme, setTheme] = React.useState(Theme.Dark);

    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        dispatch(sessionActions.restoreUser()).then(() => {
            setIsLoaded(true)
        });
    }, [dispatch]);

    //App
    return (
        <ThemeContext.Provider value={{theme, setTheme}}>
            <ModalProvider>
                <div className={'App ' + theme}>
                    <SONOS />
                </div>
            </ModalProvider>

        </ThemeContext.Provider>
  );
}




/*
//=====================\\
||EXPORT---------------||
\\=====================//
 */
export default App;
