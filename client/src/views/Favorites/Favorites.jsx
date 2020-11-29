import React, { useContext } from 'react'
import { Container, FavoriteItem, FavoriteImage, FavoriteDetails, FavoriteTitle, NoFavoritesText } from './FavoritesStyled'
import axios from 'axios'
import { SafeAreaView, FlatList, Dimensions, View, TouchableOpacity } from 'react-native'
import Constants from 'expo-constants';
import { MaterialIcons } from '@expo/vector-icons';

const unfavorite = (userId, movieId, fetchFavorites) => {
    axios.post(`${Constants.manifest.extra.apiUrl}/deleteFavorites`, {
        userId, 
        movieId: movieId
    }).then(res => {
        fetchFavorites()
    }).catch(err => {
        console.log(err)
    })
}

const Favorite = ({favorite, userId, fetchFavorites}) => {
    console.log(favorite)
    const {width, height} = Dimensions.get('window')
    return (
        <FavoriteItem style={{width}}>
            <FavoriteImage source={{uri: `https://image.tmdb.org/t/p/w500${favorite.poster_url}`}} resizeMode="cover"/>
            <FavoriteDetails>
                <FavoriteTitle>{favorite.movie_name}</FavoriteTitle>
            </FavoriteDetails>
            <TouchableOpacity 
                onPress={() => unfavorite(userId, favorite.movie_id, fetchFavorites)}
                style={{flex:1, alignItems:'flex-end', marginRight:10}}
            >
                <MaterialIcons name="favorite" size={30} color="red" />
            </TouchableOpacity>
        </FavoriteItem>
    )
}

export default function Favorites({favorites, userId, fetchFavorites}) {
    console.log(favorites)
    return (
        <SafeAreaView style={{flex: 1, marginTop: Constants.statusBarHeight}}>
            {favorites.length>0 ?
                <FlatList
                    ItemSeparatorComponent={() => <View style={{height: 1, width: "100%", backgroundColor: "rgba(0,0,0,0.2)"}}/>}
                    data={favorites}
                    renderItem={(item) => <Favorite favorite={item.item} userId={userId} fetchFavorites={fetchFavorites}/>}
                    keyExtractor={item => item.id.toString()}
                />
                :
                <NoFavoritesText>You have no favorites.</NoFavoritesText>
            }

        </SafeAreaView>
    )
}
