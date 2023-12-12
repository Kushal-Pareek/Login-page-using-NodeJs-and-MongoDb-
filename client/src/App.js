
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import LoginForm from './LoginForm';
import UserDetails from './UserDetails';

function App() {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('http://localhost:3001/api/verifyToken', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((response) => {
          setUser(response.data);
          setIsLoggedIn(true);
        })
        .catch((error) => {
          console.error('Error:', error);
          setIsLoggedIn(false);
        });
    }
  }, []);

  const handleLogin = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:3001/api/login', { email, password });
      console.log("response.data---->", response);
      const { token, user } = response.data;
      setUser(user);
      setIsLoggedIn(true);
      if (token) {
        axios.get('http://localhost:3001/api/verifyToken', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
          .then((response) => {
            setUser(response.data);
            setIsLoggedIn(true);
          })
          .catch((error) => {
            console.error('Error:', error);
            setIsLoggedIn(false);
          });
      }
      localStorage.setItem('token', token);

    } catch (error) {
      console.error('Login failed:', error.response ? error.response.data : error);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('token');
  };

  return (
    <div className="App">
      {isLoggedIn ? (
        <UserDetails user={user} onLogout={handleLogout} />
      ) : (
        <LoginForm onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;

