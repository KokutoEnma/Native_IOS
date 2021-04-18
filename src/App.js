import * as React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/Ionicons';

import HomeStack from './views/home/Stack'
import SearchStack from './views/search/Stack'
import WatchlistStack from './views/watchlist/Stack'


import { Provider } from 'react-redux';
import store from './store/store'

const Tab = createBottomTabNavigator();
const theme = {
    DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: 'white'
    },
}

export default function App() {

    return (
        <Provider store={store}>
            <NavigationContainer theme={theme}>
                <MainScreen />
            </NavigationContainer>
        </Provider>
    );
}

function MainScreen() {
    return (
        <Tab.Navigator
            initialRouteName="Home"

            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = 'ios-home-outline'
                    } else if (route.name === 'Search') {
                        iconName = 'search'
                    } else if (route.name === 'Watchlist') {
                        iconName = 'heart-outline'
                    }
                    return <Icon name={iconName} size={size} color={color} />;
                }
            })}
        >
            <Tab.Screen name="Search" component={SearchStack} />
            <Tab.Screen name="Home" component={HomeStack} />
            <Tab.Screen name="Watchlist" component={WatchlistStack} />
        </Tab.Navigator>
    )
}
