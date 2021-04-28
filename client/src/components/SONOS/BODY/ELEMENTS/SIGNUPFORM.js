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
    const [image, setImage] = useState(null);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrors([]);
            return dispatch(sessionActions.signup({ email, username, password, image }))
                .then(() => {
                    setUsername("");
                    setEmail("");
                    setPassword("");
                    setImage(null);
                })
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

    const updateFile = (e) => {
        const file = e.target.files[0];
        if (file) setImage(file);
    };

    if (sessionUser){
        return <Redirect to='/home' />
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
                    name= 'confirmPassword'
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <label htmlFor='imageUpload'>
                </label>
                <input type="file" id='imageUpload' name='imageUpload' onChange={updateFile} />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
}
