import React, { useContext } from 'react'
import { Container } from './FavoritesStyled'
import { View, Text, Button } from 'react-native'
import { UserContext } from '../../data/UserContext';

export default function Favorites(props) {
    const user = useContext(UserContext);

    const signOut = () => {
        user.setUserId = '';
        user.setUsername = '';
        props.navigation.navigate('Login');
    }

    return (
        <Container>
            <Text>{user.userId}</Text>
            <Text>Welcome back {user.username}</Text>
            <Button title="Sign Out" onPress={signOut} />
        </Container>
    )
}
