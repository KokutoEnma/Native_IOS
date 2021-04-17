import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import Slider from '../../components/Slider'

export default ({ item, type }) => {


    if (!item || item.length < 1) return null
    const movies = type === 'movie' ? item : null;
    const tvs = type === 'tv' ? item : null;
    const screen = type === 'movie' ? 1 : 0;

    type = type === 'movie' ? 'Movies' : 'TV shows'

    return (
        <View style={styles.wrapper}>
            <Text style={styles.title}>Recommended {type}</Text>
            <Slider movies={movies} tvs={tvs} currentScreen={screen} />
        </View>
    )
}


const styles = StyleSheet.create({
    wrapper: {
        display: 'flex',
        justifyContent: 'flex-start',
        paddingLeft: '4%',
        paddingRight: '4%',
        paddingTop: 18
    },
    title: {
        fontWeight: 'bold',
        fontSize: 28,
        paddingBottom: 18
    },
})