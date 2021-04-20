import React, { useLayoutEffect, useEffect, useState } from 'react'
import { View, ScrollView } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import HeaderRight from './HeaderIcons'

import fetcher from '../../utils/fetcher'
import VideoSection from './VideoSection'
import DetailSection from './DetailSection'
import CastSection from './CastSection'
import ReviewSection from './ReviewSection'
import RecommendSection from './RecommendSection'
import LoadingSpinner from '../../components/LoadingSpinner'
import { Text } from 'react-native'


export default function Screen() {
    const navigation = useNavigation()
    const route = useRoute()
    const [showDetail, setShowDetail] = useState(null)
    const [showVideo, setShowVideo] = useState(null)
    const [showCast, setShowCast] = useState(null)
    const [showReviews, setShowReviews] = useState(null)
    const [showRecommend, setShowRecommend] = useState(null)

    const type = route.params.item.type

    useEffect(() => {

        if (type === 'movie') {
            fetcher.fetch_movie_details(route.params.item.id, data => fetcher.setData(data, setShowDetail, 'movie detail'))
            fetcher.fetch_movie_video(route.params.item.id, data => fetcher.setData(data, setShowVideo, 'movie video'))
            fetcher.fetch_movie_cast(route.params.item.id, data => fetcher.setData(data, setShowCast, 'movie cast'))
            fetcher.fetch_movie_reviews(route.params.item.id, data => fetcher.setData(data, setShowReviews, 'movie reviews'))
            fetcher.fetch_recommeneded_movie(route.params.item.id, data => fetcher.setData(data, setShowRecommend, 'movie recommend'))
        }

        else {
            fetcher.fetch_tv_details(route.params.item.id, data => fetcher.setData(data, setShowDetail, 'tv detail'))
            fetcher.fetch_tv_video(route.params.item.id, data => fetcher.setData(data, setShowVideo, 'tv video'))
            fetcher.fetch_tv_cast(route.params.item.id, data => fetcher.setData(data, setShowCast, 'tv cast'))
            fetcher.fetch_tv_reviews(route.params.item.id, data => fetcher.setData(data, setShowReviews, 'tv reviews'))
            fetcher.fetch_recommeneded_tv(route.params.item.id, data => fetcher.setData(data, setShowRecommend, 'tv recommend'))
        }
    }, [])



    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => null,
            headerRight: () => <HeaderRight item={route.params.item} />,
            headerBackTitle: route.params ? route.params.previousRoute == 'Detail' ? 'Back' : 'USC Films' : 'Back'
        })
    }, [navigation])

    if (showDetail === false || showVideo === false || showCast === false || showReviews === false || showRecommend === false)
        return <Text>ger</Text>

    if (!showDetail || !showVideo || !showCast || !showReviews || !showRecommend)
        return <LoadingSpinner />

    return (
        <ScrollView >
            <View style={styles.wrapper}>
                <VideoSection item={showVideo} />
                <DetailSection item={showDetail} />
                <CastSection item={showCast} />
                <ReviewSection item={showReviews} show={showDetail} />
                <RecommendSection item={showRecommend} type={type} />
            </View>
        </ScrollView>
    )
}


const styles = {
    wrapper: {
        // marginLeft:'4%'
    }
}