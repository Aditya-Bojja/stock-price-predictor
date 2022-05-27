import React, {useState, useEffect} from 'react';

import { useCart } from '../Contexts/CartContext';
import './CompanyCard.css';


const MyStockCard = ( {stockData, availableFunds, setMessage} ) => {

    const [change, setChange] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [buyQuantity, setBuyQuantity] = useState(0);
    const [sellQuantity, setSellQuantity] = useState(0);
    const [percentChange, setPercentChange] = useState(0);

    const { updateMoreStocks, updateLessStocks, sellStock, addFunds } = useCart();

    const { currentPrice, qty, investedValue, returnedValue, stockName, stockSymbol, actualTicker} = stockData;
    const { currentClose, currentPrevClose } = currentPrice;

    const changeBuyQty = (e) => {
        setBuyQuantity(Number(e.target.value));
    }

    const changeSellQty = (e) => {
        setSellQuantity(Number(e.target.value));
    }

    const canBuyStock = () => {
        if(buyQuantity <= 0){
            setMessage(`Please select valid quantity`);
            return false;
        }
        if(Number(currentClose)*buyQuantity > availableFunds){
            setMessage(`You do not have enough funds to buy ${buyQuantity} shares`);
            return false;
        }
        return true;
    }

    const canSellStock = () => {
        if(sellQuantity > qty){
            setMessage(`Please select valid quantity`);
            return false;
        }
        if(sellQuantity === qty){
            addFunds(Number(currentClose)*qty);
            sellStock(stockSymbol);
            return false;
        }
        return true;
    }
    
    const buyMoreStocks = () => {
        if(canBuyStock()){
            updateMoreStocks(stockSymbol, buyQuantity, currentClose);
            setQuantity(qty + buyQuantity);
        }
    }

    const sellMoreStocks = () => {
        if(canSellStock()){
            updateLessStocks(stockSymbol, sellQuantity, currentClose);
            setQuantity(qty - sellQuantity);
        }
    }

    useEffect(() => {
        setChange((currentClose - currentPrevClose).toFixed(2));
        setPercentChange((((currentClose - currentPrevClose)/currentPrevClose)*100).toFixed(2));
        setQuantity(qty);
        console.log("MyStockCard UseEffect");
    }, []);

    return(
        <div className = "w-100 br3 pa3 ma3 mt4 pr0 center msc-container flex-column bg-black">
            <div className='flex w-100 mb0 pr3 justify-between'>
                <h2 className='mb1'>{stockName} ({actualTicker})</h2>
                <div className='flex items-center f3'>
                    <div> Quantity: <strong>{quantity}</strong> </div>
                </div>
            </div>
            <div className='flex mb3'>
                <div className='w-80 flex  items-end'>
                    <div className='f1 mr3'>{Number(currentClose).toFixed(2)}</div>
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

            <div className='flex w-100 pr3 justify-between color-lb'>
                <p className=''> Invested Value: <strong> {parseFloat(investedValue).toFixed(2)} </strong> </p>
                <p className=''> Returns: <strong> {parseFloat(returnedValue).toFixed(2)} </strong> </p>
                <p className=''> Current Value: <strong> {parseFloat(currentClose*quantity).toFixed(2)} </strong> </p> 
                <p className=''> Market Price: <strong> {parseFloat(currentClose).toFixed(2)} </strong> </p>
            </div>

            <div className='flex justify-around items-center f5 mt3'>
                    <div className='flex'>
                        <input className='cust-input-box2 pa1' type="number" placeholder='Enter Qty' onChange={changeBuyQty}></input>
                        <button className='tc pa1 pl3 pr3 br2 ml1 inc-funds grow' onClick={buyMoreStocks} > Buy </button>
                    </div>
                    <div className='flex'>
                        <input className='cust-input-box2 pa1' type="number" placeholder='Enter Qty' onChange={changeSellQty}></input>
                        <button className='tc pa1 pl3 pr3 br2 ml1 inc-funds grow' onClick={sellMoreStocks} > Sell </button>
                    </div>
            </div>
        </div>
    );
}

export default MyStockCard;