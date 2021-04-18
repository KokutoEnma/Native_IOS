import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Rating from '../../components/Rating'
import { useNavigation, useRoute } from '@react-navigation/native'

export default ({ item, show }) => {
    if (!item || item.length < 1) return null
    if (item.length > 3) item = item.slice(0, 3)

    const navigation = useNavigation()
    const route = useRoute()
    return (
        <View style={styles.wrapper}>
            <Text style={styles.title}>Reviews</Text>
            {
                item.map((review, index) => {
                    const date = new Date(review.created_at)

                    return (
                        <TouchableOpacity key={index} style={styles.reviewBox} onPress={() => navigation.push('Review', { review, show, previousRoute: route.name })}>
                            <Text style={styles.reviewTitle}>{`A review by ${review.author}`}</Text>
                            <ReviewBy date={date} author={review.author} />
                            <Rating rates={review.rating} style={styles.reviewRate} />
                            <Text numberOfLines={3}>{review.content}</Text>
                        </TouchableOpacity>
                    )
                })
            }
        </View>
    )
}

export const ReviewBy = ({ date, author }) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "October", "Nov", "Dec"
    ];
    return (
        <Text style={styles.reviewBy}>{`Written by ${author} on ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`} </Text>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        display: 'flex',
        justifyContent: 'flex-start',
        paddingLeft: '4%',
        paddingRight: '4%',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 28,
    },
    reviewBox: {
        borderColor: '#cccccc',
        borderWidth: 1,
        marginTop: 8,
        borderRadius: 8,
        padding: 6
    },
    reviewTitle: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    reviewBy: {
        color: 'grey'
    },
    reviewRate: {
        marginTop: 4,
        marginBottom: 8
    }
})