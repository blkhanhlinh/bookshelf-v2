import { createSlice } from '@reduxjs/toolkit'
import { parse } from 'cookie'

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalQuantity: 0,
        totalAmount: 0,
        loading: false,
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        addToCart: (state, action) => {
            state.loading = false
            const newItem = action.payload
            const existingItem = state.items.find(
                item => item.book_id === newItem.book_id
            )
            state.totalQuantity++
            state.totalAmount = parseFloat(
                (state.totalAmount + newItem.price).toFixed(2)
            )
            if (!existingItem) {
                state.items.push({
                    ...newItem,
                    quantity: 1,
                    totalPrice: newItem.price,
                })
            } else {
                existingItem.quantity++
                existingItem.totalPrice += newItem.price
            }
        },
        addSomeToCart: (state, action) => {
            state.loading = false
            const newItem = action.payload
            const existingItem = state.items.find(
                item => item.book_id === newItem.book_id
            )
            if (!existingItem) {
                state.items.push({
                    ...newItem,
                    totalPrice: parseFloat(
                        (newItem.price * newItem.quantity).toFixed(2)
                    ),
                })
            } else {
                existingItem.quantity += newItem.quantity
                existingItem.totalPrice = parseFloat(
                    (existingItem.totalPrice + newItem.price * newItem.quantity).toFixed(2)
                )
            }
            state.totalQuantity += newItem.quantity
            state.totalAmount += newItem.price * newItem.quantity
            state.totalAmount = parseFloat(state.totalAmount.toFixed(2))
        },
        increaseQuantity: (state, action) => {
            const id = action.payload
            const existingItem = state.items.find(item => item.book_id === id)
            state.totalQuantity++
            state.totalAmount = parseFloat(
                (state.totalAmount + existingItem.price).toFixed(2)
            )
            existingItem.quantity++
            existingItem.totalPrice = parseFloat(
                (existingItem.totalPrice + existingItem.price).toFixed(2)
            )
        },
        decreseQuantity: (state, action) => {
            const id = action.payload
            const existingItem = state.items.find(item => item.book_id === id)
            state.totalQuantity--
            state.totalAmount = parseFloat(
                (state.totalAmount - existingItem.price).toFixed(2)
            )
            existingItem.quantity--
            existingItem.totalPrice = parseFloat(
                (existingItem.totalPrice - existingItem.price).toFixed(2)
            )
            if (existingItem.quantity === 0) {
                state.items = state.items.filter(item => item.book_id !== id)
            }
        },
        removeFromCart: (state, action) => {
            const id = action.payload
            const existingItem = state.items.find(item => item.book_id === id)
            if (existingItem) {
                state.totalQuantity -= existingItem.quantity
                state.totalAmount = parseFloat(
                    (state.totalAmount - existingItem.totalPrice).toFixed(2)
                )
                state.items = state.items.filter(item => item.book_id !== id)
            }
        },
    },
})

export const {
    setLoading,
    addToCart,
    addSomeToCart,
    increaseQuantity,
    decreseQuantity,
    removeFromCart,
} = cartSlice.actions

export default cartSlice.reducer
