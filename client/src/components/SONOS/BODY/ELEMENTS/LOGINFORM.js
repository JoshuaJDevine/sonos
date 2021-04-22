import './LOGINFORM.css'

import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import * as sessionActions from "../../../../store/session";

export default function BODY__ELEMENTS___LOGINFORM() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    if (sessionUser) return (
        <Redirect to="/" />
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential, password }))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
    }

   return (
        <div className='BODY__ELEMENTS___LOGINFORM'>
            <form onSubmit={handleSubmit}>
                <div className='SONOS__ERRORS'>
                    {errors.map((error, idx) => <p key={idx}>{error}</p>)}
                </div>
                <label htmlFor='credentials'>
                    Username or Email
                </label>
                <input
                    id='credentials'
                    type="text"
                    value={credential}
                    onChange={(e) => setCredential(e.target.value)}
                    required
                />
                <label htmlFor='password'>
                    Password

                </label>
                <input
                    id='password'
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Log In</button>
            </form>
        </div>

    )
}
