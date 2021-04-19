import React from 'react'
import { View, Image, StyleSheet, Dimensions } from 'react-native'
import { ContextMenuView } from "react-native-ios-context-menu";
import { useDispatch, useSelector } from 'react-redux'
import { updateItemHandler, changeToastMessageHandler } from '../../store/reducer'

const width = Dimensions.get('window').width
const imgWidth = width * 0.3
const imgHeight = width * 0.45





export default function WatchlistItem({ index, setDragging, posIndex, getPosByIndex, selectedIndex, movingDis }) {

    const dispatch = useDispatch()
    const items = useSelector(state => state.items)
    const updateItems = items => dispatch(updateItemHandler(items))
    const changeToastMessage = message => dispatch(changeToastMessageHandler(message))


    let item = items[index]

    if (posIndex[item.id] === undefined) return null
    const position = getPosByIndex(posIndex[item.id])
    return (
        <View
            style={{
                zIndex: index === selectedIndex ? 100 : 1,
                position: 'absolute',
                left: index === selectedIndex ? position.refx + movingDis.x : position.refx,
                top: index === selectedIndex ? position.refy + movingDis.y : position.refy
            }}
            onTouchStart={() => {
                setDragging(true)
            }}
            onTouchCancel={() => {
                setDragging(false)
            }}
        >
            <ContextMenuView
                onPressMenuItem={() => {
                    let newItems = []
                    items.forEach(element => {
                        if (item.id !== element.id)
                            newItems.push({ ...element })
                    });
                    updateItems(newItems)
                    changeToastMessage(`${item.title} was removed from Watchlist`)
                }}
                menuConfig={{
                    menuTitle: '',
                    menuItems: [
                        {
                            actionKey: 'key',
                            actionTitle: 'Remove from watchlist',
                            icon: {
                                iconType: 'SYSTEM',
                                iconValue: 'bookmark.fill'
                            }
                        }
                    ]
                }}
            >
                <View
                    style={{ ...styles.wrapper }}
                    ref={r => viewRef = r}
                >
                    <Image source={{ uri: item.image }} style={{ ...styles.image }} />
                </View>
            </ContextMenuView>
        </View>

    )

}

const styles = StyleSheet.create({
    wrapper: {
        width: imgWidth,
        height: imgHeight
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    }
})