import React from 'react'
import { Linking } from 'react-native'
import { ContextMenuView } from "react-native-ios-context-menu";
import { useSelector, useDispatch } from 'react-redux'




import urls from '../utils/urls'
import { addItemHandler, removeItemHandler, changeToastMessageHandler } from '../store/reducer'



export default function ContextMenu({ children, item }) {

    const dispatch = useDispatch()
    const addItem = item => dispatch(addItemHandler(item))
    const removeItem = id => dispatch(removeItemHandler(id))
    const changeToastMessage = message => dispatch(changeToastMessageHandler(message))
    const items = useSelector(state => state.items)
    const exist = items.filter(e => e.id === item.id).length > 0;
    return (
        <>
            <ContextMenuView
                onPressMenuItem={({ nativeEvent }) => {
                    if (nativeEvent.actionKey === 'action-fb') Linking.openURL(urls.facebook(item.type, item.id))
                    else if (nativeEvent.actionKey === 'action-tw') Linking.openURL(urls.twitter(item.type, item.id))
                    else if (nativeEvent.actionKey === 'action-add') {
                        addItem(item)
                        changeToastMessage(`${item.title} was added to Watchlist`)
                        // console.log(this.toast)
                    }
                    else if (nativeEvent.actionKey === 'action-rm') {
                        removeItem(item.id)
                        changeToastMessage(`${item.title} was removed to Watchlist`)
                    }
                }}
                menuConfig={{
                    menuTitle: '',
                    menuItems: [
                        {
                            actionKey: exist ? 'action-rm' : 'action-add',
                            actionTitle: exist ? 'Remove from watchlist' : 'Add to watchList',
                            icon: {
                                iconType: 'SYSTEM',
                                iconValue: exist ? 'bookmark.fill' : 'bookmark'
                            }

                        },
                        {
                            actionKey: 'action-fb',
                            actionTitle: 'Share on Facebook',
                            icon: {
                                iconType: 'ASSET',
                                iconValue: 'facebook'
                            }
                        },
                        {
                            actionKey: 'action-tw',
                            actionTitle: 'Share on Twitter',
                            icon: {
                                iconType: 'ASSET',
                                iconValue: 'twitter'
                            }
                        }
                    ]
                }}
            >
                {children}

            </ContextMenuView >
        </>
    )
}