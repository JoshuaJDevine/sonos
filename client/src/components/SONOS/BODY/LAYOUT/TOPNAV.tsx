// @ts-nocheck
import React, {useEffect} from "react";
import {Link, Redirect} from "react-router-dom";


import {Theme, useTheme} from '../../../../context/ThemeContext';
import './TOPNAV.css'
import * as sessionActions from "../../../../store/session";
import {useDispatch, useSelector} from "react-redux";
import LOGINFORMMODAL from "../ELEMENTS/LOGINFORMMODAL";
import SIGNUPFORMMODAL from "../ELEMENTS/SIGNUPFORMMODAL";


export default function BODY__CONTENT___TOPNAV(){
    const { theme, setTheme} = useTheme();
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
    return(
        <div className={'BODY__CONTENT___TOPNAV ' + theme}>
            <img id='nav-logo' src="/logo_orange.png" alt='sonos_logo'/>

            <Link to ='/home'>
                <button>
                    Home
                </button>
            </Link>

            {/*WIP -> Some kind of Searchable DB for users?*/}
            <button>
                Library
            </button>

            <button onClick={ChangeTheme}>
                { theme }
            </button>

            {/*Maybe revisit this feature?*/}
            {/*<input className='SearchBar' type="text" placeholder="Search.." name="search" />*/}
            {sessionUser ?
                <>
                    <Link to='/profile'>
                        <button>Profile</button>
                    </Link>
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
