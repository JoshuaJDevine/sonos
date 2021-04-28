// @ts-ignore
// eslint-disable-next-line react/prop-types
import './PLAYLIST.css'
import React, {useEffect, useState} from "react";
import { useSelector} from "react-redux";
import {useTheme} from "../../../../context/ThemeContext";

// @ts-ignore
// eslint-disable-next-line react/prop-types
const PlayList = ({ tracks, selectedTrack, setSelectedTrack }) => {
    const [showTracks, setShowTracks] = useState(false);
    const mySelectedPlaylist = useSelector(state => state.playlists.playlists)
    const { theme, setTheme} = useTheme();




    const handleShowTracks = () => {
        setShowTracks(!showTracks);
    };

    return (
        <div className='SONOS__PLAYLIST'>
            <div className={`playlist ` + theme}>
                <button onClick={handleShowTracks}>{showTracks ? "|||" : "TRACKS"}</button>
                {showTracks ?
                        <>
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
                        </>
                    :
                        <>
                        </>

                }

            </div>
        </div>
    );
};



export default PlayList;
