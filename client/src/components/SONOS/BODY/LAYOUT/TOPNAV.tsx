// @ts-nocheck
import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";


import {Theme, useTheme} from '../../../../context/ThemeContext';
import './TOPNAV.css'



export default function BODY__CONTENT___TOPNAV(){
    const { theme, setTheme} = useTheme();



    const ChangeTheme = function () {
        if (theme === Theme.Dark){
            setTheme(Theme.Light)
        }
        else {
            setTheme(Theme.Dark)
        }
    }
    // @ts-ignore
    return(
        <div className={'BODY__CONTENT___TOPNAV ' + theme}>
            <img id='nav-logo' src="/logo_basic_lc.png" alt='sonos_logo'/>
            <button onClick={ChangeTheme}>
                { theme }
            </button>
            <Link to ='/home'>
                <button>
                    Home
                </button>
            </Link>

            <button>
                Stream
            </button>

            <button>
                Library
            </button>
            <input className='SearchBar' type="text" placeholder="Search.." name="search" />

            <Link to='/login'>
                <button>
                    Sign In
                </button>
            </Link>

            <button>
                Create Account
            </button>
            <button>
                Upload
            </button>
            <button id={'hamburgerMenu'}>
                ...
            </button>
        </div>
    )
}

