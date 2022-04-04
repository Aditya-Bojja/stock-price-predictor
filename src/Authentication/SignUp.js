import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../Contexts/AuthContext';
import './Authentication.css';

function SignUp() {

    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const {signup} = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e){
        e.preventDefault();

        if(passwordRef.current.value !== passwordConfirmRef.current.value){
            return setError('Passwords do not match');
        }

        //Add code for checking password length, email format too.

        try{
            setLoading(true);
            setError('');
            await signup(emailRef.current.value, passwordRef.current.value);
            navigate('/profile');
        } catch {
            setError('Failed to create an Account');
        }
        setLoading(false);

    }

    return (
        <>
            <div className='cust-container' style={{minHeight: "100vh"}}>
                <div className='w-100 custom-card' style={{maxWidth: "400px"}}>
                            <h2 className='tc mb3'>Create an Account</h2>
                            {error && <div className='tc mt3 ml3 mr3 pa3 br2 cust-error'>{error}</div>}
                            <form onSubmit={handleSubmit} className='f4' >
                                <div id='email' className='pa3 cust-form'>
                                    <label className='mb1'>Email</label>
                                    <input type='email' ref={emailRef} className='pa2 br2 cust-input-box' required />
                                </div>
                                <div id='password' className='pa3 cust-form'>
                                    <label className='mb1'>Password</label>
                                    <input type='password' ref={passwordRef} className='pa2 br2 cust-input-box' required />
                                </div>
                                <div id='password-confirm' className='pa3 cust-form'>
                                    <label className='mb1'>Confirm Password</label>
                                    <input type='password' ref={passwordConfirmRef} className='pa2 br2 cust-input-box' required />
                                </div>
                                <div className='pa3'>
                                    <button disabled={loading} className='pa2 br2 w-100 cust-submit' type='submit'>Sign Up</button>
                                </div>
                            </form>
                    <div className='w-100 tc mt3 mb3'>
                        Already have an Account? <Link to={"/login"} className='link underline dim cust-green'>Log In</Link> 
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignUp;