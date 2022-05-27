import React from 'react';
import Navigation from '../Navigation/Navigation';
import home from './home.jpg';
import IntroCard from './IntroCard';

const Home = () => {

    return(
        <div className='ma0'>
            <Navigation />
            <div className='flex center pa3 mw8 ma2 br3 intro-card'>
                <img src={home} alt="stock-vector" className='home-img w-70' />
                <div className='f3 pl3 tc text-center'>
                    <span>
                        This application helps you in finding the right stock. <br></br><br></br> It allows you to 
                        search for stocks, analyze their current performance and also predict their 
                        future performance. <br></br><br></br> You can also add them to your portfolio to keep a track 
                        of them. <br></br><br></br> Go ahead to profile page and add funds to get started.
                    </span>
                </div>
            </div>
            <IntroCard></IntroCard>
        </div>
    );
}

export default Home;