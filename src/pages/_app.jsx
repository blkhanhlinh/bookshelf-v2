import '@/styles/globals.css'
import { Provider } from 'react-redux'
import { wrapper } from '@/redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import { Spinner } from '@chakra-ui/react'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import theme from '@/styles/theme'
import { persistedStore } from '@/redux/store'
import { VisibilityProvider } from '@/context/visibility'
import bookshelfColors from '@/styles/colors'
import React, { Suspense } from 'react'
import { SpeedInsights } from '@vercel/speed-insights/next'

export const Loading = () => {
    return (
        <div className='flex min-h-screen flex-col items-center justify-center text-gray-800'>
            <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color={bookshelfColors.primary.main}
                size='xl'
            />
            <p>Loading...</p>
        </div>
    )
}

function App({ Component, pageProps }) {
    const { store, persistor } = persistedStore()

    return (
        <>
            <ChakraProvider theme={extendTheme(theme)}>
                <Provider store={store}>
                    <PersistGate loading={<Loading />} persistor={persistor}>
                        <VisibilityProvider>
                            <Suspense fallback={<Loading />}>
                                <Component {...pageProps} />
                                <SpeedInsights />
                            </Suspense>
                        </VisibilityProvider>
                    </PersistGate>
                </Provider>
            </ChakraProvider>
        </>
    )
}

export default wrapper.withRedux(App)
