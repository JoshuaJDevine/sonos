// @ts-ignore
// eslint-disable-next-line react/prop-types
import BODY__CONTENT___LISTLARGE from "../ELEMENTS/LISTLARGE";
import BODY__CONTENT___TABS from "../ELEMENTS/TABS";
import BODY__CONTENT___CAROUSEL from "../ELEMENTS/CAROUSEL";
import Waveform from "../ELEMENTS/WAVEFORM";
import PlayList from "../ELEMENTS/PLAYLIST";
import React, {useState, useEffect} from "react";
import { useSelector, useDispatch} from "react-redux";
import * as trackActions from "../../../../store/track";


import './MAIN.css'
import {Redirect} from "react-router-dom";
import {useTheme} from "../../../../context/ThemeContext";
// @ts-ignore
// eslint-disable-next-line react/prop-types
// @ts-ignore
export default function BODY__CONTENT___MAIN(){
    const { theme, setTheme} = useTheme();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const userTrackList = useSelector(state => state.tracks.userTracks);
    const randomTracks = useSelector(state => state.tracks.randTracks);
    const [selectedPlaylist, setSelectedPlaylist] = useState([])
    const [selectedTrack, setSelectedTrack] = useState(userTrackList);
    const [mainHeader, setMainHeader] = useState("/header_main_01.png")
    const [showMenu, setShowMenu] = useState(false);
    const [showSubMenu, setShowSubMenu] = useState(false);

    const mySelectedPlaylist = useSelector(state => state.playlists.playlists)

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

    //Choose random header
    useEffect(() => {
        let randNum = Math.floor(Math.random() * 8)+1;
        let randomHeader = "/img/header_main_0" + randNum + ".png"
        setMainHeader(randomHeader);
    }, [mainHeader])


    const handlePlaylistClick = (e) => {
        console.log('//todo HANDLE PLAYLIST CLICK');
        console.log('----------------------------');
        console.log("For playlist", e.target.value);
        console.log('----------------------------');
        console.log('----------------------------');
    }

    const handleDiscover = (e) => {
        console.log('//TODO DISCOVER!')
        dispatch(trackActions.getRandomTrack());
    }

    const handleCreateNewPlaylist = (e) => {
        console.log('//TODO NEW LIST!')

        dispatch(trackActions.getUsersTracks(sessionUser.id)).then((res)=> {console.log(res)});
    }

    const handleMyTracks = (e) => {
        console.log('//Get 10 random tracks!')
    }

    const handleMenuView = (e) => {
        setShowMenu(!showMenu);
    }
    const handleSubMenuView = (e) => {
        setShowSubMenu(!showSubMenu);
    }
    //
    // console.log("SELECTED TRACK IS");
    // console.log(selectedTrack);
    // console.log("SELECTED PLAYLIST IS");
    // console.log(selectedPlaylist);
    if (!sessionUser){
        return <Redirect to='/' />
    }
    else {
        return(


            <div className={`BODY__CONTENT___MAIN ` + theme} >
                <img id='main_header' src={mainHeader} alt='sonos_logo'/>

                    <div className="SONOS__PLAYLIST___MAINMENU">
                        <button onClick={handleMenuView}>{showMenu ? "|||" : "MENU"}</button>
                        {showMenu ?
                        <>
                            <button onClick={handleDiscover}>DISCOVER</button>
                            <button onClick={handleCreateNewPlaylist}>MY TRACKS</button>
                            <button onClick={handleMyTracks}>NEW PLAYLIST</button>
                        </>
                            : <></>}

                    </div>
                    <div className={mySelectedPlaylist.usersPlaylists !== undefined && mySelectedPlaylist?.usersPlaylists?.Playlists?.length > 0 ?
                        "SONOS__PLAYLIST___SUBMENU" : "SONOS__PLAYLIST___SUBMENU hidden"}>
                        <button onClick={handleSubMenuView}>{showSubMenu ? "|||" : "PLAYLISTS"}</button>
                        {showSubMenu ?
                            <>
                                {mySelectedPlaylist.usersPlaylists !== undefined && mySelectedPlaylist?.usersPlaylists?.Playlists?.length > 0 ?
                                    mySelectedPlaylist.usersPlaylists.Playlists.map((playlist) => (
                                            <button value={playlist.id} key={playlist.id} onClick={handlePlaylistClick} >
                                                {playlist.name}
                                            </button>
                                        )
                                    )
                                    :
                                    <div>
                                    </div>
                                }
                            </>
                            :
                            <>
                            </>
                        }
                    </div>
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
            </div>
        )
    }
}
