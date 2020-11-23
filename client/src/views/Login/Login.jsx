import React, { useContext, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { Container } from './LoginStyled'
import Logo from '../../components/Logo/Logo'
import Forms from '../../components/Forms/Forms'
import axios from 'axios'
import Constants from 'expo-constants';

export default function Login(props) {
    // useEffect(() => {
    //     // const fetchData = () => {
    //         axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${Constants.manifest.extra.tmdbApiKey}&language=en-US&sort_by=popularity.desc&page=1`).then(data => {
    //             console.log(data)
    //         })
    //     // }
    // }, [])

    const navigation = useNavigation();


    const handleSubmit = (username, password) => {
        axios.post(`${Constants.manifest.extra.apiUrl}/login`, {
            username,
            password
        }).then(res => {
            props.setUser({
                userId: res.data.id,
                username: res.data.username
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
                onAltAction={() => navigation.navigate('Register')}
            />
        </Container>
    )
}
