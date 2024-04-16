import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./cartSlice";
import { filterReducer } from "./filterSlice";
import { bookReducer } from "./books.slice";

const reducer = combineReducers({
    cart: cartReducer,
    filter: filterReducer,
    books: bookReducer
});

const bookstore = configureStore({
    reducer,
})

export default bookstore;