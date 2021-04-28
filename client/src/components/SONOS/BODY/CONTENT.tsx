import React from 'react';
import BODY__LAYOUT___TOPNAV from "./LAYOUT/TOPNAV";
import BODY__LAYOUT___SUBNAV from "./LAYOUT/SUBNAV";
import BODY__LAYOUT___MAIN from "./LAYOUT/MAIN";
import BODY__LAYOUT___RIGHTNAV from "./LAYOUT/RIGHTNAV";
import BODY__LAYOUT___BOTNAV from "./LAYOUT/BOTNAV";
import {useTheme} from "../../../context/ThemeContext";

export default function BODY__CONTENT(){
    const { theme, setTheme} = useTheme();

    return(
                <div className={'BODY__CONTENT ' + theme}>
                    <BODY__LAYOUT___TOPNAV />
                    {/*<BODY__LAYOUT___SUBNAV />*/}
                    <BODY__LAYOUT___MAIN />
                    <BODY__LAYOUT___RIGHTNAV />
                    <BODY__LAYOUT___BOTNAV />
                </div>
    )
}
