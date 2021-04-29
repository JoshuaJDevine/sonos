import './USERPROFILE.css'

import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Theme, useTheme} from '../../../../context/ThemeContext';

export default function BODY__ELEMENTS___USERPROFILE({userId, setColor, setSize, setShowModal }) {
    const { theme, setTheme} = useTheme();
    const [colorChoice, setColorChoice] = useState("orange");
    const [sizeChoice, setSizeChoice] = useState(2);


    const ChangeTheme = function () {
        if (theme === Theme.Dark){
            setTheme(Theme.Light)
        }
        else {
            setTheme(Theme.Dark)
        }
    }

    const handleSubmit = (e) => {
        setShowModal(false);
    }

    return (
        <div className='BODY__ELEMENTS___USERPROFILE'>
            <form onSubmit={handleSubmit}>
                <p>WIP</p>
                <p>These features are are in active development.</p>
                <p>Please check back soon.</p>
                <button type="submit">CLOSE</button>
            </form>
        </div>
    )
}
