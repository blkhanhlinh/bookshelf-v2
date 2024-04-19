import { createSlice } from '@reduxjs/toolkit';

export const recommendationSlice = createSlice({
    name: 'recommendation',
    initialState: {
        books: [],
    },
    reducers: {
        setRecommendations: (state, action) => {
            state.books = action.payload;
        },
        clearRecommendations: (state) => {
            state.books = [];
        },
    },
});

export const { setRecommendations, clearRecommendations } = recommendationSlice.actions;

export default recommendationSlice.reducer;