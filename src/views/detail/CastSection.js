import React from 'react'
import { View, Text, ScrollView, Image, Dimensions } from 'react-native'

export default ({ item }) => {
    if (!item || item.length < 1) return null
    return (
        <View style={styles.wrapper}>
            <Text style={styles.title}>{'Cast & Crew'}</Text>
            <ScrollView horizontal={true} style={styles.casts}>
                {item.map((cast, index) => (
                    <View style={{ ...styles.cast, marginLeft: index === 0 ? 0 : 12 }} key={index}>
                        <Image source={{ uri: cast.profile }} style={styles.image} />
                        <Text style={styles.name}>{cast.title}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}

const styles = {
    wrapper: {
        display: 'flex',
        justifyContent: 'flex-start',
        paddingLeft: '4%',
        paddingRight: '4%',
        paddingTop: 24
    },
    title: {
        fontWeight: 'bold',
        fontSize: 28,
    },
    casts: {
        paddingTop: 36,
        width: '100%',
    },
    cast: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        width: Dimensions.get('window').width * 0.24,
    },
    image: {
        width: Dimensions.get('window').width * 0.24,
        height: Dimensions.get('window').width * 0.24,
        borderRadius: 100
    },
    name: {
        textAlign: 'center',
        marginTop: 16
    }
}