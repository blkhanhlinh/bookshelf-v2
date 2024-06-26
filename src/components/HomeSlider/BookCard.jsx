import {
    Card,
    Button,
    Flex,
    Heading,
    Image,
    HStack,
    Stack,
    Text,
    Box,
    Center,
} from '@chakra-ui/react'
import React, { useEffect, useState, useContext } from 'react'
import bookshelfColors from '@/styles/colors'
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs'
import { useDispatch } from 'react-redux'
import { addToCart } from '@/redux/cart/cartSlice'
import Link from 'next/link'
import { useVisibility } from '@/context/visibility'

const CartButton = ({ book }) => {
    const [isHover, setIsHover] = useState(false)
    const { setIsVisible } = useVisibility()
    const dispatch = useDispatch()

    const handleClick = () => {
        dispatch(addToCart(book))
        setIsVisible(true)
    }

    return (
        <Box alignSelf={'center'}>
            <Button
                background={'none'}
                border={`1px solid ${bookshelfColors.primary.main}`}
                color={bookshelfColors.info}
                _hover={{
                    background: bookshelfColors.primary.main,
                    color: bookshelfColors.white,
                }}
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
                onClick={handleClick}
            >
                <Box display={'flex'} px={8}>
                    <svg
                        width='19'
                        height='18'
                        viewBox='0 0 19 18'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                        stroke={
                            isHover
                                ? bookshelfColors.white
                                : bookshelfColors.primary.main
                        }
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
                    <Box as='span' marginLeft={1}>
                        Add to cart
                    </Box>
                </Box>
            </Button>
        </Box>
    )
}

export const Rating = ({ rating, numReviews }) => {
    return (
        <Flex alignItems='center'>
            {Array(5)
                .fill('')
                .map((_, i) => {
                    const roundedRating = Math.round(rating * 2) / 2
                    if (roundedRating - i >= 1) {
                        return (
                            <BsStarFill
                                key={i}
                                style={{ marginLeft: '1' }}
                                color={
                                    i < rating
                                        ? bookshelfColors.state.warning
                                        : bookshelfColors.grey
                                }
                            />
                        )
                    }
                    if (roundedRating - i === 0.5) {
                        return (
                            <BsStarHalf
                                key={i}
                                style={{ marginLeft: '1' }}
                                color={bookshelfColors.state.warning}
                            />
                        )
                    }
                    return <BsStar key={i} style={{ marginLeft: '1' }} />
                })}
            <Box
                flex={1}
                as='span'
                ml='2'
                color={bookshelfColors.info}
                fontSize='sm'
            >
                &#40;{rating === 0 ? 0 : numReviews}&#41;
            </Box>
        </Flex>
    )
}

const BookCard = ({ book, isHomepage = true, setStars = true }) => {
    const [randomNumber, setRandomNumber] = useState(0)
    useEffect(() => {
        setRandomNumber(Math.floor(Math.random() * 1000))
    }, [])
    return (
        <Card
            maxW={'sm'}
            w='290px'
            h={isHomepage ? '458px' : '100%'}
            borderRadius='2xl'
            border={`1px solid ${bookshelfColors.primary.main}`}
            flex={1}
            direction={'column'}
            justifyContent={'space-between'}
            id={book.book_id}
            p={6}
            _hover={{
                shadow: 'lg',
            }}
            my={4}
        >
            <Box>
                <Center>
                    <Link href={`/books/${book.book_id}`}>
                        <Image
                            src={book.thumbnail}
                            alt={book.title}
                            height={'194px'}
                            marginBottom={6}
                            borderRadius='md'
                        />
                    </Link>
                </Center>
            </Box>
            <Stack>
                <Link
                    className='text-medium-regular pb-1'
                    href={`/books/${book.book_id}`}
                >
                    {book.title}
                </Link>
                <Heading size={'md'} textColor={bookshelfColors.primary.main}>
                    <span>$</span>
                    {book.price}
                </Heading>
            </Stack>
            {setStars && (
                <HStack py={isHomepage ? 6 : 4}>
                    <Rating
                        rating={book.average_rating}
                        numReviews={randomNumber}
                    />
                </HStack>
            )}
            {isHomepage && <CartButton book={book} className='self-center' />}
        </Card>
    )
}
export default BookCard
