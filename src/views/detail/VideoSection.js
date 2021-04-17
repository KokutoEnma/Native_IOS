import React from 'react'
import { View } from 'react-native'
import YoutubePlayer from "react-native-youtube-iframe";


export default ({ item }) => {
    if (!item || item.length < 1)
        return null;

    let video = item.filter(e => e.type === 'Trailer' && e.site === 'YouTube')
    if (video.length < 1) return null
    video = video[0]

    return (
        <View style={styles.wrapper}>
            <YoutubePlayer
                // style={styles.video}
                width={'90%'}
                height={212}
                videoId={video.key}
            />
        </View>
    )
}

const styles = {
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 96
    },

}