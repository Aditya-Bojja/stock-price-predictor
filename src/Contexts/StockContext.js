import React, {useContext, useState} from 'react';

import {DefaultSensex} from '../Stocks/DefaultSensex';

const StockContext = React.createContext();

export function useStock(){
    return useContext(StockContext);
}

export function StockProvider({ children }) {

    const [searchField, setSearchField] = useState('');
    const [searchMatches, setSearchMatches] = useState(DefaultSensex);
    const [activeStockName, setActiveStockName] = useState('');
    const [activeStockSymbol, setActiveStockSymbol] = useState('');
    const [activeStockData, setActiveStockData] = useState({});
    const API_KEY = 'AOFBIHZ9OPOBB65S';
    const [loading, setLoading] = useState(false);

    function searchChange(searchInput){
        setSearchField(searchInput);
    }

    function findStocks(){
        setLoading(true);
        let API_URL = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchField}&apikey=${API_KEY}`;
        fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            setSearchMatches(data.bestMatches);
        })
        setLoading(false);
    }

    function activeStock(stockName, stockSymbol){
        setLoading(true);
        setActiveStockName(stockName);
        setActiveStockSymbol(stockSymbol);
        let API_URL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockSymbol}&interval=30min&apikey=${API_KEY}`;
        fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            setActiveStockData(data);
        });
        setLoading(false);
    }

    const value = {
        searchChange,
        findStocks,
        searchMatches,
        activeStock,
        activeStockName,
        activeStockSymbol,
        activeStockData,
    }

    return (
        <StockContext.Provider value={value}>
            {!loading && children }
        </StockContext.Provider>
    )
}