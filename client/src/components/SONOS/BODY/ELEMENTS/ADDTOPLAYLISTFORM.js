import './ADDTOPLAYLISTFORM.css'

import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import * as playlistActions from "../../../../store/playlist";
import * as trackActions from "../../../../store/track";

export default function BODY__ELEMENTS___ADDTOPLAYLISTFORM({setShowModal,trackId }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [playListName, setPlaylistName] = useState('');
    const [errors, setErrors] = useState([]);
    const myPlaylists = useSelector(state => state.playlists.playlists)


    const addTrackToPlaylist = (e) => {
        console.log("add track", trackId, "to playlist", myPlaylists?.usersPlaylists?.Playlists[e.target.value].id)
        dispatch(trackActions.AddNewTrackToPlaylist({
            trackId: trackId,
            playlistId: myPlaylists?.usersPlaylists?.Playlists[e.target.value].id,
            userId: sessionUser.id}
        ))
    }


    const handleSubmit = (e) => {
        setShowModal(false);
    }

    return (
        <div className='BODY__ELEMENTS___NEWPLAYLISTFORM'>
            <form onSubmit={handleSubmit}>
                <p>CHOOSE A PLAYLIST</p>
                <>
                    {myPlaylists.usersPlaylists !== undefined && myPlaylists?.usersPlaylists?.Playlists?.length > 0 ?
                        myPlaylists.usersPlaylists.Playlists.map((playlist, idx) => (
                                <button id={"PlaylistAdd"} value={idx} key={playlist.id} onClick={addTrackToPlaylist} >
                                    {playlist.name}
                                </button>
                            )
                        )
                        :
                        <div>
                            <p>No playlists :(</p>
                            <p>Make a playlist and enjoy your day!</p>
                        </div>
                    }
                </>
                <button type="submit">CLOSE</button>
            </form>
        </div>
    )
}
