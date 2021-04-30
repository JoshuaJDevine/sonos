import './DEMOMODAL.css'
import React, { useState } from 'react';
import { Modal } from '../../../../context/Modal';

import BODY__ELEMENTS___DEMO from "./DEMO";
import {useDispatch, useSelector} from "react-redux";
import * as sessionActions from "../../../../store/session";

function BODY__DEMOMODAL() {
    const [showModal, setShowModal] = useState(false);

    const dispatch = useDispatch();

    const handleDemo = () => {
        setShowModal(true)
    }
    return (
        <>
            <button onClick={handleDemo}>DEMO</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <BODY__ELEMENTS___DEMO setShowModal={setShowModal}/>
                </Modal>
            )}
        </>
    );
}

export default BODY__DEMOMODAL;
