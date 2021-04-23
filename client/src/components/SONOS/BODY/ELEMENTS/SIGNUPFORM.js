import './SIGNUPFORM.css'

import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import * as sessionActions from "../../../../store/session";

export default function BODY__ELEMENTS___SIGNUPFORM(){
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);

    if (sessionUser){
        console.log("User already logged in and accessing sign up. Redirecting to /")
        return <Redirect to='/home' />
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrors([]);
            return dispatch(sessionActions.signup({ email, username, password }))
                .catch(async (res) => {
                    console.log("res was", res);
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                });
        }
        else {
            setErrors(['Passwords do not match']);
        }
    }

    return (
        <div className='BODY__ELEMENTS___SIGNUPFORM'>
            <form onSubmit={handleSubmit}>
                <div className='SONOS__ERRORS'>
                    {errors.map((error, idx) => <p key={idx}>{error}</p>)}
                </div>
                <label htmlFor='username'>
                    Username
                </label>
                <input
                    id='username'
                    name= 'username'
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <label htmlFor='email'>
                    Email
                </label>
                <input
                    id='email'
                    name= 'email'
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                <label htmlFor='confirmPassword'>
                    Confirm Password
                </label>
                <input
                    id='confirmPassword'
                    name= 'password'
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
}
