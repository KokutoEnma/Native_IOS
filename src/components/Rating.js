import React from 'react'
import { Text } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'



export default function Rating({ style, rates }) {
    return (
        <Text style={style}>
            <Icon name='star' color='red' size={22} />{`  ${rates / 2}/5.0`}
        </Text>
    )
}