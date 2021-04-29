import './DEMO.css'
import React, { useState } from 'react';
import * as sessionActions from "../../../../store/session";
import {useDispatch} from "react-redux";

export default function BODY__ELEMENTS___DEMO({setShowModal,trackId }) {
    const dispatch = useDispatch();

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

    return (
        <div className='BODY__ELEMENTS___DEMO'>
            <h1>WELCOME TO SONOS!</h1>
            <h3>A stylish, feature rich audio player bundled with minimalist social features.</h3>
            <h3>UX Inspired by Epic Games Store, Soundcloud, and Spotify.</h3>
            <h3>UI inpisred by glassmorphism, neumorphism, and minimalisim</h3>
            <div>
                -------------------------------------------------------------------------------------
            </div>
            <h3>You will be logged in as LudiwgB. LudwigB has a number of tracks and playlists already created.</h3>
            <h3>Enjoy your experience with the sonos player demo!</h3>
            <h3>Check back soon for more features and updates.</h3>
            <button onClick={handleSubmit} type="submit">OK!</button>
        </div>
    )
}
