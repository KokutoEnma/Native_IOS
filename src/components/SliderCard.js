import React from 'react'
import { View, Image, Dimensions, Text, TouchableOpacity } from 'react-native'
import ContextMenu from './ContextMenu'
import { useRoute, useNavigation } from '@react-navigation/native';


export default function SliderCard({ show, index }) {
    const year = new Date(show.date).getFullYear();
    const route = useRoute();
    const navigation = useNavigation();
    return (

        <View style={{
            marginLeft: index === 0 ? 0 : 12,
            marginRight: 12
        }} key={index}>

            <ContextMenu item={show}>
                <TouchableOpacity onPress={() => navigation.push('Detail', { item: show, previousRoute: route.name })} style={styles.imageWrapper} >
                    <Image source={{ uri: show.image }} style={styles.image} />
                </TouchableOpacity>
                <View style={styles.textBox}>
                    <Text style={styles.title}>{show.title}</Text>
                    <Text style={styles.year}>({year})</Text>
                </View>
            </ContextMenu>
        </View>
    )
}

const styles = {
    image: {
        width: Dimensions.get('window').width * 0.26,
        height: Dimensions.get('window').height * 0.16,
        borderRadius: 12
    },
    textBox: {
        width: Dimensions.get('window').width * 0.26,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    year: {
        color: 'gray',
    },
    title: {
        marginTop: 6,
        fontWeight: 'bold',
        textAlign: 'center'
    }
}