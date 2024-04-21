import useBestSellers from '@/hooks/useBestSellers'
import useNewArrivals from '@/hooks/useNewArrivals'
import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
    name: 'filters',
    initialState: {
        books: [],
        searchResults: [],
        priceRange: '',
    },
    reducers: {
        setBooks: (state, action) => {
            state.books = action.payload
        },
        sortBooksAsc: (state, action) => {
            const sortAsc = action.payload.sort((a, b) =>
                a.title < b.title ? 1 : a.title > b.title ? -1 : 0
            )
            state.books = sortAsc
        },
        sortBooksDesc: (state, action) => {
            const sortAsc = action.payload.sort((a, b) =>
                a.title < b.title ? -1 : a.title > b.title ? 1 : 0
            )
            state.books = sortAsc
        },
        setPriceRange: (state, action) => {
            state.priceRange = action.payload
        },
        resetSort: state => {
            state.books = []
        },
        resetFilters: state => {
            state.books = []
            state.priceRange = ''
        },
    },
})

export const {
    setPriceRange,
    resetFilters,
    sortBooksAsc,
    sortBooksDesc,
    resetSort,
} = filterSlice.actions

export const filterReducer = filterSlice.reducer
