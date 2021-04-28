// @ts-nocheck
import React from 'react';
import BODY__CONTENT___TOPNAV from "./LAYOUT/TOPNAV";
import './SPLASH.css'
import {useSelector} from "react-redux";
import {Redirect} from "react-router-dom";

export default function BODY__SPLASH(){
    const sessionUser = useSelector(state => state.session.user);
    // console.log(sessionUser);

    if (sessionUser){
        return <Redirect to='/home' />
    }
    return(
        <div className={'BODY__SPLASH'}>
            <BODY__CONTENT___TOPNAV />
            <img src='/img/sp1.jpg'/>
        </div>
    )
}
