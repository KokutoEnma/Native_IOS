import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { Text, View, Button, ActivityIndicator, ScrollView, Linking } from 'react-native';
import fetcher from '../../utils/fetcher'
import Carousel from '../../components/Carousel'
import Slider from '../../components/Slider'
import Toast from 'react-native-root-toast';
import { useSelector } from 'react-redux'
import LoadingSpinner from '../../components/LoadingSpinner'

const useDidMountEffect = (func, deps) => {
    const didMount = useRef(false);

    useEffect(() => {
        if (didMount.current) func();
        else didMount.current = true;
    }, deps);
}


export default function Screen({ navigation }) {
    const toast = useSelector(state => state.toast)
    const [toastShow, setToastShow] = useState(false)
    const [currentMovie, setCurrentMovie] = useState(null)
    const [popularMovie, setPopularMovie] = useState(null)
    const [topMovie, setTopMovie] = useState(null)

    const [trendingTv, setTrendingTv] = useState(null)
    const [popularTv, setPopularTv] = useState(null)
    const [topTv, setTopTv] = useState(null)

    const [titleShow, setTitleShow] = useState(false);

    const loaded = currentMovie && popularMovie && topMovie && trendingTv && popularTv && topTv

    const [currentScreen, setCurrentScreen] = useState(1)

    useEffect(() => {
        fetcher.fetch_current_playing_movie(data => fetcher.setData(data, setCurrentMovie, 'current playing movie'))
        fetcher.fetch_popular_movie(data => fetcher.setData(data, setPopularMovie, 'playing movie'))
        fetcher.fetch_top_movie(data => fetcher.setData(data, setTopMovie, 'top movie'))
        fetcher.fetch_trending_tv(data => fetcher.setData(data, setTrendingTv, 'trending tv'))
        fetcher.fetch_popular_tv(data => fetcher.setData(data, setPopularTv, 'popular tv'))
        fetcher.fetch_top_tv(data => fetcher.setData(data, setTopTv, 'top tv'))
    }, [])

    useDidMountEffect(() => {
        setToastShow(true)
        setTimeout(() => {
            setToastShow(false)
        }, 3000)
    }, [toast]);

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
                    <View>

                        <Text style={styles.title}>USC Films</Text>
                        <Text style={styles.subTitle}>{['Trending', 'Now Playing'][currentScreen]}</Text>

                        <View style={styles.wrapper}>
                            <Carousel movies={currentMovie} tvs={trendingTv} currentScreen={currentScreen} />
                        </View>
                        <Text style={styles.subTitle}>Top Rated</Text>
                        <View style={styles.wrapper}>
                            <View style={{ width: '90%' }}>
                                <Slider movies={topMovie} tvs={topTv} currentScreen={currentScreen} />
                            </View>
                        </View>
                        <Text style={styles.subTitle}>Popular</Text>
                        <View style={styles.wrapper}>
                            <View style={{ width: '90%' }}>
                                <Slider movies={popularMovie} tvs={popularTv} currentScreen={currentScreen} />
                            </View>
                        </View>
                        <Text
                            style={{ ...styles.footer, marginTop: 12 }}
                            onPress={() => Linking.openURL('https://www.themoviedb.org/')}
                        >
                            Powered by TMDB
                    </Text>
                        <Text style={{ ...styles.footer, marginBottom: 16 }}>Delivered by Shaw S. Yu</Text>
                    </View>
                    <Toast
                        visible={toastShow}
                        position={Toast.positions.BOTTOM - 100}
                        shadow={false}
                        animation={true}
                        hideOnPress={true}
                        backgroundColor="transparent"
                        opacity={1}
                    >
                        <View style={styles.toastWrapper}>
                            <Text style={styles.toast}>
                                {toast.message}
                            </Text>
                        </View>
                    </Toast>
                </ScrollView>

            </>
        )
    } else {
        return (
            <LoadingSpinner />
        )
    }
}

const styles = {
    theme: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    navTitle: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    wrapper: {
        marginTop: 18,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
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
    footer: {
        textAlign: 'center',
        color: 'gray',
        fontSize: 12
    },
    toastWrapper: {
        backgroundColor: '#8A8A8A',
        padding: 10,
        borderRadius: 32
    },
    toast: {
        color: 'white',
        padding: 10,
        textAlign: 'center'
    }
}