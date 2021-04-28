import './PROFILE.css';

import React from "react";
import BODY__CONTENT___TOPNAV from "../LAYOUT/TOPNAV";
import UPLOADFORMMODAL from "./UPLOADFORMMODAL";
import {useSelector} from "react-redux";
import {Redirect} from "react-router-dom";

export default function BODY__CONTENT___PROFILE() {
    const sessionUser = useSelector(state => state.session.user);

    if (sessionUser){
        return(
            <div className='BODY__CONTENT___PROFILE'>
                <BODY__CONTENT___TOPNAV/>
                <UPLOADFORMMODAL/>
            </div>
        )
    }
    else {
        return <Redirect to='/' />
    }
}


