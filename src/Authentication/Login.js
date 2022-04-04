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
            navigate('/profile');
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


/*

<div bsPrefix="cust-container" className='d-flex align-items-center justify-content-center' style={{minHeight: "100vh"}}>
                <div className='w-100 login-div1' style={{maxWidth: "400px"}}>
                    <div bsPrefix='cust-card'>
                        <div>
                            <h2 className='text-center mb-4'>Log In to your Account</h2>
                            {error && <Alert variant='danger'>{error}</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group id='email' className='mb-2'>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control bsPrefix='cust-input-box' type='email' ref={emailRef} required />
                                </Form.Group>
                                <Form.Group id='password' className='mb-2'>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control bsPrefix='cust-input-box' type='password' ref={passwordRef} required />
                                </Form.Group>
                                <Button disabled={loading} bsPrefix='cust-submit' className='w-100 mt-2' type='submit'>Log In</Button>
                            </Form>
                            <div className='w-100 text-center mt-3'>
                                <Link to={"/forgot-password"}>Forgot Password?</Link>
                            </div>
                        </Card.Body>
                    </Card>
                    <div className='w-100 text-center mt-2'>Don't have an Account? <Link to={"/signup"}>Sign Up</Link> </div>
                </div>
            </div>

*/