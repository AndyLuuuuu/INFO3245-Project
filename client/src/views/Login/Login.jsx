import React, { useContext } from 'react'
import { Container } from './LoginStyled'
import Logo from '../../components/Logo/Logo'
import Forms from '../../components/Forms/Forms'
import axios from 'axios'
import Constants from 'expo-constants';
import { UserContext } from '../../data/UserContext';
import { View, Text } from 'react-native'

export default function Login(props) {
    const user = useContext(UserContext);

    const handleSubmit = (username, password) => {
        axios.post(`${Constants.manifest.extra.apiUrl}/login`, {
            username,
            password
        }).then(res => {
            user.setUserId(res.data.id);
            user.setUsername(res.data.username);
            props.navigation.reset({
                index: 0,
                routes: [{
                    name: 'ViewDrawer',
                    params: {
                        screen: 'Favorites'
                    }
                }]
            })
        }).catch(err => {
            console.log(err);
        });
    }

    return (
        <Container>
            <Logo/>
            <Forms 
                submitBtnText="LOGIN" 
                altBtnText="REGISTER"
                onSubmit={handleSubmit}
                onAltAction={() => props.navigation.navigate('Register')}
            />
        </Container>
    )
}
