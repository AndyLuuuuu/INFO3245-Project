import React from 'react'
import {Container} from './LoginStyled'
import Logo from '../../components/Logo/Logo'
import Forms from '../../components/Forms/Forms'
import { View, Text } from 'react-native'

export default function Login(props) {
    return (
        <Container>
            <Logo/>
            <Forms {...props} />
        </Container>
    )
}
