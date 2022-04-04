import React, { useState, useEffect } from 'react';
import Navigation from '../Navigation/Navigation';
import StockChart from './StockChart';

import {useStock} from '../Contexts/StockContext';

function StockDetails(){
    const {activeStockName, activeStockData} = useStock();
    const [timeStamps, setTimeStamps] = useState([]);
    const [openPrice, setOpenPrice] = useState([]);
    const [highPrice, setHighPrice] = useState([]);
    const [lowPrice, setLowPrice] = useState([]);
    const [closePrice, setClosePrice] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        let timeStamps = [];
        let openPrice = [];
        let highPrice = [];
        let lowPrice = [];
        let closePrice = [];

        for(let latestStock in activeStockData['Time Series (Daily)']){
            timeStamps.push(latestStock);
            openPrice.push(activeStockData['Time Series (Daily)'][latestStock]['1. open']);
            highPrice.push(activeStockData['Time Series (Daily)'][latestStock]['2. high']);
            lowPrice.push(activeStockData['Time Series (Daily)'][latestStock]['3. low']);
            closePrice.push(activeStockData['Time Series (Daily)'][latestStock]['4. close']);
        }

        setOpenPrice(openPrice.slice(0, 30).reverse());
        setHighPrice(highPrice.slice(0, 30).reverse());
        setLowPrice(lowPrice.slice(0, 30).reverse());
        setClosePrice(closePrice.slice(0, 30).reverse());
        setTimeStamps(timeStamps.slice(0, 30).reverse());
        setLoading(false);

        return () => {
        }
    }, [activeStockData]);

    return(
        <div>
            <Navigation />
            {
                (!loading)?
                        <div>
                            <StockChart 
                                stockName={activeStockName}
                                timeStamps={timeStamps} 
                                openPrice={openPrice}
                                highPrice={highPrice}
                                lowPrice={lowPrice}
                                closePrice={closePrice}
                            />
                        </div>
                :
                <h3 className='tc'>Hold On! Getting your data...</h3>
            }
        </div>
    );
}

export default StockDetails;