import React, { useContext, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { Container } from './LoginStyled'
import Logo from '../../components/Logo/Logo'
import Forms from '../../components/Forms/Forms'
import axios from 'axios'
import config from '../../config';

export default function Login(props) {
    // useEffect(() => {
    //     // const fetchData = () => {
    //         axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${config.apiKey}&language=en-US&sort_by=popularity.desc&page=1`).then(data => {
    //             console.log(data)
    //         })
    //     // }
    // }, [])

    const navigation = useNavigation();


    const handleSubmit = (username, password) => {
        console.log(config.apiUrl);
        axios.post(`${config.apiUrl}/login`, {
            username,
            password
        }).then(res => {
            console.log(res)
            props.setUser({
                userId: res.data.id,
                username: res.data.username
            })
            navigation.navigate("Main", {userId: res.data.id})
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
                onAltAction={() => navigation.navigate('Register')}
            />
        </Container>
    )
}
