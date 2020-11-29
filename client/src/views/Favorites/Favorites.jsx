import React, { useContext } from 'react'
import { Container, FavoriteItem, FavoriteImage, FavoriteDetails, FavoriteTitle } from './FavoritesStyled'
import { SafeAreaView, FlatList, Dimensions, View } from 'react-native'
import Constants from 'expo-constants';

const Favorite = ({favorite}) => {
    console.log(favorite)
    const {width, height} = Dimensions.get('window')
    return (
        <FavoriteItem style={{width}}>
            <FavoriteImage source={{uri: `https://image.tmdb.org/t/p/w500${favorite.poster_url}`}} resizeMode="cover"/>
            <FavoriteDetails>
                <FavoriteTitle>{favorite.movie_name}</FavoriteTitle>
            </FavoriteDetails>
        </FavoriteItem>
    )
}

export default function Favorites({favorites}) {
    console.log(favorites)
    return (
        <SafeAreaView style={{flex: 1, marginTop: Constants.statusBarHeight}}>
            <FlatList
                ItemSeparatorComponent={() => <View style={{height: 1, width: "100%", backgroundColor: "rgba(0,0,0,0.2)"}}/>}
                data={favorites}
                renderItem={(item) => <Favorite favorite={item.item}/>}
                keyExtractor={item => item.id.toString()}
            />
        </SafeAreaView>
    )
}
