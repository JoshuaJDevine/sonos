// @ts-ignore
// eslint-disable-next-line react/prop-types
import BODY__CONTENT___LISTLARGE from "../ELEMENTS/LISTLARGE";
import BODY__CONTENT___TABS from "../ELEMENTS/TABS";
import BODY__CONTENT___CAROUSEL from "../ELEMENTS/CAROUSEL";
import Waveform from "../ELEMENTS/WAVEFORM";
import PlayList from "../ELEMENTS/PLAYLIST";
import React, {useState, useEffect} from "react";
import { useSelector} from "react-redux";

import './MAIN.css'
import {Redirect} from "react-router-dom";
// @ts-ignore
// eslint-disable-next-line react/prop-types
export default function BODY__CONTENT___MAIN(){
    const sessionUser = useSelector(state => state.session.user);
    const userTrackList = useSelector(state => state.tracks.userTracks);
    const randomTracks = useSelector(state => state.tracks.randTracks);
    const [selectedPlaylist, setSelectedPlaylist] = useState([])
    const [selectedTrack, setSelectedTrack] = useState(userTrackList);

    useEffect(() => {
        if (userTrackList){
            if (userTrackList.length > 0){
                let newPlaylist = []
                userTrackList.forEach((track) => {
                    newPlaylist.push({
                        id: track.id,
                        title: track.trackName,
                        url: track.url
                    })
                })
                setSelectedPlaylist(newPlaylist);
                setSelectedTrack(newPlaylist[0])
            }
        }

        else if (randomTracks){
            let newPlaylist = []
            randomTracks.forEach((track) => {
                newPlaylist.push({
                    id: track.id,
                    title: track.trackName,
                    url: track.url
                })
            })
            setSelectedPlaylist(newPlaylist);
            setSelectedTrack(newPlaylist[0])
        }
    }, [userTrackList, sessionUser, randomTracks])

    // const testTracks = [{
    //     id: 15,
    //     title: "test",
    //     url: "https://sonos-app.s3.amazonaws.com/1619576725478.mp3"
    // }]




    console.log("SELECTED TRACK IS");
    console.log(selectedTrack);
    console.log("SELECTED PLAYLIST IS");
    console.log(selectedPlaylist);
    if (!sessionUser){
        return <Redirect to='/' />
    }
    else {
        return(
            <div className='BODY__CONTENT___MAIN'>
                <h3>BODY__CONTENT___MAIN</h3>
                <div>
                    {selectedPlaylist.length > 0 ?
                        <div>
                            <PlayList
                                tracks={selectedPlaylist}
                                selectedTrack={selectedTrack}
                                setSelectedTrack={setSelectedTrack}
                                playlists={selectedPlaylist}
                            />
                                <Waveform url={selectedTrack.url} trackId={selectedTrack.id} />
                        </div>:
                        <div>
                            <p>Please wait... </p>
                        </div>
                    }
                </div>
                <BODY__CONTENT___LISTLARGE />
                <BODY__CONTENT___TABS />
                <BODY__CONTENT___CAROUSEL />
            </div>
        )
    }
}
