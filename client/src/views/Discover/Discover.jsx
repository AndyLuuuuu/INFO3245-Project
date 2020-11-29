import React, {useEffect, useState} from 'react'

import Constants from 'expo-constants';
import axios from 'axios'
import { useNavigation } from '@react-navigation/native';
import { View, Text, SafeAreaView, VirtualizedList, Image, Dimensions, TouchableOpacity } from 'react-native'
import ListItem from '../../components/ListItem/ListItem'

export default function Discover({type, favorites, fetchFavorites, userId}) {
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
                initialNumToRender={1} 
                renderItem={({item}) => <ListItem data={item} goTo={openDetails} userId={userId} favorites={favorites} fetchFavorites={fetchFavorites}/>}
                keyExtractor={item => item.id.toString()}
                getItemCount={getItemCount}
                getItem={getItem}
                horizontal={true}
            /> : null}
        </SafeAreaView>
    )
}
