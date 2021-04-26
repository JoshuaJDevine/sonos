// @ts-nocheck
import BODY__CONTENT___LISTLARGE from "../ELEMENTS/LISTLARGE";
import BODY__CONTENT___TABS from "../ELEMENTS/TABS";
import BODY__CONTENT___CAROUSEL from "../ELEMENTS/CAROUSEL";
import Waveform from "../ELEMENTS/WAVEFORM";
import PlayList from "../ELEMENTS/PLAYLIST";
import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUsersTracks} from "../../../../store/track";

export default function BODY__CONTENT___MAIN(){
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const userTrackList = useSelector(state => state.tracks.userTracks);
    const [userTracks, setUserTracks] = useState([]);
    const [testUserPlayList, setTestUserPlayList] = useState([])

    useEffect(() => {
        if (sessionUser){
            console.log("SESSION USER IS:")
            console.log(sessionUser.id);
            dispatch(getUsersTracks(sessionUser.id))
            //getUsersTracks
        }
    }, [ ])

    useEffect(() => {
        console.log(userTrackList);
        if (userTrackList){
            const newPlaylist = []
            console.log(userTrackList.length);
            userTrackList.forEach((track, index) => {
                newPlaylist.push({
                    id: index,
                    title: track.trackName,
                    url: track.url
                })
                console.log(track.url);
            })
            setTestUserPlayList(newPlaylist);
        }
    }, [userTrackList])



    const testTracks = [
        {
            id: 0,
            title: "Deinde",
            url: "/audio/deinde.mp3"
        },
        {
            id: 1,
            title: "Hearth & Heaven",
            url: "/audio/hearth.mp3"
        }
    ];

    console.log(testUserPlayList);

    const [selectedTrack, setSelectedTrack] = useState(testTracks[0]);



    return(

        <div className='BODY__CONTENT___MAIN'>
            <h3>BODY__CONTENT___MAIN</h3>
            <div>
                <Waveform url={selectedTrack.url} />
                <PlayList
                    tracks={testUserPlayList.length > 0 ? testUserPlayList : testTracks}
                    selectedTrack={selectedTrack}
                    setSelectedTrack={setSelectedTrack}
                />
            </div>
            <BODY__CONTENT___LISTLARGE />
            <BODY__CONTENT___TABS />
            <BODY__CONTENT___CAROUSEL />
        </div>
    )
}
