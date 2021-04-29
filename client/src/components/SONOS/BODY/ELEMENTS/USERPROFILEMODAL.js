import './USERPROFILE.css'
import React, { useState } from 'react';
import { Modal } from '../../../../context/Modal';

import BODY__ELEMENTS___USERPROFILE from "./USERPROFILE";

//For the demo only keep the local state. Add to user:db to save preferences
function BODY__USERPROFILEMODAL({userId, setTheme, setColor, setSize}) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button onClick={() => setShowModal(true)}>PROFILE</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <BODY__ELEMENTS___USERPROFILE userId={userId} setTheme={setTheme} serColor={setColor} setSize={setSize} setShowModal={setShowModal}/>
                </Modal>
            )}
        </>
    );
}

export default BODY__USERPROFILEMODAL;
