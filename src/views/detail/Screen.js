import React, { useLayoutEffect } from 'react'
import { View, Text } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'

export default function Screen() {
    const navigation = useNavigation()
    const route = useRoute()

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => null,
            // headerRight: () => <HeaderRight />,
            headerBackTitle: route.params ? route.params.previousScreen == 'Detail' ? 'Back' : 'USC Films' : 'Back'
        })
    }, [navigation])


    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Detail Screen</Text>
        </View>
    )
}