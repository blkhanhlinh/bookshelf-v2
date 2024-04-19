import '@/styles/globals.css'
import { Provider } from 'react-redux'
import { wrapper } from '@/redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import { Spinner } from '@chakra-ui/react'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import theme from '@/styles/theme'
import { persistedStore } from '@/redux/store'
import { VisibilityProvider } from '@/context/visibility'

function App({ Component, pageProps }) {
	const Loading = () => {
		return (
			<div className='flex min-h-screen flex-col items-center justify-center text-gray-800'>
				<Spinner />
				<p>Loading...</p>
			</div>
		)
	}

	const { store, persistor } = persistedStore()

	return (
		<ChakraProvider theme={theme}>
			<Provider store={store}>
				<PersistGate loading={<Loading />} persistor={persistor}>
					<VisibilityProvider>
						<Component {...pageProps} />
					</VisibilityProvider>
				</PersistGate>
			</Provider>
		</ChakraProvider>
	)
}

export default App