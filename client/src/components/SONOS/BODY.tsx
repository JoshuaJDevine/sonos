// @ts-nocheck
import React, { useState, useEffect } from "react";
import {Route, Switch} from "react-router-dom";


import BODY__CONTENT from "./BODY/CONTENT";
import BODY__SPLASH from "./BODY/SPLASH";
import BODY__LOGIN from "./BODY/LOGIN";
import BODY__SIGNUP from "./BODY/SIGNUP";


export default function BODY(){

    return (
        <div className='BODY'>
            <Switch>
                <Route path='/home'>
                    <BODY__CONTENT />
                </Route>
                <Route path='/login'>
                    <BODY__LOGIN />
                </Route>
                <Route path='/signup'>
                    <BODY__SIGNUP />
                </Route>
                <Route path='/'>
                    <BODY__SPLASH />
                </Route>
            </Switch>
        </div>
    )
}
