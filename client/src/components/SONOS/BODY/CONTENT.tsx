import React from 'react';
import BODY__LAYOUT___TOPNAV from "./LAYOUT/TOPNAV";
import BODY__LAYOUT___MAIN from "./LAYOUT/MAIN";
import {useTheme} from "../../../context/ThemeContext";

export default function BODY__CONTENT(){
    const { theme } = useTheme();

    return(
                <div className={'BODY__CONTENT ' + theme}>
                    <BODY__LAYOUT___TOPNAV />
                    <BODY__LAYOUT___MAIN />
                </div>
    )
}
