import React from 'react';

function UserDetails({ user, onLogout }) {
    if (!user) {
        return null;
    }

    return (
        <div>
            <h1>Welcome, {user.fullName}</h1>
            <p>Your email is {user.email}</p>
            <button onClick={onLogout}>Logout</button>
        </div>
    );
}

export default UserDetails;
