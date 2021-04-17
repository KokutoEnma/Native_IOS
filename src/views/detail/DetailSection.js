import React, { useState } from 'react'
import { View, Text } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import Rating from '../../components/Rating'

export default ({ item }) => {
    if (!item) return null

    const [descLenth, setDescLength] = useState(0)

    const types = `${new Date(item.first_air_date || item.release_date).getFullYear()} | ${item.genres.map(e => e.name).join(', ')}`
    return (
        <View style={styles.wrapper}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.types}>{types}</Text>
            <Rating style={styles.types} rates={item.vote_average} />
            <Text numberOfLines={[3, 0][descLenth]} style={styles.description}>{item.overview}</Text>
            <Text style={styles.descLenth} onPress={() => setDescLength(1 - descLenth)}>{['Show more', 'Show less'][descLenth]}</Text>
        </View>
    )
}


const styles = {
    wrapper: {
        display: 'flex',
        justifyContent: 'flex-start',
        paddingLeft: '4%',
        paddingRight: '4%'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 28,
    },
    types: {
        fontSize: 18,
        marginTop: 16,
    },
    description: {
        fontSize: 16,
        marginTop: 16,
        fontFamily: 'Helvetica'
    },
    descLenth: {
        textAlign: 'right',
        color: 'gray'
    }
}


