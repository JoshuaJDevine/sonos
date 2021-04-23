// @ts-nocheck
import './LOGIN.css'

import React, {useState} from 'react';

import BODY__LAYOUT___TOPNAV from "./LAYOUT/TOPNAV";
import BODY__ELEMENTS___LOGINFORM from "./ELEMENTS/LOGINFORM";

export default function BODY__LOGIN(){


    return (
        <div className='BODY__LOGIN'>
            <BODY__LAYOUT___TOPNAV />
            <BODY__ELEMENTS___LOGINFORM />
        </div>
    );
}
