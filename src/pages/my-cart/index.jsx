import Head from 'next/head'
import DesktopLayout from '@/components/Layout/DesktopLayout'
import { useRouter } from 'next/router'
import { Flex, Box, Text } from '@chakra-ui/react'
import bookshelfColors from '@/styles/colors'
import CartList from '@/components/Cart/CartList'
import { useSelector } from 'react-redux'
import { CardSlider } from '@/components/HomeSlider'
import { useContext } from 'react'
import { BooksContext } from '@/context/getBooks'
import Loading from '@/components/Loading'

const MyCart = () => {
    const recommendedBooks = useSelector(state => state.recommendation.books)
    const { categoryList } = useContext(BooksContext)

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
            <DesktopLayout isHomepage={false} categoryList={categoryList}>
                <Flex minW='max-content'>
                    <CartList />
                </Flex>
                {recommendedBooks.length > 0 ? (
                    <Box paddingBottom={'96px'}>
                        <Flex
                            justifyContent={'space-between'}
                            paddingBottom={4}
                        >
                            <Text fontWeight={'700'} fontSize={'3xl'}>
                                Customers also bought
                            </Text>
                        </Flex>
                        <CardSlider books={recommendedBooks} />
                    </Box>
                ) : (
                    <Loading isScreen={false} />
                )}
            </DesktopLayout>
        </>
    )
}

export default MyCart
