// @ts-nocheck
import React, {useEffect, useState} from "react";
import {Link, Redirect} from "react-router-dom";


import {Theme, useColor, useSize, useTheme} from '../../../../context/ThemeContext';
import './TOPNAV.css'
import * as sessionActions from "../../../../store/session";
import {useDispatch, useSelector} from "react-redux";
import LOGINFORMMODAL from "../ELEMENTS/LOGINFORMMODAL";
import SIGNUPFORMMODAL from "../ELEMENTS/SIGNUPFORMMODAL";


export default function BODY__CONTENT___TOPNAV(){
    const { theme, setTheme} = useTheme();
    const { color, setColor} = useColor();
    const { size, setSize} = useSize();
    const [colorDisplayText, setColorDisplayText] = useState("Orange");
    const [sizeDisplayText, setSizeDisplayText] = useState("Med");
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    const handleLogout = function (){
        dispatch(sessionActions.logout());
        return <Redirect to='/home' />
    }

    const ChangeTheme = function () {
        if (theme === Theme.Dark){
            setTheme(Theme.Light)
        }
        else {
            setTheme(Theme.Dark)
        }
    }
    const setWaveFormColor = function () {
        if (color === "#ff4500") {
            setColor("#001dff")
            setColorDisplayText("Blue")
        } else if (color === "#001dff") {
            setColor("#7c00ff")
            setColorDisplayText("Purple")
        } else if (color === "#7c00ff") {
            setColor("#ff4500")
            setColorDisplayText("Orange")
        }
    }
    const setWaveFormSize = function () {
        if (size === 2) {
            setSize(3)
            setSizeDisplayText("Lg")
        } else if (size === 3) {
            setSize(1)
            setSizeDisplayText("Sm")
        } else if (size === 1) {
            setSize(2)
            setSizeDisplayText("Med")
        }
    }


    return(
        <div className={'BODY__CONTENT___TOPNAV ' + theme}>
            <img id='nav-logo' src="/logo_orange.png" alt='sonos_logo'/>

            {/*WIP -> Some kind of Searchable DB for users?*/}
            {/*<button>*/}
            {/*    Library*/}
            {/*</button>*/}



            {/*Maybe revisit this feature?*/}
            {/*<input className='SearchBar' type="text" placeholder="Search.." name="search" />*/}
            {sessionUser ?
                <>
                    <button onClick={ChangeTheme}>
                        { theme }
                    </button>
                    <button onClick={setWaveFormColor}>
                        { colorDisplayText }
                    </button>
                    <button onClick={setWaveFormSize}>
                        { sizeDisplayText }
                    </button>
                    <button onClick={handleLogout}>Logout</button>
                    <img id='userProfileImg' src={sessionUser.profileImageUrl != null ? sessionUser.profileImageUrl : '/img/musical-note_SM.png'} alt='musicNote'/>
                </>
                :
                <>
                    <LOGINFORMMODAL>
                    </LOGINFORMMODAL>
                    <SIGNUPFORMMODAL>
                    </SIGNUPFORMMODAL>
                </>
            }


        </div>
    )
}

// <Link to ='/home'>
//     <button>
//         Home
//     </button>
// </Link>
// <Link to='/profile'>
//     <button>Profile</button>
// </Link>
//
// function manageSessionButtons(sessionUser, dispatch){
//     const handleLogout = function (){
//         console.log("logging out user");
//         dispatch(sessionActions.logout());
//         return <Redirect to='/home' />
//     }
//
//     if (!sessionUser){
//         return (
//             <>
//                 <Link to='/login'>
//                     <button>
//                         Log in
//                     </button>
//                 </Link>
//
//                 <Link to='/signup'>
//                     <button>
//                         Sign up
//                     </button>
//                 </Link>
//             </>
//         )
//     }
//     else {
//         return (
//             <>
//                 <img id='userProfileImg' src={sessionUser.profileImageUrl != null ? sessionUser.profileImageUrl : '/img/musical-note_SM.png'} alt='musicNote'/>
//                 <Link to='/profile'>
//                     <button>
//                         Profile
//                     </button>
//                 </Link>
//
//                 <button
//                     onClick={handleLogout}
//                 >
//                     Logout
//                 </button>
//             </>
//         )
//     }
// }
