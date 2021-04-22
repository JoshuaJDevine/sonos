import React from "react";
import './PLAYLIST.css'
// @ts-ignore
// eslint-disable-next-line react/prop-types
const PlayList = ({ tracks, selectedTrack, setSelectedTrack }) => {

    // console.log("=======",tracks, selectedTrack);
    return (
        <div>
            <div className="playlist">
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
