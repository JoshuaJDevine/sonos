// @ts-nocheck
/* eslint-disable react/prop-types */

import './WAVEFORM.css'

import React, { useEffect, useRef, useState } from "react";

// @ts-ignore
import WaveSurfer from "../../../../plugins/wavesurfer.js";
import csrfFetch from "../../../../store/csrf";
import {useDispatch, useSelector} from "react-redux";
import {getTracksComments} from "../../../../store/comments";
import {getTrackLike, updateTrackLike} from "../../../../store/likes";
import * as sessionActions from "../../../../store/session";
import {Link, Redirect} from "react-router-dom";
import {getUserPlaylist} from "../../../../store/playlist";
import track, {getUsersTracks} from "../../../../store/track";
import * as trackActions from "../../../../store/track";
import ADDTOPLAYLISTMODAL from "./ADDTOPLAYLISTMODAL";

import {useColor, useSize, userAutoPlay} from '../../../../context/ThemeContext';




export default function Waveform({ url, trackId, activePlaylistId, selectedPlaylist, changeTrack }) {
    const dispatch = useDispatch();
    const waveformRef = useRef(null);
    const wavesurfer = useRef(null);
    const {autoPlay} = userAutoPlay();

    const [playing, setPlay] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const [comment, setComment] = useState("")
    const [currentTrackId, setCurrentTrackId] = useState(null);
    const [showComments, setShowComments] = useState(false);
    const [waveformReady, setWaveformReady] = useState(false);
    const [playlistIndex, setPlaylistIndex] = useState(0);
    const sessionUser = useSelector(state => state.session.user);
    const trackComments = useSelector(state => state.comments.trackComments)
    const trackLikeStatus = useSelector(state => state.likes.trackLike)
    const { color, setColor} = useColor();
    const { size, setSize} = useSize();

// @ts-ignore
    const formWaveSurferOptions = ref => ({
        container: ref,
        waveColor: "#787878",
        progressColor: color,
        cursorColor: color,
        barWidth: size*2,
        barRadius: size,
        responsive: true,
        height: 150,
        // If true, normalize by the maximum peak instead of 1.0.
        normalize: true,
        // Use the PeakCache to improve rendering speed of large waveforms.
        partialRender: true,
        xhr: "no-cors"
    });




    // create new WaveSurfer instance
    // On component mount and when trackURL changes
    useEffect(() => {
        setPlay(false);
        setWaveformReady(false);
        dispatch(getTracksComments(trackId));
        const options = formWaveSurferOptions(waveformRef.current)
        setCurrentTrackId(trackId);

        wavesurfer.current = WaveSurfer.create(options);

        wavesurfer.current.load(url);

        wavesurfer.current.on("ready", function() {
            // https://wavesurfer-js.org/docs/methods.html
            if (wavesurfer.current) {
                wavesurfer.current.setVolume(volume);
                setVolume(volume);
                dispatch(getTrackLike(sessionUser.id, trackId));
                setWaveformReady(true);
                if (autoPlay){
                    setPlay(true)
                    wavesurfer.current.play();
                }
            }
        });

        wavesurfer.current.on("finish", function () {
            if (wavesurfer.current){
                setPlay(false)
                if (autoPlay){
                    if (playlistIndex === selectedPlaylist.length-2){
                        setPlaylistIndex(-1)
                    }else {
                        let newIdx = playlistIndex + 1;
                        setPlaylistIndex(newIdx)
                    }
                    changeTrack(selectedPlaylist[playlistIndex+1], selectedPlaylist);
                }
            }
        })

        // Removes events, elements and disconnects Web Audio nodes.
        // when component unmount
        return () => {
            // console.log("-----WAVEFORM CLEANING UP");
            wavesurfer.current.destroy();
        }

    }, [url]);

    const handleAutoPlay = () => {
        setAutoPlay(!autoPlay);
    }

    const handlePlayPause = () => {
        setPlay(!playing);
        wavesurfer.current.playPause();
    };

    const handleShowComments = () => {
        setShowComments(!showComments);
    }

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

    const submitComment = () => {
        const content = comment
        const userId = sessionUser.id;
        const trackId = currentTrackId;

        if (sessionUser){
            csrfFetch('/api/comment/', {
                method: 'POST',
                body: JSON.stringify({ content, userId, trackId })
            }).then(res => res.json()).then((data) =>{
                console.log(data);
                dispatch(getTracksComments(trackId));
            })
        }
        setComment("");

    }

    const handleLike = e => {
        if (sessionUser){
            dispatch(updateTrackLike(sessionUser.id, trackId));
            // dispatch(getTrackLike(sessionUser.id, trackId));
        }
    }

    const generateComments = function () {
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
            //IDE DONT LIKE NOT HAVING ELSE. NOT ONE BIT
        }
    }


    return (
        <div className='SONOS__WAVEFORM___WRAPPER'>
            <div className='WaveformLoader'>
                {waveformReady ? "" : "Please wait..."}
            </div>
            <div id="waveform" ref={waveformRef} />
            {waveformReady ?
                <div className="controls">
                    <button onClick={handlePlayPause}>{!playing ? "Play" : "Pause"}</button>
                    <button onClick={handleAutoPlay}>{!autoPlay ? "Manual" : "Auto"}</button>
                    <ADDTOPLAYLISTMODAL trackId={trackId}/>
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
                    <div className='LikeHolder'>
                        {waveformReady ? <img className={`SONOS__TRACKLIKE ${trackLikeStatus ? "like" : "unlike"}`} src='/img/sonos_star_bl.png' onClick={handleLike}></img>: ""}
                    </div>
            </div> : ""
            }
            <div className='SONOS__COMMENTBOX'>
                <button onClick={handleShowComments}>{showComments ? "|||" : "COMMENTS"}</button>
                {trackComments && waveformReady && showComments ? generateComments() : ""}
            </div>
        </div>
    );
}
