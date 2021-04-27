
import './PLAYLIST.css'
import React, {useEffect, useState} from "react";

// @ts-ignore
// eslint-disable-next-line react/prop-types
const PlayList = ({ tracks, selectedTrack, setSelectedTrack }) => {
    const [dropDownOpen, setDropDownOpen] = useState(false);
    const handleDropdownClick = () => {
        setDropDownOpen(!dropDownOpen);
    };

    const playlistChoices = [
        { key: '1', text: 'MyTracks' },
        { key: '2', text: 'Discover' },
        { key: '3', text: 'Playlist 1' },
    ]


    // console.log("=======",tracks, selectedTrack);
    return (
        <div className='SONOS__PLAYLIST'>
            {dropDownOpen && (
                <div className="SONOS__PLAYLIST___DROPDOWN">
                    <p>Choose a playlist</p>
                    <ul>
                        <li>Option 2</li>
                        <li>Option 3</li>
                        <li>Option 4</li>
                    </ul>
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
