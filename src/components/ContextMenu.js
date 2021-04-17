import React from 'react'
import { Linking } from 'react-native'
import { ContextMenuView } from "react-native-ios-context-menu";


import urls from '../utils/urls'

export default function ContextMenu({ children, item }) {

    return (
        <ContextMenuView
            onPressMenuItem={({ nativeEvent }) => {
                if (nativeEvent.actionKey === 'action-fb') Linking.openURL(urls.facebook(item.type, item.id))
                else if (nativeEvent.actionKey === 'action-tw') Linking.openURL(urls.twitter(item.type, item.id))
            }}
            menuConfig={{
                menuTitle: '',
                menuItems: [
                    {
                        actionKey: 'action-1',
                        actionTitle: 'Remove from watchlist',
                        icon: {
                            iconType: 'SYSTEM',
                            iconValue: 'bookmark.fill'
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
    )
}