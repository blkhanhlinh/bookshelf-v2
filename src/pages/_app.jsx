import '@/styles/globals.css'
import { Provider } from 'react-redux'
import { wrapper } from '@/redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import { Spinner } from '@chakra-ui/react'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import theme from '@/styles/theme'
import { persistedStore } from '@/redux/store'
import { VisibilityProvider } from '@/context/visibility'
import React, { Suspense } from 'react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Loading from '@/components/Loading'
import { BooksProvider } from '@/context/getBooks'

function App({ Component, pageProps }) {
    const { store, persistor } = persistedStore()

    return (
        <>
            <ChakraProvider theme={extendTheme(theme)}>
                <Provider store={store}>
                    <PersistGate loading={<Loading />} persistor={persistor}>
                        <VisibilityProvider>
                            <BooksProvider>
                                <Suspense fallback={<Loading />}>
                                    <Component {...pageProps} />
                                    <SpeedInsights />
                                </Suspense>
                            </BooksProvider>
                        </VisibilityProvider>
                    </PersistGate>
                </Provider>
            </ChakraProvider>
        </>
    )
}

export default wrapper.withRedux(App)
