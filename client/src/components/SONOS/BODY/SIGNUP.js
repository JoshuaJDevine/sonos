import './SPLASH.css'

import React from "react";

import BODY__LAYOUT___TOPNAV from "./LAYOUT/TOPNAV";
import BODY__ELEMENTS___SIGNUPFORM from "./ELEMENTS/SIGNUPFORM";


export default function BODY__SIGNUP() {
    return(
        <div className='BODY__SIGNUP'>
            <BODY__LAYOUT___TOPNAV />
            <BODY__ELEMENTS___SIGNUPFORM />
        </div>
    )
}
