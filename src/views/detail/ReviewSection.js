import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Rating from '../../components/Rating'


export default ({ item }) => {
    if (!item || item.length < 1) return null
    if (item.length > 3) item = item.slice(0, 3)
    return (
        <View style={styles.wrapper}>
            <Text style={styles.title}>Reviews</Text>
            {
                item.map((review, index) => {
                    const date = new Date(review.created_at)
                    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                        "Jul", "Aug", "Sep", "October", "Nov", "Dec"
                    ];
                    // console.log(review)
                    return (
                        <View key={index} style={styles.reviewBox}>
                            <Text style={styles.reviewTitle}>{`A review by ${review.author}`}</Text>
                            <Text style={styles.reviewBy}>{`Written by ${review.author} on ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`} </Text>
                            <Rating rates={review.rating} style={styles.reviewRate} />
                            <Text numberOfLines={3}>{review.content}</Text>
                        </View>
                    )
                })
            }
        </View>
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