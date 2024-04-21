import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import rootReducer from './rootReducer'
import storage from 'redux-persist/lib/storage'
import { createWrapper } from 'next-redux-wrapper'

export const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const makeStore = () => configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
        devTools: process.env.NODE_ENV !== 'production',
    }),
})

export const persistedStore = () => {
    const store = makeStore()
    const persistor = persistStore(store)
    return { store, persistor }
}

export const wrapper = createWrapper(makeStore, { debug: true })
