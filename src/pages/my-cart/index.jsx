import Head from 'next/head'
import DesktopLayout from '@/components/Layout/DesktopLayout'
import { useRouter } from 'next/router'
import { Flex, Box, Text } from "@chakra-ui/react"
import bookshelfColors from '@/styles/colors'
import CartList from '@/components/Cart/CartList'
import { useSelector } from 'react-redux'
import { CardSlider } from '@/components/HomeSlider'
import { getCategoryList } from '@/api'

export async function getServerSideProps() {
	let category_list = [];
	try {
		category_list = await getCategoryList();
	} catch (error) {
		console.log('Error fetching category list', error);
	}
	return {
		props: {
			category_list,
		}
	}
}

const MyCart = ({ category_list }) => {
	const recommendedBooks = useSelector(state => state.recommendation.books)

	return (
		<>
			<Head>
				<meta charSet='utf-8' />
				<meta
					name='viewport'
					content='initial-scale=1.0, width=device-width'
				/>
				<link rel='icon' type='image/svg+xml' href='/favicon.svg' />
				<title>My Cart</title>
			</Head>
			<DesktopLayout isHomepage={false} category_list={category_list}>
				<Flex minW="max-content">
					<CartList />
				</Flex>
				{recommendedBooks.length > 0 &&
					<Box paddingBottom={'96px'}>
						<Flex justifyContent={'space-between'} paddingBottom={4}>
							<Text fontWeight={'700'} fontSize={'3xl'}>
								Customers also bought
							</Text>
						</Flex>
						<CardSlider books={recommendedBooks} />
					</Box>
				}
			</DesktopLayout>
		</>
	)
}



export default MyCart;
