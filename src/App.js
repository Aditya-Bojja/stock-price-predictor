import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Home from './Home/Home';
import Profile from './Profile/Profile';
import SearchStocks from './Stocks/SearchStocks';
import StockDetails from './Stocks/StockDetails';
import SignUp from './Authentication/SignUp';
import { AuthProvider } from './Contexts/AuthContext';
import { StockProvider } from './Contexts/StockContext';
import Login from './Authentication/Login';
import PrivateRoute from './PrivateRoute';
import ForgotPassword from './Authentication/ForgotPassword';
import UpdateProfile from './Profile/UpdateProfile';
import './App.css';


class App extends React.Component{

  render(){
    return(
      <>
        <Router>
            <AuthProvider>
              <StockProvider>
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

                  <Route path='/update-profile' element={<PrivateRoute />}>
                    <Route path='/update-profile' element={<UpdateProfile />}/>
                  </Route>

                  <Route path='*' element={<div>Invalid Request</div>}/>
                </Routes>
              </StockProvider>
            </AuthProvider>
        </Router>
      </>
    );
  }
}

export default App;
