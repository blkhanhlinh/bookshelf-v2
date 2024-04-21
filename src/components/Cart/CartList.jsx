import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { BsTrash } from 'react-icons/bs'
import {
	Spacer,
	Box,
	Flex,
	Button,
	Card,
	Text,
	Image,
	IconButton,
	Grid,
	GridItem,
} from '@chakra-ui/react'
import bookshelfColors from '@/styles/colors'
import {
	removeFromCart,
	increaseQuantity,
	decreseQuantity,
} from '@/redux/cart/cartSlice'
import React, { useState, useEffect } from 'react'
import { getBookCartRecommendation } from '@/api'
import {
	clearRecommendations,
	setRecommendations,
} from '@/redux/recommendation/recommendationSlice'

const CartList = () => {
	const router = useRouter()
	const cart = useSelector(state => state.cart.items)
	const totalAmount = useSelector(state => state.cart.totalAmount)
	const totalQuantity = useSelector(state => state.cart.totalQuantity)
	const dispatch = useDispatch()

	useEffect(() => {
		const fetchRecommendedBooks = async () => {
			if (cart.length > 0) {
				const bookIds = cart.map(item => item.book_id).join(', ')
				const books = await getBookCartRecommendation(bookIds)
				const filteredBooks = books.filter(
					book =>
						!cart.some(
							cartItem => cartItem.book_id === book.book_id
						)
				)
				dispatch(setRecommendations(filteredBooks))
			} else {
				dispatch(clearRecommendations())
			}
		}

		fetchRecommendedBooks()
	}, [cart, dispatch])

	const Quantity = ({ item }) => {
		return (
			<Box>
				<Flex className='flex flex-row justify-center items-center'>
					<Button
						onClick={() => dispatch(decreseQuantity(item.book_id))}
					>
						-
					</Button>
					<Text className='text-regular-bold w-12 text-center'>
						{item.quantity}
					</Text>
					<Button
						onClick={() => dispatch(increaseQuantity(item.book_id))}
					>
						+
					</Button>
				</Flex>
			</Box>
		)
	}

	const Price = ({ item }) => (
		<span className='text-large-bold text-primary-main'>
			<span>$</span>
			{item.totalPrice}
		</span>
	)

	const Remove = ({ item }) => {
		return (
			<Flex className='flex flex-row justify-center items-center'>
				<IconButton
					aria-label='Remove item from cart'
					icon={<BsTrash size={18} color={bookshelfColors.info} />}
					onClick={() => dispatch(removeFromCart(item.book_id))}
					rounded='full'
					variant='ghost'
				/>
			</Flex>
		)
	}

	const handleSubmit = async e => {
		e.preventDefault()
		const checkoutInfo = {
			total: totalAmount,
			orderItems: cart.map(item => item.book_id),
			quantity: cart.map(item => item.quantity),
		}
		// console.log(checkoutInfo)
		// dispatch(orderCheckout({ userToken, userInfo, checkoutInfo }))
		cart.map(item => dispatch(removeFromCart(item.book_id)))
	}

	return (
		<Flex
			// bg='white'
			rounded='xl'
			my={{
				base: '6',
				lg: '8',
			}}
			direction='column'
			justifyContent='space-around'
			w={'full'}
		>
			<Flex py={6} direction='column' w='full' className='relative'>
				<Text className='text-heading-4' mb={6}>
					My Cart{' '}
					<span>{totalQuantity ? `(${totalQuantity})` : ''}</span>
				</Text>
				<Grid templateColumns='repeat(3, 1fr)' gap={4}>
					{!cart.length ? (
						<GridItem colSpan={3}>
							<Box
								className='flex flex-col justify-center items-center rounded-lg py-6'
								border={`1px solid ${bookshelfColors.secondary.main}`}
								bg={bookshelfColors.secondary.light}
								color={bookshelfColors.info}
							>
								<Text className='text-large-bold'>
									No items in cart
								</Text>
								<button
									className='px-4 py-2 mt-4 text-white bg-primary-main rounded-lg hover:bg-primary-dark text-medium-bold'
									onClick={() =>
										router.push('/all-categories')
									}
								>
									Go to book store
								</button>
							</Box>
						</GridItem>
					) : (
						<GridItem colSpan={2}>
							<Card w='full' bgColor='white'>
								<Flex
									direction='row'
									alignItems='center'
									px={8}
									pt={8}
								>
									<Text
										fontWeight='bold'
										flex='8'
										textAlign='left'
									>
										Item
									</Text>
									<Text
										fontWeight='bold'
										flex='3'
										textAlign='center'
									>
										Quantity
									</Text>
									<Text
										fontWeight='bold'
										flex='3'
										textAlign='center'
									>
										Total
									</Text>
									<Text
										fontWeight='bold'
										flex='1'
										textAlign='center'
									></Text>
								</Flex>
								{cart.map((item, index) => (
									<Flex
										key={index}
										direction='row'
										alignItems='center'
										px={8}
										pt={6}
										pb={8}
										justifyContent='space-between'
										w='full'
									>
										<Flex
											flex='8'
											fontSize='md'
											cursor='pointer'
											onClick={() =>
												router.push(
													`/books/${item.book_id}`
												)
											}
											gap={4}
											pr={2}
											alignItems={'center'}
										>
											<Image
												src={item.thumbnail}
												alt={item.title}
												w={16}
												h={24}
											/>
											<Text>{item.title}</Text>
										</Flex>
										<Flex flex='3' justifyContent='center'>
											<Quantity item={item} />
										</Flex>
										<Flex flex='3' justifyContent='center'>
											<Price item={item} />
										</Flex>
										<Flex flex='1' justifyContent='center'>
											<Remove item={item} />
										</Flex>
									</Flex>
								))}
							</Card>
						</GridItem>
					)}
					{!cart.length ? (
						''
					) : (
						<GridItem colSpan={1}>
							<Card
								direction='column'
								w='full'
								bgColor='white'
								className='py-6 px-8 justify-end'
							>
								<Box className='flex justify-between'>
									<Text className='text-medium-bold'>
										Total price (including VAT):
									</Text>
									<Text className='font-bold text-2xl text-primary-main'>
										<span>$</span>
										{totalAmount}
									</Text>
								</Box>
								<Button
									bg={bookshelfColors.primary.main}
									color={'white'}
									fontWeight={'bold'}
									_hover={{
										bg: bookshelfColors.primary.dark,
									}}
									my={8}
									w='full'
									onClick={e => handleSubmit(e)}
								>
									Check out
								</Button>
							</Card>
						</GridItem>
					)}
				</Grid>
			</Flex>
		</Flex>
	)
}

export default CartList
