import React from 'react'
import { ScrollView, Dimensions } from 'react-native'
import SliderCard from './SliderCard'

export default function Slider({ movies, tvs, currentScreen }) {
    const shows = [tvs, movies][currentScreen]
    if (!shows) return null
    return (
        <ScrollView style={styles.wrapper} horizontal={true}>
            {
                shows.map((show, index) => (
                    <SliderCard show={show} index={index} key={index} />
                ))
            }

        </ScrollView>
    )
}

const styles = {
    wrapper: {
        display: 'flex',
        flexDirection: 'row',
        // paddingBottom: '1%',
        width: '100%'
    },
    image: {
        width: Dimensions.get('window').width * 0.26,
        height: Dimensions.get('window').height * 0.18,
        marginLeft: '4%',
        marginRight: 12
    }
}