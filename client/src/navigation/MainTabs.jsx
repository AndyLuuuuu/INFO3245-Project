import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FavoritesScreen from '../views/Favorites/Favorites';
import DiscoverScreen from '../views/Discover/Discover'
import SearchScreen from '../views/Search/Search'
import DetailScreen from '../views/Detail/Detail'
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const MainStack = createStackNavigator()
const MainTabs = createBottomTabNavigator()

const Tabs = () => {
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
        <MainTabs.Screen name="Favorites" component={FavoritesScreen}/>
        <MainTabs.Screen name="Discover TV" children={() => <DiscoverScreen type="tv"/>}/>
        <MainTabs.Screen name="Discover Movies" children={() => <DiscoverScreen type="movie"/>}/>
        <MainTabs.Screen name="Search" component={SearchScreen}/>
    </MainTabs.Navigator>
   )
}

export default () => {
    return (
        <MainStack.Navigator>
            <MainStack.Screen name="MainTabs" component={Tabs} options={{headerShown: false}}/>
            <MainStack.Screen name="Details" component={DetailScreen} options={{title: ""}}/>
        </MainStack.Navigator>
    )
}