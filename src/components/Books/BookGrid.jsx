import { Box, Button, Flex, SimpleGrid } from '@chakra-ui/react'
import { Children, isValidElement, useEffect, useMemo, useState } from 'react'
import { BookCard } from '../HomeSlider'
import NoResult from '../NoResult'

const Grid = props => {
	const columns = useMemo(() => {
		const count = Children.toArray(props.children).filter(
			isValidElement
		).length
		return {
			base: Math.min(1, count),
			sm: Math.min(2, count),
			xl: Math.min(3, count),
		}
	}, [props.children])

	return (
		<SimpleGrid
			columns={columns}
			columnGap={{
				base: '4',
				md: '6',
			}}
			rowGap={{
				base: '8',
				md: '10',
			}}
			{...props}
		/>
	)
}

const getPageNumbers = (currentPage, totalPages) => {
	let startPage, endPage;
	if (totalPages <= 5) {
		startPage = 1;
		endPage = totalPages;
	} else {
		if (currentPage <= 3) {
			startPage = 1;
			endPage = 5;
		} else if (currentPage + 2 >= totalPages) {
			startPage = totalPages - 4;
			endPage = totalPages;
		} else {
			startPage = currentPage - 2;
			endPage = currentPage + 2;
		}
	}
	return Array.from({ length: (endPage + 1) - startPage }, (_, i) => startPage + i);
};

const BookGrid = ({ books }) => {
	const [currentPage, setCurrentPage] = useState(1);
	const booksPerPage = 9;

	if (!books || books.length === 0) {
		return <NoResult />
	}

	const indexOfLastBook = currentPage * booksPerPage;
	const indexOfFirstBook = indexOfLastBook - booksPerPage;
	const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);
	const totalPages = Math.ceil(books.length / booksPerPage);

	const pageNumbers = getPageNumbers(currentPage, totalPages);

	const handlePageChange = pageNumber => {
		setCurrentPage(pageNumber);
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	}

	return (
		<Box width={'fit-content'}>
			<Grid columnGap={6}>
				{currentBooks.map(book => (
					<BookCard key={book.book_id} book={book} isHomepage={false} />
				))}
			</Grid>
			<Flex justify='center' mt={12}>
				{currentPage > 1 && (
					<Button
						onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
						mx={1}
						disabled={currentPage === 1}
						background={'transparent'}
						_hover={{ background: 'transparent' }}
					>
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M15 19L8 12L15 5" stroke="#FF9C28" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
						</svg>

					</Button>
				)}
				{pageNumbers.map(pageNumber => (
					<Button
						key={pageNumber}
						variant={currentPage === pageNumber ? 'solid' : 'outline'}
						colorScheme='teal'
						mx={2}
						onClick={() => handlePageChange(pageNumber)}
					>
						{pageNumber}
					</Button>
				))}
				{currentPage < totalPages && (
					<Button
						onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
						mx={1}
						disabled={currentPage === totalPages}
						background={'transparent'}
						_hover={{ background: 'transparent' }}
						className='disabled:hidden'
					>
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M9.5 4.87402L16.5 11.6977L9.5 18.5214" stroke="#FF9C28" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
						</svg>
					</Button>
				)}
			</Flex>
		</Box>
	)
}

export default BookGrid