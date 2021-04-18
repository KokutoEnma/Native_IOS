import React, { useRef } from 'react'
import { View, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import { ContextMenuView } from "react-native-ios-context-menu";
import Draggable from 'react-native-draggable';


export default class WatchlistItem extends React.Component {


    render() {
        const { item } = this.props
        return (
            <Draggable>
                <TouchableOpacity onPress={() => console.log('trigger')}>

                    <View style={styles.wrapper} onTouchStart={() => console.log('touch')} onTouchMove={() => console.log('touchmove')} onTouchCancel={() => this._touchable._handleOnPressMenuPreview()}>
                        <ContextMenuView
                            ref={(touchable) => this._touchable = touchable}
                            onPressMenuItem={({ nativeEvent }) => {

                            }}
                            onPressMenuPreview={e => console.log('preview')}
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
                            <Image source={{ uri: item.image }} style={styles.image} />
                        </ContextMenuView>
                    </View>

                </TouchableOpacity>
            </Draggable>

        )
    }

}


const width = Dimensions.get('window').width
const styles = StyleSheet.create({
    wrapper: {
        width: width * 0.3,
        height: width * 0.45,
        marginLeft: 1,
        marginRight: 1,
        marginTop: 2,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    }
})