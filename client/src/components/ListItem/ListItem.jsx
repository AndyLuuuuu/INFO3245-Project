import React, {useEffect} from 'react'
import { View, Image, Dimensions, TouchableOpacity, StyleSheet } from 'react-native'
import axios from 'axios'
import Constants from 'expo-constants';
import { MaterialIcons } from '@expo/vector-icons';

export default ListItem = ({data, goTo, userId, favorites, fetchFavorites}) => {
    let liked = favorites.map(fav => fav.movie_id).includes(data.id.toString())
    useEffect(() => {
        liked = favorites.map(fav => fav.movie_id).includes(data.id.toString())
    }, [favorites])
    const {width, height} = Dimensions.get('window')
    const favorite = () => {
        if (liked) {
            axios.post(`${Constants.manifest.extra.apiUrl}/deleteFavorites`, {
                userId, 
                movieId: data.id ? data.id : ""
            }).then(res => {
                fetchFavorites()
            }).catch(err => {
                console.log(err)
            })
        } else {
            axios.post(`${Constants.manifest.extra.apiUrl}/saveFavorites`, {
                userId, 
                movieId: data.id ? data.id : "", 
                movieName: data.original_name ? data.original_name : data.original_title , 
                posterUrl: data.poster_path ? data.poster_path : ""
            }).then(res => {
                fetchFavorites()
            }).catch(err => {
                console.log(err)
            })
        }
    }

    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', height: height - 49}}>
            <TouchableOpacity style={{flex: 1, justifyContent: 'center', alignItems: 'center'}} activeOpacity={0.9} onPress={() => goTo(data)}>
                <Image style={{width, height, position: 'relative'}} resizeMode="cover" source={{uri: `https://image.tmdb.org/t/p/w500${data.backdrop_path}`}} blurRadius={2}/>
                <Image style={{width: width - 20, height: height - 50, position: 'absolute', margin: 'auto', alignSelf: 'center' }} resizeMode="contain" source={{uri: `https://image.tmdb.org/t/p/w500${data.poster_path}`}}/>
                <TouchableOpacity onPress={favorite} style={{position: "absolute", bottom: 35, right: 10}}><MaterialIcons name="favorite" size={40} color={liked ? "red" : "rgba(150, 150, 150, 1)"} /></TouchableOpacity>
            </TouchableOpacity>
        </View>
    )
}