import React from 'react'
import {Container} from './LoginStyled'
import Logo from '../../components/Logo/Logo'
import Forms from '../../components/Forms/Forms'
import { View, Text } from 'react-native'

export default function Login() {
    return (
        <Container>
            <Logo/>
            <Forms/>
        </Container>
    )
}