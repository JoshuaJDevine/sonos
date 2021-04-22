import BODY__CONTENT___LISTLARGE from "../ELEMENTS/LISTLARGE";
import BODY__CONTENT___TABS from "../ELEMENTS/TABS";
import BODY__CONTENT___CAROUSEL from "../ELEMENTS/CAROUSEL";
import Waveform from "../ELEMENTS/WAVEFORM";
import PlayList from "../ELEMENTS/PLAYLIST";
import React, {useState} from "react";

export default function BODY__CONTENT___MAIN(){


    const tracks = [
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
    const [selectedTrack, setSelectedTrack] = useState(tracks[0]);



    return(

        <div className='BODY__CONTENT___MAIN'>
            <h3>BODY__CONTENT___MAIN</h3>
            <div>
                <Waveform url={selectedTrack.url} />
                <PlayList
                    tracks={tracks}
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
