import './LOGINFORMMODAL.css'
import React, { useState } from 'react';
import { Modal } from '../../../../context/Modal';

import BODY__ELEMENTS___LOGINFORM from './LOGINFORM';

function BODY__LOGINFORMMODAL() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button onClick={() => setShowModal(true)}>Log In</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <BODY__ELEMENTS___LOGINFORM />
                </Modal>
            )}
        </>
    );
}

export default BODY__LOGINFORMMODAL;
