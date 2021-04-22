import React from 'react';
import BODY__CONTENT___TOPNAV from "./LAYOUT/TOPNAV";
import BODY__CONTENT___SUBNAV from "./LAYOUT/SUBNAV";
import BODY__CONTENT___MAIN from "./LAYOUT/MAIN";
import BODY__CONTENT___RIGHTNAV from "./LAYOUT/RIGHTNAV";
import BODY__CONTENT___BOTNAV from "./LAYOUT/BOTNAV";

export default function BODY__CONTENT(){
    return(
                <div className='BODY__CONTENT'>
                    <BODY__CONTENT___TOPNAV />
                    <BODY__CONTENT___SUBNAV />
                    <BODY__CONTENT___MAIN />
                    <BODY__CONTENT___RIGHTNAV />
                    <BODY__CONTENT___BOTNAV />
                </div>
    )
}
