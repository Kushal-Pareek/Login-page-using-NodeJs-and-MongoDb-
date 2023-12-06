import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
function App() {
  const [users, setUsers] = useState([]);
 
  useEffect(() => {
    axios.get('http://localhost:3001/api/users')
      .then((response) => {
        console.log(response.data);
        if (Array.isArray(response.data)) {
          setUsers(response.data);
        } else {
          console.error('Data fetched is not an array');
        }
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
    <h1 className="center-text">User List</h1>
    <table className="user-table">
        <thead>
            <tr>
                <th>Username</th>
                <th>Email</th>
            </tr>
        </thead>
        <tbody>
            {users.map((user) => (
                <tr key={user._id}>
                    <td>{user.fullName}</td>
                    <td>{user.email}</td>
                </tr>
            ))}
        </tbody>
    </table>
    </div>
  );
}

export default App;
