import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../Contexts/AuthContext';
import './Authentication.css';

function Login() {

    const emailRef = useRef();
    const passwordRef = useRef();
    const {login} = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e){
        e.preventDefault();

        //Add code for checking password length, email format too.

        try{
            setLoading(true);
            setError('');
            await login(emailRef.current.value, passwordRef.current.value);
            navigate('/home');
        } catch {
            setError('Failed to Log In');
        }
        setLoading(false);

    }

    return (
        <>
            <div className='cust-container' style={{minHeight: "100vh"}}>
                <div className='w-100 custom-card' style={{maxWidth: "400px"}}>
                            <h2 className='tc mb3'>Log In to your Account</h2>
                            {error && <div className='tc mt3 ml3 mr3 pa3 br2 cust-error'>{error}</div>}
                            <form onSubmit={handleSubmit} className='f4'>
                                <div id='email' className='pa3 cust-form'>
                                    <label className='mb1'>Email</label>
                                    <input className='pa2 br2 cust-input-box' type='email' ref={emailRef} required />
                                </div>
                                <div id='password' className='pa3 cust-form'>
                                    <label className='mb1'>Password</label>
                                    <input className='pa2 br2 cust-input-box' type='password' ref={passwordRef} required />
                                </div>
                                <div className='pa3'>
                                    <button disabled={loading} className='pa2 br2 w-100 cust-submit' type='submit'>Log In</button>
                                </div>
                            </form>
                            <div className='w-100 tc mt2'>
                                <Link to={"/forgot-password"} className='link underline dim cust-green'>Forgot Password?</Link>
                            </div>
                            <div className='w-100 tc mt3 mb3'>
                                Don't have an Account? <Link to={"/signup"} className='link underline dim cust-green'>Sign Up</Link> 
                            </div>
                </div>
            </div>
        </>
    )
}

export default Login;