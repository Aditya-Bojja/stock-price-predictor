import React from 'react';
import Navigation from '../Navigation/Navigation';
import home from './home.jpg';

const Home = () => {

    return(
        <div>
            <Navigation />
            <div className='flex ma4 info-card'>
                {/* <a href='https://www.freepik.com/vectors/achieve-goals'>Achieve goals vector created by jcomp - www.freepik.com</a> */}
                <img src={home} alt="stock-vector" className='pa3 home-img' />
                <div className='f2 pa3'>
                    <div>This web application helps you in finding out the right stock for you.</div><br></br>
                    <div>You can search for all the available stocks on stock market in "SEARCH STOCKS" page.</div><br></br>
                    <div>You can analyze it's past performance, current performance and also predict future performance.</div><br></br>
                    <div>You can also add stocks to your portfolio.</div>           
                </div>
            </div>
        </div>
    );
}

export default Home;