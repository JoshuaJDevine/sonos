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
        const newErr = []
        let regExp = /\.([0-9a-z]+)(?:[\?#]|$)/i;
        console.log(image.name)
        console.log(image.size)
        console.log(image.name.match(regExp))

        if (image.name.match(regExp)[1] != "png"){
            newErr.push("Please choose a png file")
        }
        if (password !== confirmPassword) {
            newErr.push('Passwords do not match')
        }
        if (image.size > 1000000){
            newErr.push("Please choose a smaller file")
        }

        setErrors(newErr);
        if (newErr.length > 0){
            return
        }

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
                    Profile Image (optional)
                </label>
                <input type="file" id='imageUpload' name='imageUpload' onChange={updateFile} />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
}
