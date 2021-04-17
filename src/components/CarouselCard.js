import React from 'react'
import { ImageBackground, View, Image, Dimensions } from 'react-native'
import ContextMenu from './ContextMenu'
import CarouselImage from './CarouselImage'

export const SLIDER_WIDTH = Dimensions.get('window').width
export const ITEM_WIDTH = SLIDER_WIDTH

function CarouselCard({ item, index }) {
    return (
        <View style={styles.container} key={index}>
            <ImageBackground source={{ uri: item.image }} style={styles.backGround} blurRadius={24}>
                <ContextMenu item={item}>
                    <CarouselImage item={item} />
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
    }
}


export default CarouselCard