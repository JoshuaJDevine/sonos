// @ts-ignore
// eslint-disable-next-line react/prop-types
import './PLAYLIST.css'
import React, {useEffect, useState} from "react";
import { useSelector} from "react-redux";

// @ts-ignore
// eslint-disable-next-line react/prop-types
const PlayList = ({ tracks, selectedTrack, setSelectedTrack }) => {
    const [dropDownOpen, setDropDownOpen] = useState(false);
    const mySelectedPlaylist = useSelector(state => state.playlists.playlists)

    // console.log("-----PLAYLIST COMPONENT LOADING");
    // useEffect(() =>{
    //     console.log("-----PLAYLIST USEEFFECT RUNNING");
    // })



    const handleDropdownClick = () => {
            setDropDownOpen(!dropDownOpen);
    };
    const handlePlaylistClick = (e) => {
        console.log('//todo HANDLE PLAYLIST CLICK');
        console.log('----------------------------');
        console.log("For playlist", e.target.value);
        console.log('----------------------------');
        console.log('----------------------------');
    }

    return (
        <div className='SONOS__PLAYLIST'>
            {dropDownOpen && (
                <div className="SONOS__PLAYLIST___DROPDOWN">
                    {mySelectedPlaylist.usersPlaylists !== undefined ?
                        <p>Choose a playlist</p>
                        :
                        <div>
                        </div>
                    }
                        {mySelectedPlaylist.usersPlaylists !== undefined ?
                            mySelectedPlaylist.usersPlaylists.Playlists.map((playlist) => (
                                    <button value={playlist.id} key={playlist.id} onClick={handlePlaylistClick} >
                                        {playlist.name}
                                    </button>
                                )
                            )
                            :
                            <li>Create some playlists!</li> }
                </div>
            )}
            <div className="playlist">
                <button type="button" className="button" onClick={handleDropdownClick}>
                    ☰
                </button>
                <div className='SONOS__PLAYLIST___SELECTOR'>

                </div>
                {/* eslint-disable-next-line react/prop-types */}
                {tracks.map((track) => (
                    <div
                        key={track.id}
                        className={
                            // eslint-disable-next-line react/prop-types
                            track.id === selectedTrack.id
                                ? "playlist-item selected"
                                : "playlist-item"
                        }
                        onClick={() => setSelectedTrack(track)}
                    >
                        {track.title}
                    </div>
                ))}
            </div>
        </div>
    );
};



export default PlayList;
