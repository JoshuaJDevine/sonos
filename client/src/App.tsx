/*
//=====================\\
||INIT-----------------||
\\=====================//
 */
//Style
import './App.css';

//React
import React from 'react';
import SONOS from "./components/SONOS";

//Theme context provider
import {Theme, ThemeContext} from "./context/ThemeContext";



// @ts-ignore
// eslint-disable-next-line react/prop-types
function App() {
    //theme slice of state
    const [theme, setTheme] = React.useState(Theme.Dark);

    //App
    return (
        <ThemeContext.Provider value={{theme, setTheme}}>
            <div className={'App ' + theme}>
                <SONOS />
            </div>
        </ThemeContext.Provider>
  );
}




/*
//=====================\\
||EXPORT---------------||
\\=====================//
 */
export default App;
