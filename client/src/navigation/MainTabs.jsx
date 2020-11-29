import React, {useEffect, useState} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Constants from 'expo-constants';
import axios from 'axios'
import FavoritesScreen from '../views/Favorites/Favorites';
import DiscoverScreen from '../views/Discover/Discover'
import SearchScreen from '../views/Search/Search'
import DetailScreen from '../views/Detail/Detail'
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const MainStack = createStackNavigator()
const MainTabs = createBottomTabNavigator()

const Tabs = ({user}) => {
    useEffect(() => {
        fetchFavorites()
    }, [])

    const [favorites, setFavorites] = useState([])
    const userId = user.userId

    const fetchFavorites = () => {
        axios.post(`${Constants.manifest.extra.apiUrl}/favorites`, {
            userId: user.userId,
        }).then(res => {
            setFavorites(res.data)
        }).catch(err => {
            console.log(err);
        });
    }

   return (
    <MainTabs.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let iconSize = 20

            switch (route.name) {
                case 'Favorites':
                    return <MaterialIcons name="favorite" size={iconSize} color={focused ? 'tomato' : 'gray'} />
                case 'Discover TV':
                    iconName = "tv"
                    break;
                case 'Discover Movies':
                    iconName = "film"
                    break;
                case 'Search':
                    iconName = "search"
                    break;
            }

            // You can return any component that you like here!
            return <FontAwesome name={iconName} size={iconSize} color={focused ? 'tomato' : 'gray'} />;
            },
        })}
        tabBarOptions={{
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
        }}
        >
        <MainTabs.Screen name="Favorites" children={() => <FavoritesScreen favorites={favorites} fetchFavorites={fetchFavorites} userId={userId}/> }/>
        <MainTabs.Screen name="Discover TV" children={() => <DiscoverScreen type="tv" favorites={favorites} fetchFavorites={fetchFavorites} userId={userId}/>}/>
        <MainTabs.Screen name="Discover Movies" children={() => <DiscoverScreen type="movie" favorites={favorites} fetchFavorites={fetchFavorites} userId={userId}/> }/>
        <MainTabs.Screen name="Search" children={() => <SearchScreen favorites={favorites} fetchFavorites={fetchFavorites} userId={userId}/>}/>
    </MainTabs.Navigator>
   )
}

export default ({user}) => {
    console.log("BEFORE MAIN", user)
    return (
        <MainStack.Navigator>
            <MainStack.Screen name="MainTabs" children={() => <Tabs user={user}/>} options={{headerShown: false}}/>
            <MainStack.Screen name="Details" component={DetailScreen} options={{title: ""}}/>
        </MainStack.Navigator>
    )
}