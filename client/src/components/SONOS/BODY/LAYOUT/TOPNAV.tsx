// @ts-nocheck
import React, {useEffect, useState} from "react";
import {Link, Redirect} from "react-router-dom";


import {Theme, useTheme} from '../../../../context/ThemeContext';
import './TOPNAV.css'
import * as sessionActions from "../../../../store/session";
import {useDispatch, useSelector} from "react-redux";


export default function BODY__CONTENT___TOPNAV(){
    const { theme, setTheme} = useTheme();
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();



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

            {manageSessionButtons(sessionUser, dispatch)}

            <button>
                Upload
            </button>
            <button id={'hamburgerMenu'}>
                ...
            </button>
        </div>
    )
}

function manageSessionButtons(sessionUser, dispatch){
    const handleLogout = function (){

        console.log("logging out user");
        dispatch(sessionActions.logout());
        return <Redirect to='/home' />
    }

    if (sessionUser){
        console.log(sessionUser.profileImageUrl);
    }

    if (!sessionUser){
        return (
            <>
                <Link to='/login'>
                    <button>
                        Log in
                    </button>
                </Link>

                <Link to='/signup'>
                    <button>
                        Sign up
                    </button>
                </Link>
            </>
        )
    }
    else {
        return (
            <>
                <img id='userProfileImg' src={sessionUser.profileImageUrl != null ? sessionUser.profileImageUrl : '/img/musical-note_SM.png'} alt='musicNote'/>
                <Link to='/profile'>
                    <button>
                        Profile
                    </button>
                </Link>

                <button
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </>
        )
    }
}
