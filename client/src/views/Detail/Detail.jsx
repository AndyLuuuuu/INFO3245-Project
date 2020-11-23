import React, {useEffect} from 'react'
import { View } from 'react-native'
import {Container, ImageContainer, BackdropImage, PosterImage, Content, Title, Text} from './DetailStyled'

export default function Detail(props) {
    useEffect(() => {
        props.navigation.setOptions({
            headerTitle: props.route.params.original_name
        })
      }, []);
    
    const {params} = props.route

    return (
        <Container>
            <ImageContainer>
                <BackdropImage source={{uri: `https://image.tmdb.org/t/p/w500${params.backdrop_path}`}} blurRadius={5}/>
                <PosterImage source={{uri: `https://image.tmdb.org/t/p/w500${params.poster_path}`}} resizeMode="contain"/>
            </ImageContainer>
            <Content>
                <Title>Vote count: <Text>{params.vote_count}</Text></Title>
                <Title>Vote average: <Text>{params.vote_average}/10</Text></Title>
                <Title>Original language: <Text>{params.original_language.toUpperCase()}</Text></Title>
                <Title>Short summary:</Title>
                <Text>{params.overview}</Text>
            </Content>
        </Container>
    )
}
