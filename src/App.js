import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Home from './Home/Home';
import Profile from './Profile/Profile';
import SearchStocks from './Stocks/SearchStocks';
import StockDetails from './Stocks/StockDetails';
import SignUp from './Authentication/SignUp';
import Login from './Authentication/Login';
import PrivateRoute from './PrivateRoute';
import ForgotPassword from './Authentication/ForgotPassword';
import UpdateProfile from './Profile/UpdateProfile';
import MyStocks from './Stocks/MyStocks';
import useAlan from './useAlan';
import './App.css';

function App(){

  useAlan();

    return(
      <>
        {/* <Router> */}
            {/* <AuthProvider> */}
              {/* <StockProvider> */}
                {/* <CartProvider> */}
                  <Routes>
                    <Route path='/' element={<Login />}/>
                    <Route path='/signup' element={<SignUp />}/>
                    <Route path='/login' element={<Login />}/>
                    <Route path='/forgot-password' element={<ForgotPassword />}/>

                    <Route path='/home' element={<PrivateRoute />}>
                      <Route path='/home' element={<Home />}/>
                    </Route>

                    <Route path='/search-stocks' element={<PrivateRoute />}>
                        <Route path='/search-stocks' element={<SearchStocks />}/>
                    </Route>

                    <Route path='/stock-details' element={<PrivateRoute />}>
                        <Route path='/stock-details' element={<StockDetails />}/>
                    </Route>
                    
                    <Route path='/profile' element={<PrivateRoute />}>
                      <Route path='/profile' element={<Profile />}/>
                    </Route>

                    <Route path='/mystocks' element={<PrivateRoute />}>
                      <Route path='/mystocks' element={<MyStocks />}/>
                    </Route>

                    <Route path='/update-profile' element={<PrivateRoute />}>
                      <Route path='/update-profile' element={<UpdateProfile />}/>
                    </Route>

                    <Route path='*' element={<div>Invalid Request</div>}/>
                  </Routes>
                {/* </CartProvider> */}
              {/* </StockProvider> */}
            {/* </AuthProvider> */}
        {/* </Router> */}
      </>
    );
}

export default App;
