import './SIGNUPFORMMODAL.css'
import React, { useState } from 'react';
import { Modal } from '../../../../context/Modal';
import BODY__ELEMENTS___SIGNUPFORM from "./SIGNUPFORM";

function BODY__SIGNUPFORMMODAL() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button onClick={() => setShowModal(true)}>Sign Up</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <BODY__ELEMENTS___SIGNUPFORM />
                </Modal>
            )}
        </>
    );
}

export default BODY__SIGNUPFORMMODAL;
