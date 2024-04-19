// import { connect } from 'react-redux'
// import bookshelfColors from '@/styles/colors'
// import { Box, Divider, Radio, RadioGroup, Stack, Text } from '@chakra-ui/react'
// import { useEffect, useState } from 'react'

// const PriceFilter = ({ books, setFilteredBooks }) => {
// 	const values = [
// 		{ value: '0-10', text: '0 - $10' },
// 		{ value: '10-20', text: '$10 - $20' },
// 		{ value: '20-30', text: '$20 - $30' },
// 		{ value: '30-40', text: '$30 - $40' },
// 		{ value: '40-50', text: '$40 - $50' },
// 	]

// 	const handleChange = value => {
// 		const [min, max] = value.split('-')
// 		const filteredBooks = books.filter(book => {
// 			const price = book.unit_price
// 			return price >= parseInt(min) && price <= parseInt(max)
// 		})
// 		setFilteredBooks(filteredBooks);
// 	}

// 	useEffect(() => {
// 		setFilteredBooks(books)
// 	}, [books, setFilteredBooks])

// 	return (
// 		<>
// 			<Box p={6}>
// 				<Text className='text-xl font-bold'>Price</Text>
// 				<Stack pt={2}>
// 					<RadioGroup onChange={handleChange}>
// 						<Stack>
// 							{values.map(({ value, text }) => (
// 								<Radio
// 									key={value}
// 									value={value}
// 									color={bookshelfColors.primary.main}
// 									_checked={{
// 										color: '#fff !important',
// 										backgroundColor: `${bookshelfColors.primary.main}`,
// 									}}
// 									className='text-info text-regular-regular'
// 									py={1}
// 								>
// 									{text}
// 								</Radio>
// 							))}
// 						</Stack>
// 					</RadioGroup>
// 				</Stack>
// 			</Box>
// 			<Divider />
// 		</>
// 	)
// }

// const mapStateToProps = state => {
// 	return {
// 		filteredBooks: state.filteredBooks
// 	}
// }

// const mapDispatchToProps = dispatch => {
// 	return {
// 		setFilteredBooks: (filteredBooks) => dispatch({ type: 'SET_FILTERED_BOOKS', filteredBooks })
// 	}
// }

// export default connect(mapStateToProps, mapDispatchToProps)(PriceFilter);