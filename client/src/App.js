import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);
 
  useEffect(() => {
    
    axios.get('http://localhost:3001/api/users')
      .then((response) => setUsers(response.data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h1>User List</h1>
    <table>
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
