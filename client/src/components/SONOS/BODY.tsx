// @ts-nocheck
import React, { useState, useEffect } from "react";
import {Route, Switch} from "react-router-dom";


import BODY__CONTENT from "./BODY/CONTENT";
import BODY__SPLASH from "./BODY/SPLASH";
import BODY__LOGIN from "./BODY/LOGIN";
import BODY__SIGNUP from "./BODY/SIGNUP";
import BODY__UPLOAD from "./BODY/UPLOAD";
import BODY__CONTENT___TOPNAV from "./BODY/LAYOUT/TOPNAV";


export default function BODY(){

    return (
        <div className='BODY'>
            <Switch>
                <Route exact path='/home'>
                    <BODY__CONTENT />
                </Route>
                <Route exact path='/login'>
                    <BODY__LOGIN />
                </Route>
                <Route exact path='/signup'>
                    <BODY__SIGNUP />
                </Route>
                <Route exact path='/upload'>
                    <BODY__UPLOAD />
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
