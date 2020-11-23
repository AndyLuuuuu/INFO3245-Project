import React, {useEffect, useState} from 'react'

import Constants from 'expo-constants';
import axios from 'axios'
import { useNavigation } from '@react-navigation/native';
import { View, Text, SafeAreaView, VirtualizedList, Image, Dimensions, TouchableOpacity } from 'react-native'

const ListItem = ({data, goTo}) => {
    const {width, height} = Dimensions.get('window')

    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', height: height - 49}}>
            <TouchableOpacity style={{flex: 1}} activeOpacity={0.9} onPress={() => goTo(data)}>
                <Image style={{width, height, position: 'relative'}} resizeMode="cover" source={{uri: `https://image.tmdb.org/t/p/w500${data.backdrop_path}`}} blurRadius={2}/>
                <Image style={{width: width - 20, height: height - 50, position: 'absolute', top: -24.5, left: 10 }} resizeMode="contain" source={{uri: `https://image.tmdb.org/t/p/w500${data.poster_path}`}}/>
            </TouchableOpacity>
        </View>
    )
}

export default function Discover({type}) {
    const [list, setList] = useState([])
    const navigation = useNavigation()
    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = () => {
        axios.get(`https://api.themoviedb.org/3/discover/${type}?api_key=${Constants.manifest.extra.tmdbApiKey}&sort_by=popularity.desc&page=1`).then(res => {
            setList(res.data.results)
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
        <SafeAreaView style={{flex: 1, marginTop: Constants.statusBarHeight}}>
           {list.length ? <VirtualizedList 
                data={list} 
                initialNumToRender={10} 
                renderItem={({item}) => <ListItem data={item} goTo={openDetails}/>}
                keyExtractor={item => item.id}
                getItemCount={getItemCount}
                getItem={getItem}
                horizontal={true}
            /> : null}
            {/* <Text>Discover {type.toUpperCase()}</Text> */}
        </SafeAreaView>
    )
}
