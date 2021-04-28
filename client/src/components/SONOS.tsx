import React from "react";
import BODY from "./SONOS/BODY";
import {Theme, useTheme} from "../context/ThemeContext";

export default function SONOS(){
    const { theme, setTheme} = useTheme();


    return(

        <div className={'SONOS ' + theme} >
            <BODY />
        </div>
    )
}
