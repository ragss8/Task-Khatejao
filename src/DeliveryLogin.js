import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './Login.css';

const Login = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:8000/restologin', {
        email,
        password,
      });
      console.log('Login Successful', response.data);
      setEmail('');
      setPassword('');
      history.push('/RestaurantMain');
    } catch (error) {
      console.log('Login error', error);
      setError('Login failed. Please check your credentials.');
    }
  };
  
  return (
    <div className="login-form-container">
        <h2 className="login-title">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default Login;

