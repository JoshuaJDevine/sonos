import './LOGINFORMMODAL.css'
import React, { useState } from 'react';
import { Modal } from '../../../../context/Modal';
import LoginForm from './LOGINFORM';

function BODY__LOGINFORMMODAL() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button onClick={() => setShowModal(true)}>Log In</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <LoginForm />
                </Modal>
            )}
        </>
    );
}

export default BODY__LOGINFORMMODAL;
