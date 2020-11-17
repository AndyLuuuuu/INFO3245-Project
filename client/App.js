import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import LoginScreen from './src/views/Login/Login'
import RegisterScreen from './src/views/Register/Register'

const AccountStack = createStackNavigator()

const ViewDrawer = createDrawerNavigator()


export default function App() {
  return (
    <NavigationContainer>

      <AccountStack.Navigator>
        <AccountStack.Screen name="Login" component={LoginScreen} options={{headerShown: false}} />
        {/* <AccountStack.Screen name="Register" component={RegisterScreen} /> */}
      </AccountStack.Navigator>
{/* 
      <ViewDrawer.Navigator>

      </ViewDrawer.Navigator> */}

    </NavigationContainer>
  );
}
