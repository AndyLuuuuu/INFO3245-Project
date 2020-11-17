import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import FavoritesScreen from '../views/Favorites/Favorites';

const Drawer = createDrawerNavigator();

export const ViewDrawer = () => {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Favorites" component={FavoritesScreen} />
        </Drawer.Navigator> 
    )
}