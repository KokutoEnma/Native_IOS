import React from 'react'
import { Image, TouchableOpacity } from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native';



export default function CarouselImage({ item }) {
    const route = useRoute();
    const navigation = useNavigation();
    return (

        <TouchableOpacity onPress={() => navigation.navigate('Detail', { item, previousRoute: 'Home' })} style={styles.imageWrapper}>
            < Image
                source={{ uri: item.image }}
                style={styles.image} />
        </TouchableOpacity>

    )
}

const styles = {
    imageWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: 160,
    },
    image: {
        width: '100%',
        height: '100%',
        // alignItems: 'center',
        // justifyContent: 'center',
        resizeMode: "contain"
    }
}