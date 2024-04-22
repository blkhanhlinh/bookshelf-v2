import { Heading, SimpleGrid, Stack } from '@chakra-ui/react'
import React, { useRef } from 'react'
import BookCard from './BookCard'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import bookshelfColors from '@/styles/colors'

const NextArrow = ({ onClick }) => {
	return (
		<div
			className='absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-4 cursor-pointer'
			onClick={onClick}
		>
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3Z" stroke="#264653" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
				<path d="M11 9L14 12L11 15" stroke="#264653" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
			</svg>
		</div>
	)
}

const PrevArrow = ({ onClick }) => {
	return (
		<div
			className='absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-8 cursor-pointer'
			onClick={onClick}
		>
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="#264653" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
				<path d="M13 15L10 12L13 9" stroke="#264653" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
			</svg>
		</div>
	)
}

const CardSlider = ({ books }) => {
	const ref = useRef({})

	const settings = {
		dots: true,
		infinite: books.length > 4 ? true : false,
		speed: 800,
		slidesToShow: 4,
		slidesToScroll: 2,
		autoplay: true,
		autoplaySpeed: 3000,
		nextArrow: <NextArrow />,
		prevArrow: <PrevArrow />,

		responsive: [
			{
				breakpoint: 992,
				settings: {
					arrows: false,
					slidesToShow: 2,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 640,
				settings: {
					arrows: false,
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	}
	const limitedBooks = books.slice(0, 12)

	return (
		<div>
			<Slider ref={ref} {...settings} className='pb-5 [&_div]:ml-0'>
				{limitedBooks.map(book => (
					<BookCard key={book.book_id} book={book} />
				))}
			</Slider>
		</div>
	)
}

export default CardSlider
