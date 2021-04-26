import './UPLOADFORM.css'

import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import * as trackActions from "../../../../store/track";

export default function BODY__ELEMENTS___UPLOADFORM(){
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [trackName, setTrackName] = useState("");
    const [track, setTrack] = useState(null);
    const [errors, setErrors] = useState([]);

    if (!sessionUser){
        console.log("User not authorized, Redirecting to login")
        return <Redirect to='/login' />
    }

    const handleSubmit = (e) => {

        console.log("---------------------------------")
        console.log("SONOS IS SENDING:")
        console.log(trackName, track, sessionUser.id)
        console.log("TO uploadNewTrack")

        e.preventDefault();
        if (trackName.length >= 1 && trackName.length <= 120 && track != null) {
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
            if (trackName.length >= 1 && trackName.length <= 120 && track){
                errors.push("Track name must be between 1 and 120 characters long")
            }
            if (track === null){
                errors.push("No track selected to upload.")
            }
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
