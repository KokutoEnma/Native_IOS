import React from 'react'
import { Linking } from 'react-native'
import { ContextMenuView } from "react-native-ios-context-menu";


export default function ContextMenu({ children, item }) {

    return (
        <ContextMenuView
            onPressMenuItem={({ nativeEvent }) => {
                if (nativeEvent.actionKey === 'action-fb') Linking.openURL(`https://www.facebook.com/sharer/sharer.php?u=https://www.themoviedb.org/${item.type}/${item.id}`)
                else if (nativeEvent.actionKey === 'action-tw') Linking.openURL(`https://twitter.com/intent/tweet?text=Check out this link&url=https://www.themoviedb.org/${item.type}/${item.id}&hashtags=CSCI571USCFilms `)
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