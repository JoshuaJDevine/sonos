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
import {Theme, ThemeContext, WFColorContext, WFSize, WFAutoPlay} from "./context/ThemeContext";
import {useDispatch} from "react-redux";
import * as sessionActions from "./store/session";

import { ModalProvider } from "./context/Modal";

// @ts-ignore
// eslint-disable-next-line react/prop-types
function App() {
    //theme slice of state
    const [theme, setTheme] = React.useState(Theme.Dark);
    const [color, setColor] = React.useState("#ff4500");
    const [size, setSize] = React.useState(2);
    const [autoPlay, setAutoPlay] = React.useState(true);
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        dispatch(sessionActions.restoreUser()).then(() => {
            setIsLoaded(true)
        });
    }, [dispatch]);

    //App
    return (
        <WFAutoPlay.Provider value={{autoPlay, setAutoPlay}}>
            <WFSize.Provider value={{size, setSize}}>
                <WFColorContext.Provider value={{color, setColor}}>
                    <ThemeContext.Provider value={{theme, setTheme}}>
                        <ModalProvider>
                            <div className={'App ' + theme}>
                                <SONOS />
                            </div>
                        </ModalProvider>
                    </ThemeContext.Provider>
                </WFColorContext.Provider>
            </WFSize.Provider>
        </WFAutoPlay.Provider>

  );
}




/*
//=====================\\
||EXPORT---------------||
\\=====================//
 */
export default App;
