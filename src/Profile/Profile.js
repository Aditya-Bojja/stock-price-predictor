import React, { useState, useEffect } from 'react';
import Navigation from '../Navigation/Navigation';
import { useAuth } from '../Contexts/AuthContext';
import { useCart } from '../Contexts/CartContext';
import { db } from "../firebase.js";
import { getDoc, doc } from "firebase/firestore";
import { Link } from 'react-router-dom';
import '../Authentication/Authentication.css';

const Profile = () => {

    const { currentUser } = useAuth();
    const { addMyFunds } = useCart();
    const [initialFund, setInitialFund] = useState(0);
    const [currentFund, setCurrentFund] = useState(0);
    const [amount, setAmount] = useState(0);

    const fundChange = (e) => {
        setAmount(Number(e.target.value));
    }

    const addFunds = () => {
        setCurrentFund(currentFund + amount);
        setInitialFund(initialFund + amount);
        addMyFunds(Number(amount));
    }

    useEffect(() => {
        const userDocRef = doc(db, "users", currentUser.email);
        const getDocData = async() => {
            const docSnap = await getDoc(userDocRef);
            if(docSnap.data().myCurrentFunds){
                setInitialFund(docSnap.data().myInitialFunds);
                setCurrentFund(docSnap.data().myCurrentFunds);
            }
        };
        getDocData();
    }, [currentUser.email])
    

    return(
        <>
            <Navigation />
            <div className='cust-container flex-column' style={{minHeight: "80vh"}}>
                <div className='w-100 custom-card mb4 pa3 tc' style={{maxWidth: "400px"}}>
                    <div className='f4'>Available to Invest</div>
                    <div className='f2 ma2'> <strong className='color-lg'>Rs.{parseFloat(currentFund).toFixed(2)}</strong> </div>
                </div>
                <div className='w-100 f4 custom-card mb5' style={{maxWidth: "400px"}}>
                        <div className='flex justify-between ma3'>
                            <div> Funds </div>
                            <div> Rs.{parseFloat(initialFund).toFixed(2)} </div>
                        </div>
                        <div className='flex justify-between ma3 mt4'>
                            <input className='cust-input-box pa2' type="number" placeholder='Enter Amount' onChange={fundChange}></input>
                            <button className='tc pa2 pl3 pr3 br2 add-funds grow' onClick={addFunds}>Add Funds</button>
                        </div>
                </div>
                <div className='w-100 f4 custom-card mt5' style={{maxWidth: "400px"}}>
                    <div className='flex flex-column ma3'>
                        <div className='mb3'> Email: <strong>{currentUser && currentUser.email}</strong> </div>
                        <Link to={"/update-profile"} className='tc pa2 br2 w-100 cust-link'>Update Profile</Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;