import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './src/views/Login/Login'
import RegisterScreen from './src/views/Register/Register'

import MainTabs from './src/navigation/MainTabs'

const MainStack = createStackNavigator()



export default function App() {

  const [user, setUser] = useState(1)

  const [favorites, setFavorites] = useState([])

  return (
      <NavigationContainer>
        <MainStack.Navigator>
          {user ? 
            <MainStack.Screen name="Main" component={MainTabs} options={{headerShown: false}}/>
            : 
            <>
            <MainStack.Screen name="Login" children={() => <LoginScreen setUser={setUser}/>} options={{headerShown: false}}/>
            <MainStack.Screen name="Register" component={RegisterScreen} options={{headerShown: false}}/>
            </>
          }
        </MainStack.Navigator>
      </NavigationContainer>
  );
}
