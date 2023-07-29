export const getFromStorage = (key: string) => {
    if (typeof window !== 'undefined') {
        return window.localStorage.getItem(key);
    }
}

export const setStorage = (key: string, value: string) => {
    if (typeof window !== 'undefined') {
        return window.localStorage.setItem(key, value);
    }
}

export const removeFromStorage = (key: string) => {
    if (typeof window !== 'undefined') {
        return window.localStorage.removeItem(key);
    }
}