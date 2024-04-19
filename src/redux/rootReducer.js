import { combineReducers } from "redux";
import cartReducer from "./cart/cartSlice";
import recommendationReducer from "./recommendation/recommendationSlice";

const rootReducer = combineReducers({
    cart: cartReducer,
    recommendation: recommendationReducer,
});

export default rootReducer;