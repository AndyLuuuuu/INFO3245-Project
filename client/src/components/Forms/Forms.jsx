import React from 'react'
import { Container, Input, Button, ButtonText } from './FormsStyled'

export default function Inputs() {
    return (
        <Container>
            <Input placeholder="Username..."/>
            <Input placeholder="Password..." secureTextEntry/>
            <Button>
                <ButtonText>LOGIN</ButtonText>
            </Button>
        </Container>
    )
}
