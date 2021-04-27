// @ts-ignore
import './WAVEFORM.css'

import React, { useEffect, useRef, useState } from "react";

// @ts-ignore
import WaveSurfer from "../../../../plugins/wavesurfer.js";
import csrfFetch from "../../../../store/csrf";
import {useSelector} from "react-redux";

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





// @ts-ignore
// eslint-disable-next-line react/prop-types
export default function Waveform({ url, trackId }) {
    const waveformRef = useRef(null);
    const wavesurfer = useRef(null);
    const [playing, setPlay] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const [comment, setComment] = useState("")
    const [currentTrackId, setCurrentTrackId] = useState(null);
    const [allComments, setAllComments]= useState([])
    const sessionUser = useSelector(state => state.session.user);


    // create new WaveSurfer instance
    // On component mount and when url changes
    useEffect(() => {
        setPlay(false);

        const options = formWaveSurferOptions(waveformRef.current)

        console.log("Prepping load Wavesurfer");
        console.log("Setting trackId to", trackId);
        setCurrentTrackId(trackId);

        wavesurfer.current = WaveSurfer.create(options);


        // @ts-ignore
        wavesurfer.current.load(url);

        // @ts-ignore
        wavesurfer.current.on("ready", function() {
            // https://wavesurfer-js.org/docs/methods.html
            // make sure object stillavailable when file loaded
            if (wavesurfer.current) {
                // @ts-ignore
                wavesurfer.current.setVolume(volume);
                setVolume(volume);
            }
        });

        // Removes events, elements and disconnects Web Audio nodes.
        // when component unmount
        // @ts-ignore
        return () => wavesurfer.current.destroy();
    }, [url]);


    const handlePlayPause = () => {
        setPlay(!playing);
        // @ts-ignore
        wavesurfer.current.playPause();
    };

    // @ts-ignore
    const onVolumeChange = e => {
        const { target } = e;
        const newVolume = +target.value;

        if (newVolume) {
            setVolume(newVolume);
            // @ts-ignore
            wavesurfer.current.setVolume(newVolume || 1);
        }
    };

    const handleComment = e => {
        const { target } = e;
        const newValue = target.value;
        setComment(newValue);
    }

    const submitComment = () => {
        const content = comment
        const userId = sessionUser.id;
        const trackId = currentTrackId;

        console.log("===========WAVEFORM SENDING COMMENT")
        console.log(content, userId, trackId)

        csrfFetch('/api/comment/', {
            method: 'POST',
            body: JSON.stringify({ content, userId, trackId })
        }).then(res => res.json()).then(data => console.log(data));
    }

    const handleLike = e => {
        console.log("//-------TODO-------//")
        console.log("//------------------//")
        console.log("IMPLEMENT LIKES")
        console.log("//------------------//")
        console.log("//------------------//")
    }









    return (
        <div>
            <div id="waveform" ref={waveformRef} />
            <div className="controls">
                <button onClick={handlePlayPause}>{!playing ? "Play" : "Pause"}</button>
                <input
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
                <label htmlFor="volume">Volume</label>
                <button onClick={handleLike}>{"Like"}</button>
                <label htmlFor="volume">Leave a comment    </label>
                <input
                    maxLength="20" //TODO style and UX
                    type="text"
                    id="myComment"
                    name="myComment"
                    onChange={handleComment}
                    value={comment}
                />
                <button onClick={submitComment}>{"COMMENT"}</button>
            </div>
            <GenerateUserComment/>
        </div>
    );
}



const GenerateUserComment = function(users) {
    users = null;
    if (users) {
        users.map(function (data) {
            return (
                <div className='SONOS__COMMENTBOX___COMMENT' key='data.id'>
                    <img id={data.userName}
                         src={data.profileImageUrl != null ? data.profileImageUrl : '/img/musical-note_SM.png'}
                         alt='musicNote'/>
                    <p>data.comment</p>
                </div>
            )
        })
    }
    else {
        return (
            <>
                <div className='SONOS__COMMENTBOX___COMMENT'>
                    <img id="Fake Comment 1"
                         src={'/img/musical-note_SM.png'}
                         alt='musicNote'/>
                    <p>Fake Comment 1</p>
                </div>
                <div className='SONOS__COMMENTBOX___COMMENT'>
                    <img id="Fake Comment 2"
                         src={'/img/musical-note_SM.png'}
                         alt='musicNote'/>
                    <p>Fake Comment 2</p>
                </div>
                <div className='SONOS__COMMENTBOX___COMMENT'>
                    <img id="Fake Comment 3"
                         src={'/img/musical-note_SM.png'}
                         alt='musicNote'/>
                    <p>Fake Comment 3</p>
                </div>
            </>
        )
    }
}
