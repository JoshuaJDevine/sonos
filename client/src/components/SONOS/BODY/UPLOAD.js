import './UPLOAD.css'
import React from 'react';
import BODY__CONTENT___TOPNAV from "./LAYOUT/TOPNAV";
import BODY__ELEMENTS___UPLOADFORM from "./ELEMENTS/UPLOADFORM";


export default function BODY__UPLOAD (){
    return (
        <div className='BODY__UPLOAD'>
            <BODY__CONTENT___TOPNAV/>
            <BODY__ELEMENTS___UPLOADFORM/>
        </div>
    )
}
