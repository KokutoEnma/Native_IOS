import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { useNavigation, useRoute } from '@react-navigation/native'
import ContextMenu from '../../components/ContextMenu'

export default function SearchResItem({ item }) {
    const date = new Date(item.date)
    if (!item) return null

    const nativgation = useNavigation()
    const route = useRoute()
    return (

        <TouchableOpacity style={styles.wrapper} onPress={() => nativgation.push('Detail', { item, previousRoute: route.name })}>
            <ContextMenu item={item}>
                <Image style={styles.image} source={{ uri: item.backdrop }} />
                <View style={styles.contentBox}>
                    <View style={styles.line1}>
                        <Text style={styles.textFont}>{`${item.type.toUpperCase()}(${date.getFullYear()})`}</Text>
                        <Text style={styles.textFont}><Icon name='star' color='red' size={22} />{item.vote / 2}</Text>
                    </View>
                    <View>
                        <Text style={styles.textFont}>{item.title}</Text>
                    </View>
                </View>
            </ContextMenu>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    wrapper: {
        width: '90%',
        marginTop: 12,
        borderRadius: 100
    },
    image: {
        width: '100%',
        height: 193.5,
        resizeMode: 'contain',
        borderRadius: 28
    },
    contentBox: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '6%'
    },
    line1: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    textFont: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    }
})