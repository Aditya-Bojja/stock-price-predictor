import React, { useState, useEffect } from 'react';
import Navigation from '../Navigation/Navigation';
import StockChart from './StockChart';
import { useAuth } from '../Contexts/AuthContext';
import { db } from "../firebase.js";
import { getDoc, doc } from "firebase/firestore";
import {useStock} from '../Contexts/StockContext';
import { useCart } from '../Contexts/CartContext';

function StockDetails(){
    const { currentUser } = useAuth();
    const {activeStockName, activeStockSymbol, activeStockData} = useStock();
    const { buyStock, deductFunds } = useCart();

    const [timeStamps, setTimeStamps] = useState([]);
    const [openPrice, setOpenPrice] = useState([]);
    const [highPrice, setHighPrice] = useState([]);
    const [lowPrice, setLowPrice] = useState([]);
    const [closePrice, setClosePrice] = useState([]);
    const [volume, setVolume] = useState([]);
    const [change, setChange] = useState(0);
    const [percentChange, setPercentChange] = useState(0);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [renderBuyStock, setRenderBuyStock] = useState(false);
    const [qty, setQty] = useState(0);
    const [availableFunds, setAvailableFunds] = useState(0);

    useEffect(() => {
        //In order to make refresh work, put activeStock() functionality here
        let timeStamps = [];
        let openPrice = [];
        let highPrice = [];
        let lowPrice = [];
        let closePrice = [];
        let volume = [];

        let counter = 0;
        for(let eachTimeStamp in activeStockData['Time Series (Daily)']){
            if(counter < 31){
                timeStamps.push(eachTimeStamp);
                openPrice.push(activeStockData['Time Series (Daily)'][eachTimeStamp]['1. open']);
                highPrice.push(activeStockData['Time Series (Daily)'][eachTimeStamp]['2. high']);
                lowPrice.push(activeStockData['Time Series (Daily)'][eachTimeStamp]['3. low']);
                closePrice.push(activeStockData['Time Series (Daily)'][eachTimeStamp]['4. close']);
                volume.push(activeStockData['Time Series (Daily)'][eachTimeStamp]['5. volume']);
            } else {
                break;
            }
            counter++;
        }

        setTimeStamps(timeStamps);  
        setOpenPrice(openPrice);
        setHighPrice(highPrice);
        setLowPrice(lowPrice);
        setClosePrice(closePrice);
        setVolume(volume);

        setChange((closePrice[0] - closePrice[1]).toFixed(2));
        setPercentChange((((closePrice[0] - closePrice[1])/closePrice[1])*100).toFixed(2));

        console.log("Stock Details API call");
    }, [activeStockData]);

    useEffect(() => {
        const userDocRef = doc(db, "users", currentUser.email);
        const getDocData = async() => {
            const docSnap = await getDoc(userDocRef);
            if(docSnap.data().myCurrentFunds){
                setAvailableFunds(docSnap.data().myCurrentFunds);
            }
        };
        getDocData();
    }, [])

    const canBuyStock = () => {
        setError("");
        setMessage("");
        if(qty <= 0){
            setError(`Please select valid quantity`);
            return false;
        }
        if(availableFunds === 0){
            setError(`No Amount in wallet! Please go to profile and add funds to wallet`);
            return false;
        }
        if(Number(closePrice[0])*qty > availableFunds){
            setError(`You do not have enough funds to buy ${qty} shares`);
            return false;
        } 
        return true;
    }

    function confirmBuyStock(){
        if(canBuyStock()){
            let tempTicker = activeStockSymbol.split(".");
            const buyStockData = {
                stockName: activeStockName,
                stockSymbol: tempTicker[0],
                actualTicker: activeStockSymbol,
                qty: qty,
                investedValue: Number(closePrice[0])*qty,
                returnedValue: 0,
                initialPrice: {
                    initialOpen: openPrice[0],
                    initialHigh: highPrice[0],
                    initialLow: lowPrice[0],
                    initialClose: closePrice[0],
                    initialPrevClose: closePrice[1],
                    initialVolume: volume[0]
                },
                currentPrice: {
                    currentOpen: openPrice[0],
                    currentHigh: highPrice[0],
                    currentLow: lowPrice[0],
                    currentClose: closePrice[0],
                    currentPrevClose: closePrice[1],
                    currentVolume: volume[0]
                },
                futurePrice: {

                }
            };
            setMessage("Buy Stock Successful! Go to MyStocks for more details");
            deductFunds(Number(closePrice[0])*qty);
            buyStock(buyStockData);
            //navigate to MyStocks
        }
    }

    function handleBuyStock(){
        setRenderBuyStock(true);
    }

    const changeQty = (e) => {
        setQty(Number(e.target.value));
    }

    return(
        <div>
            <Navigation />
            { message && <div className='tc pa3 br2 cust-message'>{message}</div> }
            {error && <div className='tc mt3 ml3 mr3 pa3 br2 cust-error'>{error}</div>}
            {
                (activeStockData)?
                    <div className='bg-black sd-border' style={{minHeight: "100vh"}}>
                        <div className='flex'>
                            <div className='w-75 dib'>
                                <h1 className="mb1 ml3 mr1 color-lb ">{activeStockName} ({activeStockSymbol})</h1>
                                <div className='w-80 flex  items-end mt0 mb5 ml3'>
                                    <div className='f1 mr3'>{Number(closePrice[0]).toFixed(2)}</div>
                                    {
                                        (change > 0)?
                                        <div className='f3 mr2 mb1 color-lg'> +{change}</div>
                                        :
                                        <div className='f3 mr2 mb1 red'>{change}</div>
                                    }
                                    {
                                        (percentChange > 0)?
                                        <div className='f3 mr2 mb1 color-lg'>( +{percentChange} %)</div>
                                        :
                                        <div className='f3 mr2 mb1 red'>({percentChange} %)</div>
                                    }
                                </div>
                            </div>
                            <div className='w-25 dib tc'>
                                <button className="br-pill ph3 pv2 sd-button ml5 mt4" onClick={handleBuyStock} > Buy Stock </button>
                            </div>
                        </div>

                        <div className='w-100 flex flex-column items-center justify-center pb5'>
                            <h2>Summary of {timeStamps[0]}</h2>
                            <table className=''>
                                <tbody>
                                    <tr className='color-lb f3'>
                                        <th className='table-padding'>Open Price</th>
                                        <th className='table-padding'>High Price</th>
                                        <th className='table-padding'>Low Price</th>
                                        <th className='table-padding'>Close Price</th>
                                        <th className='table-padding'>Volume</th>
                                    </tr>
                                    <tr className='f4'>
                                        <th>{Number(openPrice[0]).toFixed(2)}</th>
                                        <th>{Number(highPrice[0]).toFixed(2)}</th>
                                        <th>{Number(lowPrice[0]).toFixed(2)}</th>
                                        <th>{Number(closePrice[0]).toFixed(2)}</th>
                                        <th>{Number(volume[0]).toFixed(2)}</th>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {
                            renderBuyStock?
                                <div className='flex items-center justify-center f3 mb5'>
                                    <div><input className='cust-input-box2 pa1' type="number" placeholder='Quantity' onChange={changeQty} ></input></div>
                                    <div><button className="br-pill ph3 pv2 sd-button ml2" onClick={confirmBuyStock} > Confirm Buy </button></div>
                                </div>
                            :
                                <div></div>
                        }

                        <div className='pb6'>
                            <StockChart 
                                timeStamps={timeStamps} 
                                openPrice={openPrice}
                                highPrice={highPrice}
                                lowPrice={lowPrice}
                                closePrice={closePrice}
                                volume={volume}
                            />
                        </div>

                    </div>
                :
                    <h3 className='tc'>Hold On! Getting your data...</h3>
            }
        </div>
    );
}

export default StockDetails;