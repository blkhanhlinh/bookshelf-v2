import React, { useState, useEffect, Suspense, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Head from 'next/head'
import {
    Box,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Button,
    Container,
    Flex,
    HStack,
    Heading,
    Image,
    SimpleGrid,
    Spacer,
    Stack,
    Text,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import DesktopLayout from '@/components/Layout/DesktopLayout'
import bookshelfColors from '@/styles/colors'
import { Rating } from '@/components/HomeSlider/BookCard'
import { getBookById, getBookRecommendations, getCategoryList } from '@/api'
import {
    increaseQuantity,
    addSomeToCart,
    addToCart,
} from '@/redux/cart/cartSlice'
import Loading from '@/components/Loading'
import { BooksContext } from '@/context/getBooks'
import { useVisibility } from '@/context/visibility'

const BookCard = React.lazy(() => import('@/components/HomeSlider/BookCard'))
const CardSlider = React.lazy(() =>
    import('@/components/HomeSlider/CardSlider')
)

export async function getServerSideProps({ params }) {
    const bookId = params.id

    try {
        const [book, relatedBooks] = await Promise.all([
            getBookById(bookId).catch(err => {
                console.error('Error fetching book:', err)
                return null
            }),
            getBookRecommendations(bookId).catch(err => {
                console.error('Error fetching related books:', err)
                return []
            }),
        ])

        if (!book) {
            return {
                redirect: {
                    destination: '/error',
                    permanent: false,
                },
            }
        }

        return {
            props: { book, relatedBooks },
        }
    } catch (error) {
        console.error('Error during data fetching:', error)
        return {
            redirect: {
                destination: '/error',
                permanent: false,
            },
        }
    }
}

const BookDetailsPage = ({ book, relatedBooks }) => {
    if (!book || !relatedBooks) {
        return <Loading />
    }
    const router = useRouter()
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart.items)
    const { categoryList } = useContext(BooksContext)
    const { setIsVisible } = useVisibility()

    const [readMore, setReadMore] = useState(false)
    const [quantity, setQuantity] = useState(1)

    const randomNumber = Math.floor(Math.random() * 1000)

    const toggleDescription = () => {
        setReadMore(!readMore)
    }

    const getShortDescription = description => {
        return description.length > 472
            ? description.slice(0, 472) + '...'
            : description
    }

    const {
        title,
        authors,
        thumbnail,
        description,
        published_year,
        price,
        categories,
        num_pages,
    } = book

    const Quantity = () => {
        const add = () => setQuantity(quantity + 1)
        const minus = () => quantity > 1 && setQuantity(quantity - 1)

        return (
            <Flex className='flex flex-row justify-center items-center'>
                <Button onClick={minus}>-</Button>
                <Text className='text-regular-bold w-10 text-center'>
                    {quantity}
                </Text>
                <Button onClick={add}>+</Button>
            </Flex>
        )
    }

    const addToCartHandler = () => {
        const bookInCart = cart.find(item => item.book_id === book.book_id)
        if (bookInCart) {
            dispatch(increaseQuantity(book.book_id))
        } else {
            dispatch(addSomeToCart({ ...book, quantity }))
        }
    }

    const addAllToCartHandler = () => {
        frequentBooks.forEach(book => {
            const bookInCart = cart.find(item => item.book_id === book.book_id)
            setIsVisible(true)
            if (bookInCart) {
                dispatch(increaseQuantity(book.book_id))
            } else {
                dispatch(addToCart(book))
            }
        })
    }

    const [frequentBooks, setFrequentBooks] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)

    useEffect(() => {
        // get 2 first
        if (relatedBooks.length > 2) {
            setFrequentBooks([book, ...relatedBooks.slice(0, 2)])
        } else {
            setFrequentBooks([book, ...relatedBooks])
        }
    }, [relatedBooks])

    useEffect(() => {
        let total = 0
        frequentBooks.forEach(book => {
            total += book.price
        })
        setTotalPrice(total)
    }, [frequentBooks])

    return (
        <DesktopLayout isHomepage={false} categoryList={categoryList}>
            <Head>
                <title>{title} - Bookshelf</title>
            </Head>
            <Breadcrumb pt='4'>
                <BreadcrumbItem>
                    <BreadcrumbLink href='/'>Home</BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbItem>
                    <BreadcrumbLink href='/all-categories'>
                        All Categories
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem>
                    <BreadcrumbLink href={`/all-categories/${categories}`}>
                        {categories}
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem
                    isCurrentPage
                    color={bookshelfColors.primary.main}
                >
                    <BreadcrumbLink href='#'>{title}</BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumb>
            <HStack mt='10' spacing='16' alignItems='flex-start'>
                <Flex>
                    <Image
                        src={thumbnail}
                        alt={title}
                        height={'394px'}
                        rounded={'md'}
                        align={'center'}
                    />
                </Flex>
                <Stack spacing={{ base: 4, md: 6 }}>
                    <Text className='text-3xl font-bold'>{title}</Text>
                    <HStack>
                        <Text className='text-large-bold'>Author: </Text>
                        <Text className='text-large-bold text-primary-main'>
                            {authors}
                        </Text>
                    </HStack>
                    <Rating
                        rating={book.average_rating}
                        numReviews={randomNumber}
                    />
                    <Text className='font-bold text-2xl text-primary-main'>
                        ${price}
                    </Text>
                    <HStack>
                        <Text className='text-large-bold'>Quantity: </Text>
                        <Quantity />
                    </HStack>
                    <Button
                        w='168px'
                        h={12}
                        color='white'
                        bgColor={bookshelfColors.primary.main}
                        _hover={{ bgColor: bookshelfColors.primary.dark }}
                        onClick={addToCartHandler}
                    >
                        Add to Cart
                        <span className='pl-2'>
                            <svg
                                width='19'
                                height='18'
                                viewBox='0 0 19 18'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                                stroke='white'
                            >
                                <path
                                    d='M15.838 6H4.10865C3.64519 6 3.29266 6.41615 3.36885 6.8733L4.61885 14.3733C4.67912 14.7349 4.99202 15 5.35865 15H14.588C14.9546 15 15.2675 14.7349 15.3277 14.3733L16.5777 6.8733C16.6539 6.41615 16.3014 6 15.838 6Z'
                                    strokeWidth='1.5'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                />
                                <path
                                    d='M6.97333 6C6.97333 4.34315 8.31647 3 9.97333 3C11.6302 3 12.9733 4.34315 12.9733 6'
                                    strokeWidth='1.5'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                />
                            </svg>
                        </span>
                    </Button>
                </Stack>
            </HStack>
            <Box
                my={8}
                px={6}
                py={8}
                bgColor={'white'}
                display={'flex'}
                gap={2}
                flexDirection={'column'}
            >
                <Flex className='w-1/2 font-semibold text-lg'>
                    <Text flex={1}>Category</Text>
                    <Text
                        className='text-primary-main cursor-pointer'
                        flex={1}
                        onClick={() =>
                            router.push(`/all-categories/${categories}`)
                        }
                    >
                        {categories}
                    </Text>
                </Flex>
                <Flex className='w-1/2 font-semibold text-lg'>
                    <Text flex={1}>Published year</Text>
                    <Text className='text-primary-dark' flex={1}>
                        {published_year}
                    </Text>
                </Flex>
                <Flex className='w-1/2 font-semibold text-lg'>
                    <Text flex={1}>Number of pages</Text>
                    <Text className='text-primary-dark' flex={1}>
                        {num_pages}
                    </Text>
                </Flex>
                <Box mt={2}>
                    <Text fontSize='2xl' fontWeight='bold'>
                        Description
                    </Text>
                    <Stack spacing={4} className='text-medium-regular'>
                        <Text pt={2}>
                            {readMore
                                ? description
                                : getShortDescription(description)}
                        </Text>
                        {description.length > 472 && (
                            <Text
                                onClick={toggleDescription}
                                className='w-full flex justify-center cursor-pointer'
                            >
                                {readMore ? (
                                    <span className='text-secondary-main flex flex-row'>
                                        Read less
                                        <svg
                                            width='24'
                                            height='24'
                                            viewBox='0 0 24 24'
                                            fill='none'
                                            xmlns='http://www.w3.org/2000/svg'
                                        >
                                            <path
                                                d='M8 14L12 10L16 14'
                                                stroke='#FF9C28'
                                                strokeWidth='2'
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                            />
                                        </svg>
                                    </span>
                                ) : (
                                    <span className='text-secondary-main flex flex-row'>
                                        Read more
                                        <svg
                                            width='24'
                                            height='24'
                                            viewBox='0 0 24 24'
                                            fill='none'
                                            xmlns='http://www.w3.org/2000/svg'
                                        >
                                            <path
                                                d='M16 10L12 14L8 10'
                                                stroke='#FF9C28'
                                                strokeWidth='2'
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                            />
                                        </svg>
                                    </span>
                                )}
                            </Text>
                        )}
                    </Stack>
                </Box>
            </Box>
            {frequentBooks.length > 1 && (
                <Box>
                    <Flex justifyContent={'space-between'} paddingBottom={2}>
                        <Text fontWeight={'700'} fontSize={'2xl'}>
                            Frequently bought together
                        </Text>
                    </Flex>
                    <Box>
                        <Flex
                            justifyContent={'space-between'}
                            alignItems={'center'}
                        >
                            {frequentBooks.map((book, index) => (
                                <>
                                    <Suspense fallback={<Loading />}>
                                        <BookCard
                                            book={book}
                                            isHomepage={false}
                                            setStars={false}
                                        />
                                        {index !== frequentBooks.length - 1 && (
                                            <span className='text-2xl font-bold p-4'>
                                                +
                                            </span>
                                        )}
                                    </Suspense>
                                </>
                            ))}
                            <Flex ml={16} flexDir={'column'} gap={4}>
                                <Text fontSize={'lg'}>
                                    Total price:{' '}
                                    <span className='text-2xl font-bold'>
                                        ${totalPrice}
                                    </span>
                                </Text>
                                <Button
                                    w='180px'
                                    h={12}
                                    color='white'
                                    bgColor={bookshelfColors.primary.main}
                                    _hover={{
                                        bgColor: bookshelfColors.primary.dark,
                                    }}
                                    onClick={addAllToCartHandler}
                                >
                                    Add all {frequentBooks.length} to Cart
                                    <span className='pl-2'>
                                        <svg
                                            width='19'
                                            height='18'
                                            viewBox='0 0 19 18'
                                            fill='none'
                                            xmlns='http://www.w3.org/2000/svg'
                                            stroke='white'
                                        >
                                            <path
                                                d='M15.838 6H4.10865C3.64519 6 3.29266 6.41615 3.36885 6.8733L4.61885 14.3733C4.67912 14.7349 4.99202 15 5.35865 15H14.588C14.9546 15 15.2675 14.7349 15.3277 14.3733L16.5777 6.8733C16.6539 6.41615 16.3014 6 15.838 6Z'
                                                strokeWidth='1.5'
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                            />
                                            <path
                                                d='M6.97333 6C6.97333 4.34315 8.31647 3 9.97333 3C11.6302 3 12.9733 4.34315 12.9733 6'
                                                strokeWidth='1.5'
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                            />
                                        </svg>
                                    </span>
                                </Button>
                            </Flex>
                        </Flex>
                    </Box>
                </Box>
            )}
            {relatedBooks.length > 0 ? (
                <Box paddingBottom={'104px'} mt={4}>
                    <Flex justifyContent={'space-between'} paddingBottom={2}>
                        <Text fontWeight={'700'} fontSize={'2xl'}>
                            Customers who bought this item also bought
                        </Text>
                    </Flex>
                    <CardSlider books={relatedBooks} />
                </Box>
            ) : (
                <Loading isScreen={false} />
            )}
        </DesktopLayout>
    )
}

export default BookDetailsPage
