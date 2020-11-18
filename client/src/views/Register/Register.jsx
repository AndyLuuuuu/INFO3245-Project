import React from 'react'
import { Container, Title } from './RegisterStyled'
import Forms from '../../components/Forms/Forms'
import axios from 'axios'
import Constants from 'expo-constants';

export default function Register(props) {
    const handleSubmit = (username, password) => {
        axios.post(`${Constants.manifest.extra.apiUrl}/register`, {
            username,
            password
        }).then(res => {
            if (res.status == 200) {
                props.navigation.navigate('Login')
            }
        }).catch(err => {
            console.log(err);
        });
    }

    return (
        <Container>
            <Title>Register</Title>
            <Forms 
                submitBtnText="REGISTER" 
                altBtnText="CANCEL"
                onSubmit={handleSubmit}
                onAltAction={() => props.navigation.navigate('Login')}
            />
        </Container>
    )
}