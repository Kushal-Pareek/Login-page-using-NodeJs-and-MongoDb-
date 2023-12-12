import React, { useState } from 'react';

const LoginForm = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = () => {

        onLogin(email, password);
    };

    return (
        <div>
            <h2>Login</h2>
            <label>Email:</label>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
            <br />
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <br />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default LoginForm;
