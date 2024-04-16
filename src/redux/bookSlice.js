import { createSlice } from '@reduxjs/toolkit';

export const bookSlice = createSlice({
    name: 'book',
    initialState: {
        books: [],
        searchResults: [],
        page: 1,
        loading: false,
        error: null,
    },
    reducers: {
        fetchBookRequest: (state) => {
            state.loading = true;
        },
        fetchBookSuccess: (state, action) => {
            state.loading = false;
            state.books = action.payload.data;
            state.searchResults = action.payload.data;
        },
        fetchBookFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        sortBooksAsc: {
            reducer: (state, action) => {
                const sortAsc = action.payload.sort((a, b) => (a.title < b.title ? 1 : a.title > b.title ? -1 : 0));
                state.books = sortAsc;
            },
            prepare: (payload) => {
                return { payload };
            },
        },
        sortBooksDesc: {
            reducer: (state, action) => {
                const sortDesc = [...action.payload].sort((a, b) =>
                    a.title > b.title ? -1 : a.title < b.title ? 1 : 0
                );
                state.books = sortDesc;
            },
            prepare: (payload) => {
                return { payload };
            },
        },
        searchBooks: (state, action) => {
            state.books = action.payload;
            state.page = 1;
        },
        resetSort: (state) => {
            state.books = state.searchResults;
        },
    },
})

export const { fetchBookRequest, fetchBookSuccess, fetchBookFailed, sortBooksAsc, sortBooksDesc, searchBooks, resetSort } = bookSlice.actions

export const bookReducer = bookSlice.reducer