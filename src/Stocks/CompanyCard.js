import React from 'react';
import {useNavigate} from 'react-router-dom';

import {useStock} from '../Contexts/StockContext';
import './CompanyCard.css';

const CompanyCard = ({name, symbol, region, i}) => {
    let navigate = useNavigate();
    const {activeStock} = useStock();

    function onViewDetails() {
        activeStock(name, symbol);
    }

    return(
        <div className = "w-100 br3 pa3 ma3 center cust-container div1">
            <div className='div2'>
                <h1> {name} ({symbol})</h1>
                <h2 className='region'>{region}</h2>
            </div>
            <div className='div3 tc'>
                <button 
                    className="grow br-pill ph3 pv2 mb2 details-button"
                    onClick={() => {
                        onViewDetails();
                        navigate("/stock-details");
                    }}>
                    View Details
                </button>
                <div className='f3 mt3'>{i}</div>
            </div>
        </div>
    );
}

export default CompanyCard;