import { ADD_ITEM, CHANGE_TOAST_MESSAGE, CHANGE_TOAST_STATUS, REMOVE_ITEM } from './actions'

const initialState = {
    items: [],
    toast: {
        message: '',
    }
}

export default function reducer(state = initialState, { type, payload }) {
    if (type === ADD_ITEM) {
        const id = payload.id;
        if (state.items.filter(e => e.id === id).length > 0) return { ...state }
        return {
            ...state,
            items: [...state.items, payload]
        }
    } else if (type === REMOVE_ITEM) {
        let items = []
        state.items.forEach(e => { if (e.id !== payload) items.push(e) })
        return {
            ...state,
            items
        }
    } else if (type === CHANGE_TOAST_MESSAGE) {
        return {
            ...state,
            toast: { ...state.toast, message: payload }
        }
    }
    else {
        return { ...state }
    }
}


export const addItemHandler = item => ({
    type: ADD_ITEM,
    payload: item
})

export const removeItemHandler = id => ({
    type: REMOVE_ITEM,
    payload: id
})

export const changeToastMessageHandler = message => ({
    type: CHANGE_TOAST_MESSAGE,
    payload: message
})