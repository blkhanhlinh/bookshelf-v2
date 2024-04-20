import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Head from 'next/head';
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
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import DesktopLayout from '@/components/Layout/DesktopLayout';
import bookshelfColors from '@/styles/colors';
import { Rating } from '@/components/HomeSlider/BookCard';
import { CardSlider } from '@/components/HomeSlider';
import { getBookById, getBookRecommendations, getCategoryList } from '@/api';
import { increaseQuantity, addSomeToCart } from '@/redux/cart/cartSlice';

export async function getServerSideProps({ params }) {
	let book = null;
	let relatedBooks = [];
	let category_list = [];
	const bookId = params.id;
	try {
		book = await getBookById(bookId);
	} catch (error) {
		console.error('Error fetching book:', error);
	}
	if (!book) {
		return {
			redirect: {
				destination: '/error',
				permanent: false,
			},
		};
	}

	try {
		relatedBooks = await getBookRecommendations(bookId);
	}
	catch (error) {
		console.error('Error fetching related books:', error);
	}

	try {
		category_list = await getCategoryList();
	} catch (error) {
		console.error('Error fetching category list:', error);
	}

	return {
		props: {
			book,
			relatedBooks,
			category_list,
		},
	}
}

const BookDetailsPage = ({ book, relatedBooks, category_list }) => {
	if (!book) {
		return <div>Loading...</div>
	}
	const router = useRouter();
	const dispatch = useDispatch();
	const cart = useSelector(state => state.cart.items);
	
	const [readMore, setReadMore] = useState(false);
	const [randomNumber, setRandomNumber] = useState(0);
	const [quantity, setQuantity] = useState(1);

	useEffect(() => {
		setRandomNumber(Math.floor(Math.random() * 1000));
	}, []);

	const toggleDescription = () => {
		setReadMore(!readMore);
	};

	const getShortDescription = (description) => {
		return description.length > 472 ? description.slice(0, 472) + '...' : description;
	};

	const {
		title,
		authors,
		thumbnail,
		description,
		published_year,
		price,
		categories,
		num_pages,
	} = book;


	const Quantity = () => {
		const add = () => setQuantity(quantity + 1);
		const minus = () => quantity > 1 && setQuantity(quantity - 1);

		return (
			<Flex className='flex flex-row justify-center items-center'>
				<Button onClick={minus}>-</Button>
				<Text className='text-regular-bold w-10 text-center'>{quantity}</Text>
				<Button onClick={add}>+</Button>
			</Flex>
		);
	};

	const addToCartHandler = () => {
		const bookInCart = cart.find(item => item.book_id === book.book_id);
		if (bookInCart) {
			dispatch(increaseQuantity(book.book_id));
		} else {
			dispatch(addSomeToCart({ ...book, quantity }));
		}
	}

	return (
		<DesktopLayout isHomepage={false} category_list={category_list}>
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
			<Box my={12} px={6} py={8} bgColor={"white"} display={'flex'} gap={2} flexDirection={'column'}>
				<Heading as='h2' size='lg' fontWeight='bold' mb={4}>
					Book details
				</Heading>
				<Flex className='w-1/2 font-semibold text-lg'>
					<Text flex={1}>Category</Text>
					<Text className='text-primary-main cursor-pointer' flex={1} onClick={() => router.push(`/all-categories/${categories}`)}>{categories}</Text>
				</Flex>
				<Flex className='w-1/2 font-semibold text-lg'>
					<Text flex={1}>Published year</Text>
					<Text className='text-primary-dark' flex={1}>{published_year}</Text>
				</Flex>
				<Flex className='w-1/2 font-semibold text-lg'>
					<Text flex={1}>Number of pages</Text>
					<Text className='text-primary-dark' flex={1}>{num_pages}</Text>
				</Flex>
				<Box mt={2}>
					<Text fontSize='2xl' fontWeight='bold'>
						Description
					</Text>
					<Stack spacing={4} className='text-medium-regular'>
						<Text pt={2}>
							{readMore ? description : getShortDescription(description)}
						</Text>
						{description.length > 472 && <Text onClick={toggleDescription} className='w-full flex justify-center cursor-pointer'>
							{readMore ? (
								<span className='text-secondary-main flex flex-row'>
									Read less
									<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M8 14L12 10L16 14" stroke="#FF9C28" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
									</svg>
								</span>
							) : (
								<span className='text-secondary-main flex flex-row'>
									Read more
									<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M16 10L12 14L8 10" stroke="#FF9C28" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
									</svg>
								</span>
							)}
						</Text>
						}
					</Stack>
				</Box>
			</Box>
			<Box paddingBottom={'104px'} mt={12}>
				<Flex justifyContent={'space-between'} paddingBottom={4}>
					<Text fontWeight={'700'} fontSize={'3xl'}>
						Related books
					</Text>
				</Flex>
				<CardSlider books={relatedBooks} />
			</Box>
		</DesktopLayout>
	)
}

export default BookDetailsPage
