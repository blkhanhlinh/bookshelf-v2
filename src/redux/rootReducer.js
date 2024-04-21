import { combineReducers } from 'redux'
import cartReducer from './cart/cartSlice'
import recommendationReducer from './recommendation/recommendationSlice'
import { filterReducer } from './filter/filterSlice'

const rootReducer = combineReducers({
    cart: cartReducer,
    recommendation: recommendationReducer,
    filters: filterReducer,
})

export default rootReducer
