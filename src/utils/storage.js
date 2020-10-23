// import {
//     iterator
// } from "core-js/fn/symbol"

// 本地存储
export const getItem = name => {
    const data = window.localStorage.getItem(name)
    try {
        return JSON.parse(data)
    } catch (error) {
        return data
    }
}

export const removeItem = name => {
    return window.localStorage.removeItem(name)
}

export const setItem = (name, value) => {
    if (typeof value === 'object') {
        value = JSON.stringify(value)
    }
    window.localStorage.setItem(name, value)
}