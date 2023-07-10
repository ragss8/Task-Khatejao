import React from 'react';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import './Main.css';
import axios from 'axios';
import Sidebar from "./Sidebar";
import Display from "./Display";
import Brands from "./Brands";
import Header  from './Header';
import Advertisement from './Advertisement';
import NavigationBar from './NavigationBar';
import RestaurantList from './RestaurantList';

const Main = () => {
  const location = useLocation();
  const sessionToken = location.state?.sessionToken;
  const handleLogout = () => {
    axios
      .post('http://localhost:8000/logout', { session_token: sessionToken })
      .then((response) => {
        console.log('User logged out');
      })
      .catch((error) => {
        console.error('Logout failed:', error);
        if (error.response) {
          console.log('Response data:', error.response.data);
        }
      });      
  };
  

  return (
    <div className='main'>
      <Header />
      <NavigationBar handleLogout={handleLogout} />
      <div className='container'>
      <Sidebar />
      <div className='content'>
      <h3>Browse by Your Fav's :</h3>
      <Display/>
      <Advertisement/>
      <h3>Browse by Brands :</h3>
      <Brands />
      <RestaurantList />
      </div>
      </div>
    </div>
  );
};

export default Main;
