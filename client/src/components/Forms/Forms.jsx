import React, { useState } from 'react'
import { Container, Input, Button, ButtonText } from './FormsStyled'

export default function Inputs(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <Container>
            <Input 
                placeholder="Username..." 
                onChangeText={text => setUsername(text)}
            />
            <Input 
                placeholder="Password..."
                onChangeText={text => setPassword(text)} 
                secureTextEntry
            />
            <Button onPress={() => props.onSubmit(username, password)}>
                <ButtonText>{props.submitBtnText}</ButtonText>
            </Button>
            <Button onPress={() => props.onAltAction()}>
                <ButtonText>{props.altBtnText}</ButtonText>
            </Button>
        </Container>
    )
}
