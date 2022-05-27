import {useEffect, useState, useCallback} from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import {useNavigate} from 'react-router-dom';
import { getDoc, doc } from "firebase/firestore";

import { db } from "./firebase.js";
import {useStock} from './Contexts/StockContext';
import { useAuth } from './Contexts/AuthContext';

const COMMANDS = {
  OPEN_HOME: 'open-home',
  GOTO_HOME: 'home',
  GOTO_SEARCH_STOCKS: 'search-stocks',
  GOTO_MY_STOCKS: 'my-stocks',
  GOTO_PROFILE: 'profile',
  FIND_STOCKS: 'find-stocks',
  OPEN_STOCK: 'open-stock',
  BUY_STOCK: 'buy-stock',
  READ_PROFILE: 'read-profile',
  UPDATE_PROFILE: 'update-profile',
  LOGOUT: 'logout',
}

export default function useAlan() {

    const alan_API_KEY = process.env.REACT_APP_ALAN_API;
    const API_KEY = process.env.REACT_APP_ALPHAVANTAGE_API;
    const navigate = useNavigate();
    const { searchMatches, setSearchMatches, setActiveStockName, setActiveStockSymbol, setActiveStockData } = useStock();
    const { currentUser, logout } = useAuth();

    const [alanInstance, setAlanInstance] = useState();

    const goToHome = useCallback(() => {
        alanInstance.playText("Navigating to Home page");
        navigate('/home');
      }, [alanInstance, navigate]);

    const goToSearchStocks = useCallback(() => {
        alanInstance.playText("Navigating to Search Stocks");
        navigate('/search-stocks');
      }, [alanInstance, navigate]);

    const goToMyStocks = useCallback(() => {
        alanInstance.playText("Navigating to My Stocks");
        navigate('/mystocks');
      }, [alanInstance, navigate]);

    const goToProfile = useCallback(() => {
        navigate('/profile');
      }, [navigate]);

    const updateProfile = useCallback(() => {
      alanInstance.playText('Navigating to update profile');
      navigate('/update-profile');
    }, [alanInstance, navigate]);

    const handleLogout = useCallback(() => {
      alanInstance.playText('Logging out');
      logout();
    }, [alanInstance, logout]);

    const readProfile = useCallback(() => {
      const userDocRef = doc(db, "users", currentUser.email);
      const getDocData = async() => {
        const docSnap = await getDoc(userDocRef);
        if(docSnap.data().myCurrentFunds){
          alanInstance.playText(`You added a total of ${parseFloat(docSnap.data().myInitialFunds).toFixed(2)} rupees to your wallet`);
          alanInstance.playText(`and you currently have ${parseFloat(docSnap.data().myCurrentFunds).toFixed(2)} rupees to invest`);
        }
      };
      getDocData();
    }, [alanInstance, currentUser.email]);

    const searchForStocks = useCallback(({detail: {stockName}}) => {
      if(stockName){
        let API_URL = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${stockName}&apikey=${API_KEY}`;
        fetch(API_URL)
        .then(response => response.json())
        .then(data => {
          setSearchMatches(data.bestMatches);
        });
        
        alanInstance.playText(`Here are the stocks related to ${stockName}`);
        navigate('/search-stocks');
      } else {
        alanInstance.playText('Please say a stock name to search');
      }
      }, [alanInstance, navigate, setSearchMatches, API_KEY ]);

    const openStock = useCallback(({detail: {stockNumber}}) => {
      if(stockNumber && stockNumber <= searchMatches.length){
        searchMatches.map((company) => {
          if(company.i === stockNumber){
            let stockName = company['2. name'];
            let stockSymbol = company['1. symbol'];
            setActiveStockName(stockName);
            setActiveStockSymbol(stockSymbol);
            let API_URL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockSymbol}&interval=30min&apikey=${API_KEY}`;
            fetch(API_URL)
            .then(response => response.json())
            .then(data => {
                setActiveStockData(data);
            });
            alanInstance.playText(`Opening stock number ${stockNumber}`);
            navigate("/stock-details");
          }
        })
      } else {
        alanInstance.playText('Please select a valid stock number');
      }
      }, [alanInstance, navigate, searchMatches, setActiveStockName, setActiveStockSymbol, setActiveStockData ]);

    const buyStock = useCallback(({detail: {quantity}}) => {
        alanInstance.playText('Sorry! unable to process the request');
      }, [alanInstance ]);

    useEffect(() => {
      window.addEventListener(COMMANDS.GOTO_HOME, goToHome);
      window.addEventListener(COMMANDS.GOTO_SEARCH_STOCKS, goToSearchStocks);
      window.addEventListener(COMMANDS.GOTO_MY_STOCKS, goToMyStocks);
      window.addEventListener(COMMANDS.GOTO_PROFILE, goToProfile);
      window.addEventListener(COMMANDS.UPDATE_PROFILE, updateProfile);
      window.addEventListener(COMMANDS.LOGOUT, handleLogout);
      window.addEventListener(COMMANDS.READ_PROFILE, readProfile);
      window.addEventListener(COMMANDS.FIND_STOCKS, searchForStocks);
      window.addEventListener(COMMANDS.OPEN_STOCK, openStock);
      window.addEventListener(COMMANDS.BUY_STOCK, buyStock);

      return () => {
        window.removeEventListener(COMMANDS.GOTO_HOME, goToHome);
        window.removeEventListener(COMMANDS.GOTO_SEARCH_STOCKS, goToSearchStocks);
        window.removeEventListener(COMMANDS.GOTO_MY_STOCKS, goToMyStocks);
        window.removeEventListener(COMMANDS.GOTO_PROFILE, goToProfile);
        window.removeEventListener(COMMANDS.UPDATE_PROFILE, updateProfile);
        window.removeEventListener(COMMANDS.LOGOUT, handleLogout);
        window.removeEventListener(COMMANDS.READ_PROFILE, readProfile);
        window.removeEventListener(COMMANDS.FIND_STOCKS, searchForStocks);
        window.removeEventListener(COMMANDS.OPEN_STOCK, openStock);
        window.removeEventListener(COMMANDS.BUY_STOCK, buyStock);
      }
    }, [goToHome, goToSearchStocks, goToMyStocks, goToProfile, searchForStocks, openStock, buyStock, readProfile, updateProfile, handleLogout])
    

    useEffect(() => {
      if(alanInstance != null) return;
      setAlanInstance(
        alanBtn({
          key: alan_API_KEY,
          onCommand: ({ command, payload }) => {
            window.dispatchEvent(new CustomEvent(command, { detail: payload }))
          }
        })
      );
    }, [])
    

      
    return null;
}