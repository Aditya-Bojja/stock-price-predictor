import React from 'react';
import Navigation from '../Navigation/Navigation';
import { useAuth } from '../Contexts/AuthContext';
import { Link } from 'react-router-dom';
import '../Authentication/Authentication.css';

const Profile = () => {

    const { currentUser } = useAuth();

    return(
        <>
            <Navigation />
            <div className='cust-container' style={{minHeight: "70vh"}}>
                <div className='w-100 f4 custom-card' style={{maxWidth: "400px"}}>
                    <h2 className='tc mb3'>Profile</h2>
                    <div className='pa3 cust-form'>
                        <div className='mb3'>
                            <strong>Email: </strong>{currentUser && currentUser.email}
                        </div>
                        <Link to={"/update-profile"} className='tc pa2 br2 w-100 cust-link'>Update Profile</Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;