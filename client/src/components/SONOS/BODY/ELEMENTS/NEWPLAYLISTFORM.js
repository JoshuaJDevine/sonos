import './NEWPLAYLISTFORM.css'

import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import * as playlistActions from "../../../../store/playlist";

export default function BODY__ELEMENTS___NEWPLAYLISTFORM({setShowModal}) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [playListName, setPlaylistName] = useState('');
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        if (playListName.length > 40) {
            let newErrors = errors;
            newErrors.push("Playlist name should be 40 characters or less.")
            setErrors(newErrors);
        }
        else {
            console.log('DISPATCH NEW PLAYLIST!')
            console.log('NAME:', playListName);
            console.log('USERID:', sessionUser.id);
            dispatch(playlistActions.createUserPlaylist({
                name: playListName,
                isPrivate: false,
                userId: sessionUser.id
            }))
            setShowModal(false);
        }
    }
    console.log(errors);

    return (
        <div className='BODY__ELEMENTS___NEWPLAYLISTFORM'>
            <form onSubmit={handleSubmit}>
                <div className='SONOS__ERRORS'>
                    {errors.map((error, idx) => <p key={idx}>{error}</p>)}
                </div>
                <label htmlFor='NewPlaylistName'>
                    Playlist Name
                </label>
                <input
                    id='NewPlaylistName'
                    type="text"
                    value={playListName}
                    onChange={(e) => setPlaylistName(e.target.value)}
                    required
                />
                <button type="submit">Create</button>
            </form>
        </div>
    )
}
