import React, { useContext, useState } from 'react'
import axios from 'axios'
import config from '../../data/config';
import { Container, Input, Button, ButtonText } from './FormsStyled'
import { UserContext } from '../../data/UserContext';

export default function Inputs(props) {
    const user = useContext(UserContext);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = () => {
        axios.post(`${config.url}/login`, {
            username,
            password
        }).then(res => {
            user.setUserId(res.data.id);
            user.setUsername(res.data.username);
            props.navigation.navigate('ViewDrawer', { screen: 'Favorites' });
        }).catch(err => {
            console.log(err);
        });
    }

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
            <Button onPress={() => handleSubmit()}>
                <ButtonText>LOGIN</ButtonText>
            </Button>
        </Container>
    )
}
