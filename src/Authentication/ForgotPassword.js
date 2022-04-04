import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../Contexts/AuthContext';
import './Authentication.css';

function ForgotPassword() {

    const emailRef = useRef();
    const {resetPassword} = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    async function handleSubmit(e){
        e.preventDefault();
        //Add code for checking password length, email format too.

        try{
            setLoading(true);
            setError('');
            setMessage('');
            await resetPassword(emailRef.current.value);
            setMessage('Check your Inbox for further Instructions');
        } catch {
            setError('Failed to reset password');
        }
        setLoading(false);

    }

    return (
        <>
            <div className='cust-container' style={{minHeight: "100vh"}}>
                <div className='w-100 custom-card' style={{maxWidth: "400px"}}>
                            <h2 className='tc mb3'>Reset Password</h2>
                            {message && <div className='tc mt3 ml3 mr3 pa3 br2 cust-message'>{message}</div>}
                            {error && <div className='tc mt3 ml3 mr3 pa3 br2 cust-error'>{error}</div>}
                            <form onSubmit={handleSubmit} className='f4'>
                                <div id='email' className='pa3 cust-form'>
                                    <label className='mb1'>Email</label>
                                    <input type='email' ref={emailRef} className='pa2 br2 cust-input-box' required />
                                </div>
                                <div className='pa3'>
                                    <button disabled={loading} className='pa2 br2 w-100 cust-submit' type='submit'>Reset Password</button>
                                </div>
                            </form>
                            <div className='w-100 tc mt2'>
                                <Link to={"/login"} className='link underline dim cust-green'>Log In</Link>
                            </div>
                    <div className='w-100 tc mt3 mb3'>
                        Don't have an Account? <Link to={"/signup"} className='link underline dim cust-green'>Sign Up</Link> 
                    </div>
                </div>
            </div>
        </>
    )
}

export default ForgotPassword;