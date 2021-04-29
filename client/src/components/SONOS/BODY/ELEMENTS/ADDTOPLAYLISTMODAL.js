import './ADDTOPLAYLISTMODAL.css'
import React, { useState } from 'react';
import { Modal } from '../../../../context/Modal';

import BODY__ELEMENTS___ADDTOPLAYLISTFORM from "./ADDTOPLAYLISTFORM";

function BODY__ADDTOPLAYLISTMODAL({trackId}) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button onClick={() => setShowModal(true)}>+</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <BODY__ELEMENTS___ADDTOPLAYLISTFORM setShowModal={setShowModal} trackId={trackId}/>
                </Modal>
            )}
        </>
    );
}

export default BODY__ADDTOPLAYLISTMODAL;
