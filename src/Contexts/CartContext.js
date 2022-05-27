import React, { useContext, createContext } from 'react';
import { db } from "../firebase.js";
import { useAuth } from './AuthContext';
import { doc, setDoc, updateDoc, deleteField, increment } from "firebase/firestore";
const CartContext = createContext();
export function useCart() {
    return useContext(CartContext);
}

export function CartProvider({children}) {

    const { currentUser } = useAuth();

    async function addMyFunds(fundAmount){
        const userDoc = doc(db, "users", currentUser.email); //to grab a specific doc
        await setDoc(userDoc, {"myInitialFunds": increment(fundAmount), "myCurrentFunds": increment(fundAmount)}, {merge: true});
    }

    async function deductFunds(amount){
        const userDoc = doc(db, "users", currentUser.email); //to grab a specific doc 
        await updateDoc(userDoc, { "myCurrentFunds" : increment(0-amount)});
    }

    async function addFunds(amount){
        const userDoc = doc(db, "users", currentUser.email); //to grab a specific doc 
        await updateDoc(userDoc, { "myCurrentFunds" : increment(amount)});
    }

    async function buyStock(buyStockData){
        const userDoc = doc(db, "users", currentUser.email); //to grab a specific doc
        await setDoc(userDoc, {[buyStockData.stockSymbol]: buyStockData}, {merge: true});
    }

    async function sellStock(sellStockSymbol){
        const userDoc = doc(db, "users", currentUser.email);
        await updateDoc(userDoc, {[sellStockSymbol]: deleteField()});
    }

    async function updateStockDetails(updateStockData){
        let stockSymbol = updateStockData["01. symbol"].split(".")[0];
        let symbol = stockSymbol + ".currentPrice";

        let newData = {
            currentOpen: updateStockData["02. open"],
            currentHigh: updateStockData["03. high"],
            currentLow: updateStockData["04. low"],
            currentClose: updateStockData["05. price"],
            currentVolume: updateStockData["06. volume"],
            currentPrevClose: updateStockData["08. previous close"]
        }
        const userDoc = doc(db, "users", currentUser.email);
        await updateDoc(userDoc, { [symbol] : newData});
    }

    async function updateMoreStocks(stockSymbol, quantity, marketPrice){
        const userDoc = doc(db, "users", currentUser.email);
        let symbol1 = stockSymbol + ".qty";
        let symbol2 = stockSymbol + ".investedValue";
        await updateDoc(userDoc, { [symbol1] : increment(quantity), [symbol2] : increment(Number(marketPrice)*quantity)});
        deductFunds(Number(marketPrice)*quantity);
    }

    async function updateLessStocks(stockSymbol, quantity, marketPrice){
        const userDoc = doc(db, "users", currentUser.email);
        const amount = Number(marketPrice)*quantity;
        let symbol1 = stockSymbol + ".qty";
        let symbol2 = stockSymbol + ".returnedValue";
        await updateDoc(userDoc, { [symbol1] : increment(0-quantity), [symbol2] : increment(amount), "myCurrentFunds" : increment(amount)});
    }
    
    const value = {
        buyStock,
        sellStock,
        updateStockDetails,
        addMyFunds,
        deductFunds,
        addFunds,
        updateMoreStocks,
        updateLessStocks
    }

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}
