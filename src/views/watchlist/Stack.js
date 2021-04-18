import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Screen from './Screen'
import DetailScreen from '../detail/Screen'
import ReviewScreen from '../review/Screen'

const Stack = createStackNavigator();

export default function ScreenNav() {
    return (
        <Stack.Navigator screenOptions={{
            headerStyle: { shadowColor: 'transparent' }
        }}>
            <Stack.Screen name="Watchlist" component={Screen} />
            <Stack.Screen name="Detail" component={DetailScreen} />
            <Stack.Screen name="Review" component={ReviewScreen} />
        </Stack.Navigator>
    )
}