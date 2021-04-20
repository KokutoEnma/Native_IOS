import React, { useLayoutEffect, useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { SearchBar } from 'react-native-elements';
import { useDebounce } from 'use-debounce';
import fetcher from '../../utils/fetcher'
import SearchResItem from './SearchResItem'

export default function Screen() {

    const [searchText, setSearchText] = useState('')
    const [queryResult, setQueryResult] = useState([])
    const navigation = useNavigation()

    const [queryText] = useDebounce(searchText, 1000)

    useEffect(() => {
        if (queryText.length >= 3)
            fetcher.fetch_search_multi(queryText, data => fetcher.setData(data, setQueryResult, 'multi search'))
    }, [queryText])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => null
        })
    })
    return (
        <ScrollView style={styles.wrapper}>

            <Text style={styles.title}>Search</Text>
            <View style={styles.searchWrapper}>
                <SearchBar
                    platform={'ios'}
                    inputContainerStyle={styles.searchBox}
                    containerStyle={styles.searchContainer}
                    inputStyle={styles.searchBox}
                    placeholder="Search Movies, TVs..."
                    onChangeText={e => {
                        setSearchText(e)
                    }}
                    value={searchText}
                />

            </View>
            <View style={styles.resBox}>
                {
                    searchText.length < 3 ? null :
                        queryResult.length === 0 ?
                            <Text style={styles.emptyRes}>No Results</Text> :
                            queryResult.map((item, index) => (
                                <SearchResItem
                                    item={item}
                                    key={index}
                                />
                            ))
                }
            </View>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    wrapper: {
        padding: '1%',
        paddingTop: 36,
        // backgroundColor: 'red'
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        paddingBottom: 24,
        paddingLeft: 16
    },
    searchWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        // backgroundColor: 'red',
        // height: 36
    },
    searchBtn: {
        paddingTop: 0
    },
    searchBox: {
        backgroundColor: '#EEEEEE',
        height: 36,
        borderRadius: 8
    },
    searchContainer: {
        backgroundColor: 'transparent',
        padding: 0,
        height: 36
    },
    resBox: {
        paddingTop: 8,
        paddingBottom: 64,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    emptyRes: {
        paddingTop: 36,
        fontSize: 28,
        color: 'gray'
    }
})