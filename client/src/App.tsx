import React from 'react';
import './App.css';
import { ThemeContext, Theme } from './context/ThemeContext';
import SONOS from "./components/SONOS";
import {BrowserRouter} from "react-router-dom";

function App() {
    const [theme, setTheme] = React.useState(Theme.Dark);

    return (
        <ThemeContext.Provider value={{theme, setTheme}}>
            <BrowserRouter>
                <div className={'App ' + theme}>
                    <SONOS />
                </div>
            </BrowserRouter>
        </ThemeContext.Provider>
  );
}

export default App;
