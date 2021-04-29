import './NEWPLAYLISTFORMMODAL.css'
import React, { useState } from 'react';
import { Modal } from '../../../../context/Modal';

import BODY__ELEMENTS___NEWPLAYLISTFORM from "./NEWPLAYLISTFORM";

function BODY__NEWPLAYLISTFORMMODAL() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button onClick={() => setShowModal(true)}>NEW PLAYLIST</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <BODY__ELEMENTS___NEWPLAYLISTFORM setShowModal={setShowModal}/>
                </Modal>
            )}
        </>
    );
}

export default BODY__NEWPLAYLISTFORMMODAL;
