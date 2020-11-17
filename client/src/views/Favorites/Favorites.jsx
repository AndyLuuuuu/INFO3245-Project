import React, { useContext } from 'react'
import { Container } from './FavoritesStyled'
import { View, Text } from 'react-native'
import { UserContext } from '../../data/UserContext';

export default function Favorites() {
    const user = useContext(UserContext);

    return (
        <Container>
            <Text>{user.userId}</Text>
            <Text>Welcome back {user.username}</Text>
        </Container>
    )
}
