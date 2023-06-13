import bookstore from '@/redux/bookstore'
import '@/styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'react-redux'
import { wrapper } from '@/redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import { Spinner } from '@chakra-ui/react'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'


function App({ Component, pageProps }) {
	const { store } = wrapper.useWrappedStore(pageProps)
	const persistor = persistStore(store)

	const theme = extendTheme({
		fonts: {
			heading: 'Nunito Sans',
			body: 'Nunito Sans',
		},
	})

	const Loading = () => {
		return (
			<div className='flex min-h-screen flex-col items-center justify-center text-gray-800'>
				<Spinner />
				<p>Loading...</p>
			</div>
		)
	}

	return (
		<ChakraProvider theme={theme}>
			<Provider store={store}>
				<PersistGate persistor={persistor} loading={<Loading />}>
					<Component {...pageProps} />
				</PersistGate>
			</Provider>
		</ChakraProvider>
	)
}

export default App