import React, {useState} from "react";
import './Login.css';
import UserLogin from "./UserLogin";
import RestoLogin from "./RestoLogin";
import DeliveryLogin from "./DeliveryLogin";


const Login = () => {
  const [activeForm,setActiveForm] = useState('userLogin');

  const toggleForm = (form) => {
    setActiveForm(form);
  };
  return (
    <div className="Login-container">
      <h2 className="signup-title">Login</h2>
      <div className="toggle-buttons">
        <button
          className={activeForm === 'userLogin' ? 'toggle-button active' : 'toggle-button'}
          onClick={() => toggleForm('user')}
        >
          User
        </button>
        <button
          className={activeForm === 'restaurantLogin' ? 'toggle-button active' : 'toggle-button'}
          onClick={() => toggleForm('restaurant')}
        >
          Restaurant Owner
        </button>
        <button
          className={activeForm === 'deliveryLogin' ? 'toggle-button active' : 'toggle-button'}
          onClick={() => toggleForm('delivery')}
        >
          Delivery Partner
        </button>
      </div>
      {activeForm === 'userLogin' && <UserLogin />}
      {activeForm === 'restaurantLogin' && <RestoLogin />}
      {activeForm === 'deliveryLogin' && <DeliveryLogin />}
    </div>
  );
  }; 

export default Login;

