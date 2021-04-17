import React from 'react'
import { ImageBackground, View, Image, Dimensions } from 'react-native'
import ContextMenu from './ContextMenu'


export const SLIDER_WIDTH = Dimensions.get('window').width
export const ITEM_WIDTH = SLIDER_WIDTH

const CarouselCard = ({ item, index }) => {


    return (

        <View style={styles.container} key={index}>
            <ImageBackground source={{ uri: item.image }} style={styles.backGround} blurRadius={24}>
                <ContextMenu item={item}>
                    <View style={styles.imageWrapper}>
                        < Image
                            source={{ uri: item.image }}
                            style={styles.image} />
                    </View>
                </ContextMenu>
            </ImageBackground>
        </View>

    )
}


const styles = {
    container: {
        height: 240,
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    backGround: {
        flex: 1,
        resizeMode: "contain",
        justifyContent: "center",
        alignItems: 'center',
        height: '100%',
        width: '100%'
    },
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


export default CarouselCard