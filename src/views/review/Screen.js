import React, { useLayoutEffect } from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native'
import { ReviewBy } from '../detail/ReviewSection'
import Rating from '../../components/Rating'

export default function Screen() {

    const navigation = useNavigation()
    const route = useRoute()
    if (!route.params || !route.params.review || !route.params.show) return null
    const { review, show } = route.params

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => null
        })
    })

    return (
        <ScrollView>
            <View style={styles.wrapper}>
                <Text style={styles.title}>{show.title}</Text>
                <View style={styles.reviewBy}>
                    <ReviewBy author={review.author} date={new Date(review.created_at)} />
                </View>
                <Rating rates={review.rating} style={styles.rating} />
                <View style={styles.border}></View>
                <Text style={styles.content}>{review.content}</Text>
            </View>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    wrapper: {
        padding: 16,
        paddingTop: 48,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold'
    },
    reviewBy: {
        marginTop: 8,
    },
    rating: {
        marginTop: 8,
        paddingBottom: 8,
    },
    border: {
        borderColor: 'transparent',
        borderBottomColor: '#cccccc',
        borderWidth: 1
    },
    content: {
        marginTop: 12,
        fontSize: 18
    }
})