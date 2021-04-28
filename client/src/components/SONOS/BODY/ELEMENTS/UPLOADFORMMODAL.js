import './UPLOADFORMMODAL.css'
import React, { useState } from 'react';
import { Modal } from '../../../../context/Modal';
import BODY__ELEMENTS___UPLOADFORM from "./UPLOADFORM";

function BODY__UPLOADFORMMODAL() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button onClick={() => setShowModal(true)}>Upload Track</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <BODY__ELEMENTS___UPLOADFORM />
                </Modal>
            )}
        </>
    );
}

export default BODY__UPLOADFORMMODAL;
