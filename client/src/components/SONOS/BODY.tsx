import React from 'react';
import BODY__CONTENT from "./BODY/CONTENT";
import {Route, Switch} from "react-router-dom";
import SPLASH from "./SPLASH";


export default function BODY(){
    return(
            <Switch>
                <Route path='/home'>
                    <div className='BODY'>
                        <BODY__CONTENT />
                    </div>
                </Route>
                <Route path='/'>
                    <SPLASH />
                </Route>
            </Switch>
    )
}
