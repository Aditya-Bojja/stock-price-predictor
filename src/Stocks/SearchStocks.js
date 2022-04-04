import React from 'react';
import CompanyCard from './CompanyCard';
import './CompanyCard.css';
import Navigation from '../Navigation/Navigation';

import {useStock} from '../Contexts/StockContext';

function SearchStocks(){

    const {searchMatches, searchChange, findStocks} = useStock();

    const onSearchChange = (event) => {
        searchChange(event.target.value);
    }

    async function onButtonSubmit () {
        await findStocks();
    }

    return(
        <div className='center'>
            <Navigation />
            <div className = "w-100 pa3 center" style={{maxWidth: "500px"}}>
                <input 
                    className = "f4 br-pill search-box" 
                    type = "search" 
                    placeholder = "Search Stocks..." 
                    onChange={onSearchChange}
                />
                <button 
                    className="grow br-pill ph3 pv2 details-button search-button" 
                    onClick={onButtonSubmit}>
                    Search
                </button>
            </div>
            <div>
                {
                    searchMatches.length ?
                        searchMatches.map((company, index) => {
                            return <CompanyCard key={index} name={company['2. name']} symbol={company['1. symbol']} region={company['4. region']}/>
                        })
                    :
                        <h3 className='tc'>Could not find any stocks matching your search</h3>        
                }
            </div>
        </div>
    );
}

export default SearchStocks;