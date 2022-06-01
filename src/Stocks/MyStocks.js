
import React, { useState, useEffect } from 'react';
import { useCart } from '../Contexts/CartContext';
import Navigation from '../Navigation/Navigation';
import { useAuth } from '../Contexts/AuthContext';
import { db } from "../firebase.js";
import { getDoc, doc } from "firebase/firestore";
import MyStockCard from './MyStockCard';

const MyStocks = () => {
    const { currentUser } = useAuth();
    const { updateStockDetails } = useCart();
    let [myStockData, setMyStockData] = useState([]);
    const [message, setMessage] = useState("");
    let totalInvested = 0;
    let totalCurrent = 0;
    let returns = 0;
    let totalReturns = totalCurrent + returns;
    const [availableFunds, setAvailableFunds] = useState(0);


    const API_KEY = process.env.REACT_APP_ALPHAVANTAGE_API2;

    useEffect(() => {
        const userDocRef = doc(db, "users", currentUser.email);
        const getDocData = async() => {
            const docSnap = await getDoc(userDocRef);
            setMyStockData([...myStockData, {...docSnap.data()}]);
        };
        getDocData();
        console.log("MyStocks useEffect");
    }, [])

    useEffect(() => {
        const userDocRef = doc(db, "users", currentUser.email);
        const getDocData = async() => {
            const docSnap = await getDoc(userDocRef);
            if(docSnap.data()){
                setAvailableFunds(docSnap.data().myCurrentFunds);
            }
        };
        getDocData();
        console.log("Profile useEffect");
    }, [])

    function fetchStockDetails(stockSymbol){
        let API_URL = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${API_KEY}`;
        fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            updateStockDetails(data["Global Quote"]);
        });
    }

    function handleRefresh(){
        (Object.keys(myStockData[0]).map(function(key){
            if(myStockData[0][key]['actualTicker']){
                fetchStockDetails(myStockData[0][key]['actualTicker']);
            }
        }))
        setMessage("Fetched New Stock Data! Refresh the page to see results")
    }
    
    return (
        <div>
            <Navigation />
            { message && <div className='tc pa3 br2 cust-message'>{message}</div> }
            {
                (! myStockData[0])?
                    (<h3 className='tc'>Hold On! Getting your data...</h3>) 
                :
                    <div className='flex bg-black' style={{minHeight: "100vh"}}>
                        <div className='w-70 dib'>
                            {
                                (Object.keys(myStockData[0]).map(function(key){
                                    if(myStockData[0][key]["initialPrice"]){
                                        totalInvested += Number(myStockData[0][key]["investedValue"]);
                                        totalCurrent += (Number(myStockData[0][key]["currentPrice"]["currentClose"])*(myStockData[0][key]["qty"]));
                                        returns += Number(myStockData[0][key]["returnedValue"]);
                                        totalReturns = totalCurrent + returns;
                                        return <MyStockCard key={key} stockData={myStockData[0][key]} availableFunds={availableFunds} setMessage={setMessage} />
                                    }
                                }))
                            }
                        </div>
                        <div className='w-30 dib pt4'>
                            <div className='ma2 mb3 f2'>Hello <strong className='color-lb'>{currentUser.email},</strong> </div>
                            <div className='ma2 f3'>You have a total of <strong>{Object.keys(myStockData[0]).length - 2}</strong> stocks</div>
                            <div className='ma2 f3'>You Invested <strong className='color-lb'>{Number(totalInvested).toFixed(2)} INR</strong> </div>
                            <div className='ma2 f3'>They are worth <strong className='color-lb'>{Number(totalReturns).toFixed(2)} INR</strong> now</div>
                            {
                                (totalReturns - totalInvested >= 0)?
                                    <div className='ma2 f3'>You made a profit of <strong className='color-lg'>{Number(totalReturns - totalInvested).toFixed(2)} INR</strong> </div>
                                :
                                    <div className='ma2 f3'>You made a loss of <strong className='red'>{Number(totalInvested - totalReturns).toFixed(2)} INR</strong> </div>
                            }
                            {/* <div className='ma2 f3'>Estimated Future Value: NA</div> */}
                            <button className="br-pill ph3 pv2 ma2 mt4 sd-button" onClick={handleRefresh}>Refresh All</button>
                        </div>
                    </div>
            }
        </div>
    )
}
export default MyStocks;