import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './Screen/Home';
import Welcome from './Screen/Welcome';
import RecipeDetail from './Screen/RecipeDetail';
const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='Welcome' screenOptions={{headerShown:false}}>
            <Stack.Screen name='Home' component={Home}/>
            <Stack.Screen name='Welcome' component={Welcome}/>
            <Stack.Screen name='RecipeDetail' component={RecipeDetail}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}