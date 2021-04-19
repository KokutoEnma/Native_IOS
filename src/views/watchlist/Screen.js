import React, { useLayoutEffect, useState, useEffect } from 'react'
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import WatchlistItem from './WatchlistItem'
import { useHeaderHeight } from '@react-navigation/stack'
import DraggableFlatList from "react-native-draggable-flatlist";


const width = Dimensions.get('window').width
const imgWidth = width * 0.3
const imgHeight = width * 0.45
const xPadding = 12
const xOffset = (width - imgWidth * 3 - xPadding * 2) / 6
const yOffset = 2

export default function Screen() {
    const navigation = useNavigation()


    const items = useSelector(state => state.items)
    const [selectedIndex, setSelectedIndex] = useState(-1)
    const [iniMovingPos, setInitMovingPos] = useState({ x: 0, y: 0 })
    const [movingDis, setMovingDis] = useState({ x: 0, y: 0 })

    const [dragging, setDragging] = useState(false)
    const [boxDim, setBoxDim] = useState({ x: 0, y: 0, width: 0, height: 0 })
    const headerHight = useHeaderHeight()

    let boxRef;

    const [posIndex, setPosIndex] = useState([])
    const getOriginalPos = () => {
        let ans = {}
        items.forEach((e, i) => {
            ans[e.id] = i
        });
        return ans
    }

    const getPosByIndex = i => {
        const i_row = i % 3;
        const i_col = Math.floor(i / 3);
        const x = i_row * xOffset + i_row * imgWidth
        const y = i_col * yOffset + i_col * imgHeight
        return {
            refx: x,
            refy: y,
            px: boxDim.x + x,
            py: boxDim.y + y + headerHight
        }
    }
    const getIndexFromPos = ({ x, y }) => {
        const pos = [...Array(items.length)].map((p, i) => getPosByIndex(i))
        for (let i = 0; i < pos.length; i++) {
            if (x > pos[i].px && x < pos[i].px + imgWidth && y > pos[i].py && y < pos[i].py + imgHeight)
                return i
        }
        return -1
    }

    useEffect(() => {
        setPosIndex({ ...getOriginalPos() })
    }, [items])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => null
        })
    })
    if (items.length < 1)
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'gray', fontSize: 26 }}>Watchlist is Empty</Text>
            </View >
        )
    return (
        <ScrollView scrollEnabled={!dragging}>
            <View style={styles.wrapper}>
                <Text style={styles.title}>Watchlist</Text>
                <View
                    style={styles.itemBox}
                    ref={r => boxRef = r}
                    onLayout={() => {
                        boxRef.measure((px, py, width, height) => {
                            setBoxDim({ x: px, y: py, width, height })
                        })
                    }}
                    onTouchStart={e => {
                        const { pageX, pageY } = e.nativeEvent
                        const pos = { x: pageX, y: pageY }
                        setInitMovingPos(pos)
                        setSelectedIndex(getIndexFromPos(pos))
                    }}
                    onTouchMove={e => {
                        const { pageX, pageY } = e.nativeEvent
                        const { x, y } = iniMovingPos
                        setMovingDis({ x: pageX - x, y: pageY - y })

                        const targetIndex = getIndexFromPos({ x: pageX, y: pageY })
                        if (targetIndex !== -1) {
                            let temp = { ...getOriginalPos() }
                            for (let id in getOriginalPos()) {
                                if (selectedIndex < targetIndex && getOriginalPos()[id] <= targetIndex && getOriginalPos()[id] > selectedIndex) {
                                    d = getOriginalPos()[id] - selectedIndex - 1
                                    temp[id] = selectedIndex + d
                                }
                                else if (selectedIndex > targetIndex && getOriginalPos()[id] >= targetIndex && getOriginalPos()[id] < selectedIndex) {
                                    d = selectedIndex - getOriginalPos()[id] - 1
                                    temp[id] = selectedIndex - d
                                }
                            }
                            if (JSON.stringify(temp) !== JSON.stringify(posIndex))
                                setPosIndex({ ...temp })
                        }
                    }}
                    onTouchEnd={e => {
                        setSelectedIndex(-1)
                        setMovingDis({ x: 0, y: 0 })
                        setInitMovingPos({ x: 0, y: 0 })
                        setPosIndex({ ...getOriginalPos() })
                    }}
                >

                    {
                        items.map((item, index) => (
                            <WatchlistItem
                                key={index}
                                index={index}
                                setDragging={setDragging}
                                posIndex={posIndex}
                                getPosByIndex={getPosByIndex}
                                selectedIndex={selectedIndex}
                                movingDis={movingDis}
                            />
                        ))
                    }
                </View>
            </View>
        </ScrollView>
    )
}


const styles = StyleSheet.create({

    wrapper: {
        padding: '4%'
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold'
    },
    itemBox: {
        // width: '',
    }
})