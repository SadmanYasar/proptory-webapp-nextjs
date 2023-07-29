import { removeFromStorage } from '@/utils/storage';
import { Queries } from '@/utils/types';
import { State, Notification, SearchQueries } from './state'

// type Notification = Pick<State, 'message' | 'type'>
// type Search = Pick<State, 'searchVal'>

export type Price = {
    minPrice: number,
    maxPrice: number
}

export type Action =
    | {
        type: 'SET_NOTIFICATION';
        payload: Notification;
    }
    | {
        type: 'REMOVE_NOTIFICATION';
    }
    | {
        type: 'SET_SEARCH';
        payload: string;
    }
    | {
        type: 'LOGIN';
    }
    | {
        type: 'LOGOUT';
    }
    | {
        type: 'SET_QUERY',
        payload: SearchQueries
    }
    | {
        type: 'SET_PRICE',
        payload: Price
    }

export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return {
                ...state,
                notification: { ...action.payload }
            }

        case 'REMOVE_NOTIFICATION':
            return {
                ...state,
                notification: { message: '', type: 'success' }
            }

        case 'SET_SEARCH':
            return {
                ...state,
                query: {
                    ...state.query,
                    searchVal: action.payload
                }
            }

        case 'SET_QUERY':
            return {
                ...state,
                query: { ...action.payload }
            }

        case 'SET_PRICE':
            return {
                ...state,
                query: {
                    ...state.query,
                    ...action.payload
                }
            }

        case 'LOGIN':
            return {
                ...state,
                loggedIn: true
            }

        case 'LOGOUT':
            return {
                ...state,
                loggedIn: false
            }

        default:
            return state
    }
}

export const setNotification = (data: Notification): Action => {
    return {
        type: 'SET_NOTIFICATION',
        payload: data,
    }
}

export const removeNotification = (): Action => {
    return {
        type: 'REMOVE_NOTIFICATION',
    }
}

export const setSearch = (data: string): Action => {
    return {
        type: 'SET_SEARCH',
        payload: data,
    }
}

export const setQuery = (data: SearchQueries): Action => {
    return {
        type: 'SET_QUERY',
        payload: data,
    }
}

export const setPrice = (data: Price): Action => {
    return {
        type: 'SET_PRICE',
        payload: data,
    }
}

export const login = (): Action => {
    return {
        type: 'LOGIN',
    }
}

export const logout = (): Action => {
    removeFromStorage('proptory-token');
    removeFromStorage('proptory-user');
    return {
        type: 'LOGOUT',
    }
}