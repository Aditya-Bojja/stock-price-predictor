import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import Navigation from '../Navigation/Navigation';
import { useAuth } from '../Contexts/AuthContext';

function UpdateProfile() {

    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const {currentUser, updateEmail, updatePassword} = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    function handleSubmit(e){
        e.preventDefault();

        if(passwordRef.current.value !== passwordConfirmRef.current.value){
            return setError('Passwords do not match');
        }
        //Add code for checking password length, email format too.
        const promises = [];
        setLoading(true);
        setError('');
        setMessage('');

        if(emailRef.current.value !== currentUser.email){
          promises.push(updateEmail(emailRef.current.value));
        }

        if(passwordRef.current.value){
          promises.push(updatePassword(passwordRef.current.value));
        }

        Promise.all(promises).then(() => {
          setMessage("Profile Updated Successfully");
          // navigate("/profile");
        }).catch(() => {
          setError("Failed to update profile");
        }).finally(() => {
          setLoading(false);
        })
    }

    return (
        <>
            <Navigation />
            <div className='cust-container' style={{minHeight: "80vh"}}>
                <div className='w-100 custom-card' style={{maxWidth: "400px"}}>
                            <h2 className='tc mb3'>Update Profile</h2>
                            {message && <div className='tc mt3 ml3 mr3 pa3 br2 cust-message'>{message}</div>}
                            {error && <div className='tc mt3 ml3 mr3 pa3 br2 cust-error'>{error}</div>}
                            <form onSubmit={handleSubmit} className='f4'>
                                <div id='email' className='pa3 cust-form'>
                                    <label className='mb1'>Email</label>
                                    <input type='email' ref={emailRef} defaultValue={currentUser.email} className='pa2 br2 cust-input-box' required />
                                </div>
                                <div id='password' className='pa3 cust-form'>
                                    <label className='mb1'>Password</label>
                                    <input type='password' ref={passwordRef} required className='pa2 br2 cust-input-box'/>
                                </div>
                                <div id='password-confirm' className='pa3 cust-form'>
                                    <label className='mb1'>Confirm Password</label>
                                    <input type='password' ref={passwordConfirmRef} required className='pa2 br2 cust-input-box'/>
                                </div>
                                <div className='ma3'>
                                    <button disabled={loading} className='pa2 br2 w-100 cust-update' type='submit'>Update</button>
                                </div>
                            </form>
                    <div className='w-100 tc mt3 mb3'>
                      <Link to={"/profile"} className='link dim cust-green'> Go back to Profile </Link> 
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdateProfile;