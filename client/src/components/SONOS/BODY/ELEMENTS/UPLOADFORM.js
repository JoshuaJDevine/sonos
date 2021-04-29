import './UPLOADFORM.css'

import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import * as trackActions from "../../../../store/track";
import BODY__CONTENT from "../CONTENT";

export default function BODY__ELEMENTS___UPLOADFORM(){
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [trackName, setTrackName] = useState("");
    const [track, setTrack] = useState(null);
    const [errors, setErrors] = useState([]);


    const handleSubmit = (e) => {

        console.log("---------------------------------")
        console.log("SONOS IS SENDING:")
        console.log(trackName, track, sessionUser.id)
        console.log("TO uploadNewTrack")

        e.preventDefault();

        if (trackName.length >= 3 && trackName.length <= 60 && track != null) {
            setErrors([]);
            return dispatch(trackActions.uploadNewTrack({ trackName, track, userId:sessionUser.id }))
                .then(() => {
                    setTrackName("");
                    setTrack(null);
                })
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                });
        }
        else {
            const newErr = []
            let regExp = /\.([0-9a-z]+)(?:[\?#]|$)/i;
            if (trackName.length < 3 || trackName.length > 60 && track){
                newErr.push("Track name must be between 1 and 60 characters long")
            }
            if (track === null){
                newErr.push("No track selected to upload.")
            }
            if (track.name.match(regExp)[1] != ".mp3"){
                newErr.push("Sonos currently only accepts MP3 files.")
            }
            setErrors(newErr);

        }
    }

    const updateFile = (e) => {
        const file = e.target.files[0];
        if (file) setTrack(file);
    };

    return (
        <div className='BODY__ELEMENTS___UPLOADFORM'>
            <form onSubmit={handleSubmit}>
                <div className='SONOS__ERRORS'>
                    {errors.map((error, idx) => <p key={idx}>{error}</p>)}
                </div>
                <label htmlFor='trackName'>
                    Track Name
                </label>
                <input
                    id='trackName'
                    name= 'trackName'
                    type="text"

                    value={trackName}
                    onChange={(e) => setTrackName(e.target.value)}
                    required
                />
                <label htmlFor='trackFile'>
                </label>
                <input type="file" id='trackFile' name='trackFile' onChange={updateFile} />
                <button type="submit">Upload</button>
            </form>
        </div>
    )
}
