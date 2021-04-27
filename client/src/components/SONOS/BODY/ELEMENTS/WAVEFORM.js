// @ts-nocheck
/* eslint-disable react/prop-types */

import './WAVEFORM.css'

import React, { useEffect, useRef, useState } from "react";

// @ts-ignore
import WaveSurfer from "../../../../plugins/wavesurfer.js";
import csrfFetch from "../../../../store/csrf";
import {useDispatch, useSelector} from "react-redux";
import {getTracksComments} from "../../../../store/comments";

// @ts-ignore
const formWaveSurferOptions = ref => ({
    container: ref,
    waveColor: "#787878",
    progressColor: "OrangeRed",
    cursorColor: "OrangeRed",
    barWidth: 5,
    barRadius: 3,
    responsive: true,
    height: 150,
    // If true, normalize by the maximum peak instead of 1.0.
    normalize: true,
    // Use the PeakCache to improve rendering speed of large waveforms.
    partialRender: true,
    xhr: "no-cors"
});



export default function Waveform({ url, trackId }) {
    const dispatch = useDispatch();
    const waveformRef = useRef(null);
    const wavesurfer = useRef(null);
    const [playing, setPlay] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const [comment, setComment] = useState("")
    const [currentTrackId, setCurrentTrackId] = useState(null);
    const sessionUser = useSelector(state => state.session.user);
    const trackComments = useSelector(state => state.comments.trackComments)
    const  [likedTrack, setLikedTrack] = useState(false);



    // create new WaveSurfer instance
    // On component mount and when trackURL changes
    useEffect(() => {
        setPlay(false);

        const options = formWaveSurferOptions(waveformRef.current)

        console.log("Prepping load Wavesurfer");
        console.log("Setting trackId to", trackId);
        setCurrentTrackId(trackId);

        wavesurfer.current = WaveSurfer.create(options);

        wavesurfer.current.load(url);

        wavesurfer.current.on("ready", function() {
            // https://wavesurfer-js.org/docs/methods.html
            // make sure object stillavailable when file loaded
            if (wavesurfer.current) {
                wavesurfer.current.setVolume(volume);
                setVolume(volume);
                dispatch(getTracksComments(trackId));
                generateComments();
            }
        });

        // Removes events, elements and disconnects Web Audio nodes.
        // when component unmount
        return () => {
            console.log("===========Cleaning up")
            wavesurfer.current.destroy();
        }

    }, [url]);

    const submitComment = () => {
        const content = comment
        const userId = sessionUser.id;
        const trackId = currentTrackId;

        csrfFetch('/api/comment/', {
            method: 'POST',
            body: JSON.stringify({ content, userId, trackId })
        }).then(res => res.json()).then(data => console.log(data));

    }




    const handlePlayPause = () => {
        setPlay(!playing);
        wavesurfer.current.playPause();
    };

    const onVolumeChange = e => {
        const { target } = e;
        const newVolume = +target.value;

        if (newVolume) {
            setVolume(newVolume);
            wavesurfer.current.setVolume(newVolume || 1);
        }
    };

    const handleComment = e => {
        const { target } = e;
        const newValue = target.value;
        setComment(newValue);
    }



    const handleLike = e => {
        if (sessionUser){
            if (likedTrack){
                console.log(sessionUser.id, " unliked track", trackId);
            }
            else {
                console.log(sessionUser.id, " liked track", trackId);
            }
        }
        setLikedTrack(!likedTrack);
    }

    const generateComments = function () {
        // console.log("===========Generating Comments")
        // console.log(trackComments);

        if (trackComments != null){
            let generateAllComments = trackComments.map((comment) =>
                <div className='SONOS__COMMENTBOX___COMMENT' key={comment.id}>
                    <img id={comment.userId}
                         src={comment.User.profileImageUrl != null ? comment.User.profileImageUrl : '/img/musical-note_SM.png'}
                         alt='userIcon'/>
                    <p>{comment.content}</p>
                </div>
            );

            return (
                generateAllComments
            )
        }
        else {
            return(
                <div className='SONOS__COMMENTBOX___COMMENT' key='data.id'>
                    <img id={1}
                         src={'/img/musical-note_SM.png'}
                         alt='userIcon'/>
                    <p>No Comments</p>
                </div>
            )
        }
    }


    return (
        <div>
            <div id="waveform" ref={waveformRef} />
            <div className="controls">
                <button onClick={handlePlayPause}>{!playing ? "Play" : "Pause"}</button>
                <input
                    className='SONOS__VOLUMESLIDER'
                    type="range"
                    id="volume"
                    name="volume"
                    // waveSurfer recognize value of `0` same as `1`
                    //  so we need to set some zero-ish value for silence
                    min="0.01"
                    max="1"
                    step=".025"
                    onChange={onVolumeChange}
                    defaultValue={volume}
                />
                <input
                    maxLength="20" //TODO style and UX
                    placeholder='Leave a comment'
                    type="text"
                    id="myComment"
                    name="myComment"
                    className='SONOS__COMMENTINPUT'
                    onChange={handleComment}
                    value={comment}
                />
                <button onClick={submitComment}>{"COMMENT"}</button>
                <img className={`SONOS__TRACKLIKE ${likedTrack ? "like" : "unlike"}`} src='/img/sonos_star_bl.png' onClick={handleLike}></img>

            </div>
            <div className='SONOS__COMMENTBOX'>{generateComments()}</div>
        </div>
    );
}
