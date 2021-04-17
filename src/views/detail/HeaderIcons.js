import React from 'react'
import { View, Linking } from 'react-native'
import FontistoIcon from 'react-native-vector-icons/Fontisto'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Fontawsome from 'react-native-vector-icons/FontAwesome'
import urls from '../../utils/urls'

export default function Icons({ item }) {

    return (
        <View style={styles.wrapper}>
            <Ionicons name='bookmark-outline' size={22} style={styles.icon} />
            <Fontawsome name='facebook' size={22} style={styles.icon} onPress={() => Linking.openURL(urls.facebook(item.type, item.id))} />
            <FontistoIcon name='twitter' size={16} style={styles.icon} onPress={() => Linking.openURL(urls.twitter(item.type, item.id))} />
        </View>
    )
}

const styles = {
    wrapper: {
        display: 'flex',
        paddingRight: 18,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    icon: {
        marginLeft: 14,
        fontWeight: 'bold'
    }
}
