// @ts-nocheck
import React, { useState, useEffect } from "react";
import {Route, Switch} from "react-router-dom";


import BODY__CONTENT from "./BODY/CONTENT";
import BODY__SPLASH from "./BODY/SPLASH";
import BODY__CONTENT___TOPNAV from "./BODY/LAYOUT/TOPNAV";
import {useTheme} from "../../context/ThemeContext";
import BODY__CONTENT___PROFILE from "./BODY/ELEMENTS/PROFILE";


export default function BODY(){
    const { theme} = useTheme();

    return (
        <div className={'BODY ' + theme}>
            <Switch>
                <Route exact path='/home'>
                    <BODY__CONTENT />
                </Route>
                <Route exact path='/profile'>
                    <BODY__CONTENT___PROFILE />
                </Route>
                <Route exact path='/'>
                    <BODY__SPLASH />
                </Route>
                <Route>
                    <BODY__CONTENT___TOPNAV />
                    <p>ERROR. Page Not Found</p>
                </Route>

            </Switch>
        </div>
    )
}
