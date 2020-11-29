import React, {useState, useEffect} from 'react'
import { SearchBar } from 'react-native-elements';
import config from '../../config'
import Constants from 'expo-constants'
import Axios from 'axios';
import { View, Text, SafeAreaView, VirtualizedList, Dimensions, TouchableOpacity, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

const {width, height} = Dimensions.get('window')

const ListItem = ({data, goTo, userId, favorites, fetchFavorites}) => {
    let liked = favorites.map(fav => fav.movie_id).includes(data.id.toString())
    useEffect(() => {
        liked = favorites.map(fav => fav.movie_id).includes(data.id.toString())
    }, [favorites])
    const {width, height} = Dimensions.get('window')
    const favorite = () => {
        console.log(data)
        if (liked) {
            Axios.post(`${config.apiUrl}/deleteFavorites`, {
                userId, 
                movieId: data.id ? data.id : ""
            }).then(res => {
                fetchFavorites()
            }).catch(err => {
                console.log(err)
            })
        } else {
            Axios.post(`${config.apiUrl}/saveFavorites`, {
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
                <Image style={{flex: 1, height, width}} resizeMode="cover" source={{uri: `https://image.tmdb.org/t/p/w500${data.poster_path}`}}/>
                <TouchableOpacity onPress={favorite} style={{position: "absolute", bottom: 100, right: 10, zIndex: 10000000}}><MaterialIcons name="favorite" size={40} color={liked ? "red" : "rgba(150, 150, 150, 1)"} /></TouchableOpacity>
            </TouchableOpacity>
        </View>
    )
}

export default function Search({userId, favorites, fetchFavorites}) {
    const navigation = useNavigation()

    const [searchKey, setSearchKey] = useState("")
    const [results, setResults] = useState([])

    const searchTMDB = () => {
        Axios.get(`https://api.themoviedb.org/3/search/multi?api_key=${config.apiKey}&language=en-US&query=${searchKey}&page=1&include_adult=false`)
        .then(res => {
            setResults(res.data.results.filter(result => result.media_type === 'tv' || result.media_type === 'movie'))
            console.log(res.data.results.filter(result => result.media_type === 'tv' || result.media_type === 'movie'))
        })
        .catch(err => {
            console.log(err)
        })
    }

    const getItemCount = (data) => {
        return data.length
    }

    const getItem = (data, index) => {
        return data[index]
    }

    const openDetails = (data) => {
        navigation.navigate('Details', data)
    }

    return (
        <SafeAreaView>
            <SearchBar
                placeholder="Search keyword..."
                onChangeText={(val) => setSearchKey(val)}
                value={searchKey}
                onSubmitEditing={searchTMDB}
                />
            {results.length ? <VirtualizedList 
                data={results} 
                initialNumToRender={10} 
                renderItem={({item}) => <ListItem data={item} goTo={openDetails} userId={userId} favorites={favorites} fetchFavorites={fetchFavorites} />}
                keyExtractor={item => item.id.toString()}
                getItemCount={getItemCount}
                getItem={getItem}
                horizontal={true}
            /> : null}
        </SafeAreaView>
    )
}
