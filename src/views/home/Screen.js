import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Text, View, Button, ActivityIndicator, ScrollView, Linking } from 'react-native';
import fetcher from '../../utils/fetcher'
import Carousel from '../../components/Carousel'
import Slider from '../../components/Slider'

export default function Screen({ navigation }) {
    const [currentMovie, setCurrentMovie] = useState(null)
    const [popularMovie, setPopularMovie] = useState(null)
    const [topMovie, setTopMovie] = useState(null)

    const [trendingTv, setTrendingTv] = useState(null)
    const [popularTv, setPopularTv] = useState(null)
    const [topTv, setTopTv] = useState(null)

    const [titleShow, setTitleShow] = useState(false);

    const loaded = currentMovie && popularMovie && topMovie && trendingTv && popularTv && topTv

    const [currentScreen, setCurrentScreen] = useState(1)

    const setData = (d, callback, type) => {
        const { err, data, msg } = d
        if (err) console.log(type + " Error:" + msg)
        else callback(data)
    }
    useEffect(() => {
        fetcher.fetch_current_playing_movie(data => setData(data, setCurrentMovie, 'current playing movie'))
        fetcher.fetch_popular_movie(data => setData(data, setPopularMovie, 'playing movie'))
        fetcher.fetch_top_movie(data => setData(data, setTopMovie, 'top movie'))
        fetcher.fetch_trending_tv(data => setData(data, setTrendingTv, 'trending tv'))
        fetcher.fetch_popular_tv(data => setData(data, setPopularTv, 'popular tv'))
        fetcher.fetch_top_tv(data => setData(data, setTopTv, 'top tv'))
    }, [])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                loaded ?
                    <>
                        <Button onPress={() => setCurrentScreen(1 - currentScreen)} title={['Movies', 'TV shows'][currentScreen]} />
                    </>
                    : null
            ),
            headerTitle: () => titleShow ? <Text style={styles.navTitle}>USC Films</Text> : null
        })
    }, [navigation, currentScreen, setCurrentScreen, loaded, titleShow])

    if (loaded) {
        return (
            <>
                <ScrollView
                    onScroll={e => {
                        if (e.nativeEvent.contentOffset.y > 12) setTitleShow(true)
                        else setTitleShow(false)
                    }}
                    scrollEventThrottle={16}
                >

                    <Text style={styles.title}>USC Films</Text>
                    <Text style={styles.subTitle}>{['Trending', 'Now Playing'][currentScreen]}</Text>

                    <View style={styles.wrapper}>
                        <Carousel movies={currentMovie} tvs={trendingTv} currentScreen={currentScreen} />
                    </View>
                    <Text style={styles.subTitle}>Top Rated</Text>
                    <View style={styles.wrapper}>
                        <Slider movies={topMovie} tvs={topTv} currentScreen={currentScreen} />
                    </View>
                    <Text style={styles.subTitle}>Popular</Text>
                    <View style={styles.wrapper}>
                        <Slider movies={popularMovie} tvs={popularTv} currentScreen={currentScreen} />
                    </View>
                    <Text
                        style={{ ...styles.footer, marginTop: 12 }}
                        onPress={() => Linking.openURL('https://www.themoviedb.org/')}
                    >
                        Powered by TMDB
                    </Text>
                    <Text style={{ ...styles.footer, marginBottom: 16 }}>Delivered by Shaw S. Yu</Text>

                </ScrollView>

            </>
        )
    } else {
        return (
            <View style={styles.spinnerContainer}>
                <ActivityIndicator />
                <Text style={styles.spinnerText}>Fetching Data...</Text>
            </View>
        )
    }
}

const styles = {
    navTitle: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    wrapper: {
        marginTop: 18,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginLeft: '6%'
    },
    subTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: '4%',
        marginTop: 12
    },
    spinnerContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center'
    },
    spinnerText: {
        color: 'gray',
        marginTop: 12
    },
    footer: {
        textAlign: 'center',
        color: 'gray',
        fontSize: 12
    }
}