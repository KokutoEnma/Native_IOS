import React from 'react'
import { View, Linking } from 'react-native'
import FontistoIcon from 'react-native-vector-icons/Fontisto'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Fontawsome from 'react-native-vector-icons/FontAwesome'
import urls from '../../utils/urls'
import { useSelector, useDispatch } from 'react-redux'
import { changeToastMessageHandler, addItemHandler, removeItemHandler } from '../../store/reducer'


export default function Icons({ item }) {
    const dispatch = useDispatch()
    const changeToastMessage = message => dispatch(changeToastMessageHandler(message))
    const addItem = item => dispatch(addItemHandler(item))
    const removeItem = id => dispatch(removeItemHandler(id))
    const items = useSelector(state => state.items)
    const exist = items.filter(e => e.id === item.id).length > 0;
    return (
        <View style={styles.wrapper}>
            <Ionicons name={exist ? 'bookmark' : 'bookmark-outline'} size={22} style={styles.icon} color={exist ? '#1B77D6' : 'black'}
                onPress={() => {
                    if (exist) {
                        changeToastMessage(`${item.title} was removed from Watchlist`)
                        removeItem(item.id)
                    } else {
                        changeToastMessage(`${item.title} was added to Watchlist`)
                        addItem(item)
                    }
                }}
            />
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
