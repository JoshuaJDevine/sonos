// @ts-ignore
import './DEMO.css'
import React, { useState } from 'react';
import * as sessionActions from "../../../../store/session";
import {useDispatch} from "react-redux";

export default function BODY__ELEMENTS___DEMO({setShowModal,trackId }) {
    const dispatch = useDispatch();
    const [showMoreModal, setShowMoreModal] = useState(false);

    const handleSubmit = (e) => {
        return dispatch(sessionActions.login({ credential: "LudwigB", password:"DONALDFRANCISTOVEY" }))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors){
                    setErrors(data.errors);
                }
            });
        setShowModal(false);
    }
    const handleLink = () => {
        window.open("https://github.com/JoshuaJDevine");
    }
    const handleMoreModals = (e) => {
        setShowMoreModal(true);

    }
    const handleCloseMoreModal = (e) => {
        setShowMoreModal(false);
    }


    return (
        <>
            <div className='BODY__ELEMENTS___DEMO'>
                <h1>WELCOME TO SONOS!</h1>
                <h3>A feature rich audio player bundled with social features.</h3>
                <h3>UX Inspired by Epic Games Store, Soundcloud, and Spotify.</h3>
                <h3>UI inspired by glassmorphism, neumorphism, and minimalism</h3>
                <div>
                    -------------------------------------------------------------------------------------
                </div>
                <h3>You will be logged in as LudwigB. LudwigB has a number of tracks and playlists already created.</h3>
                <h3>Enjoy your experience with the Sonos player demo!</h3>
                <h3>Check back soon for more features and updates.</h3>
                {showMoreModal ?
                    <>
                        <div id="modal">
                            <div id="modal-background-more" />
                            <div id="modal-content-more">
                                <img id='profilepic' src='/profile.png'/>
                                <h1>Joshua Devine </h1>
                                <h3>Full stack developer</h3>
                                <h3>Clean code and innovative designs</h3>
                                <button onClick={handleLink} type="submit">MY GITHUB</button>
                                <button onClick={handleCloseMoreModal} type="submit">BACK!</button>
                            </div>
                        </div>
                    </>
                        :
                    <>
                    </>
                }
                <button onClick={handleSubmit} type="submit">LOG IN</button>
                <button onClick={handleMoreModals} type="submit">ABOUT</button>
            </div>
        </>
    )
}
