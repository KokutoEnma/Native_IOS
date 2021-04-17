import React, { useRef, useState } from 'react'
import { View } from 'react-native'
import Carousel from 'react-native-snap-carousel';
import CarouselCard, { SLIDER_WIDTH, ITEM_WIDTH } from './CarouselCard'

export default function ({ movies, tvs, currentScreen }) {
    const carouselRef = useRef(null)
    const shows = [tvs, movies][currentScreen]

    return (
        <View style={styles.slider}>
            <Carousel
                layout={"default"}
                ref={carouselRef}
                data={shows}
                sliderWidth={SLIDER_WIDTH * 0.9}
                itemWidth={ITEM_WIDTH}
                renderItem={CarouselCard}
                inactiveSlideShift={0}
                useScrollView={true}
                autoplay={true}
                loop={true}
            />
        </View>
    )
}

const styles = {
    slider: {
        width: '90%',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center'
    }
}