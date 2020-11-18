import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { UserProvider } from './src/data/UserContext'

import LoginScreen from './src/views/Login/Login'
import RegisterScreen from './src/views/Register/Register'

import { ViewDrawer } from './src/navigation/ViewDrawer'

const AccountStack = createStackNavigator()



export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>

        <AccountStack.Navigator>
          <AccountStack.Screen name="Login" component={LoginScreen} options={{headerShown: false}} />
          <AccountStack.Screen name="Register" component={RegisterScreen} options={{headerShown: false}} />
          <AccountStack.Screen name="ViewDrawer" component={ViewDrawer} options={{headerShown: false}} />
        </AccountStack.Navigator>



      </NavigationContainer>
    </UserProvider>
  );
}
