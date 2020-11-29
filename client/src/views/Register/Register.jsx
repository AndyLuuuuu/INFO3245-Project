import React from 'react'
import { Container, Title } from './RegisterStyled'
import Forms from '../../components/Forms/Forms'
import axios from 'axios'
import config from '../../config'

export default function Register(props) {
    const handleSubmit = (username, password) => {
        axios.post(`${config.apiUrl}/register`, {
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