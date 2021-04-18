import React, { useLayoutEffect } from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import WatchlistItem from './WatchlistItem'

export default function Screen() {
    const navigation = useNavigation()
    const items = useSelector(state => state.items)
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => null
        })
    })
    return (
        <ScrollView>
            <View style={styles.wrapper}>
                <Text style={styles.title}>Watchlist</Text>
                <View style={styles.itemBox}>
                    {
                        items.map((item, index) => (
                            <WatchlistItem item={item} key={index} />
                        ))
                    }
                </View>
            </View>
        </ScrollView>
    )
}


const styles = StyleSheet.create({

    wrapper: {
        padding: '4%'
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold'
    },
    itemBox: {
        display: 'flex',
        // justifyContent: 'space-between',
        flexDirection: 'row',
        flexWrap: 'wrap',
    }
})