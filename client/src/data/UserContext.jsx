import React, { useState } from 'react'

export const UserContext = React.createContext({});

export const UserProvider = props => {
    const [userId, setUserId] = useState('');
    const [username, setUsername] = useState('');

    const userContext = {
        userId,
        username,
        setUserId,
        setUsername
    };

    return <UserContext.Provider value={userContext}>{props.children}</UserContext.Provider>
}