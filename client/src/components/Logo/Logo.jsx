import React from 'react'
import {Container, Image, Title} from './LogoStyled'

export default function Logo({src}) {
    return (
        <Container>
            <Image source={require('../../../assets/logo.png')} resizeMode="contain"/>
            <Title>TV MOVIE SEARCH</Title>
        </Container>
    )
}
