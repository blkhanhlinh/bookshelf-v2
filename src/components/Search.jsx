import { useRouter } from 'next/router'
import bookshelfColors from '@/styles/colors'
import {
	Button,
	Input,
	InputGroup,
	InputRightElement,
	Stack,
	Box,
	Flex,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { API_URL } from '@/constant/api'
import { debounce } from 'lodash'

const Search = () => {
	const [searchQuery, setSearchQuery] = useState('')
	const [results, setResults] = useState([])
	const router = useRouter()

	const fetchSearchResults = debounce(async query => {
		if (!query) {
			setResults([])
			return
		}
		try {
			const response = await axios.get(`${API_URL}books/${query}/`)
			setResults(response.data)
		} catch (error) {
			console.error('Error fetching search results:', error)
			setResults([])
		}
	}, 300)

	useEffect(() => {
		fetchSearchResults(searchQuery)
	}, [searchQuery])

	const handleChange = event => {
		setSearchQuery(event.target.value)
	}

	const handleFormSubmit = event => {
		event.preventDefault()
		router.push(`/results?searchQuery=${encodeURIComponent(searchQuery)}`)
	}

	const highlightText = (text, highlight) => {
		const parts = text.split(new RegExp(`(${highlight})`, 'gi'))
		return parts.map((part, index) =>
			part.toLowerCase() === highlight.toLowerCase() ? (
				<span key={index} style={{ fontWeight: 'bold' }}>
					{part}
				</span>
			) : (
				part
			)
		)
	}

	const handleSearchResultClick = bookId => {
		setSearchQuery('')
		router.push(`/books/${bookId}`)
	}

	return (
		<Stack width={'50%'}>
			<form onSubmit={handleFormSubmit} width='50vw'>
				<Stack
					direction='row'
					spacing='1rem'
					justify='center'
					align='center'
				>
					<InputGroup className='h-full'>
						<Input
							pr='4rem'
							placeholder='Search books by title, author'
							borderColor={bookshelfColors.primary.light}
							focusBorderColor={bookshelfColors.primary.main}
							_hover={{
								borderColor: bookshelfColors.primary.main,
							}}
							_placeholder={{
								opacity: 1,
								color: bookshelfColors.grey[4],
							}}
							background={bookshelfColors.white}
							width='100%'
							id='searchInput'
							value={searchQuery}
							onChange={handleChange}
						/>
						<InputRightElement width='4.5rem'>
							<Button
								h='1.75rem'
								size='md'
								type='submit'
								bgColor={bookshelfColors.primary.main}
								_hover={{ bg: bookshelfColors.primary.dark }}
							>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'
									strokeWidth='1.5'
									stroke='white'
									className='w-5 h-5'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
									/>
								</svg>
							</Button>
						</InputRightElement>
					</InputGroup>
				</Stack>
			</form>
			<Box
				position={'relative'}
				className='top-0 left-0 right-0 bottom-0'
			>
				<Flex
					zIndex={1000}
					className='w-full absolute bg-white block break-words flex-1 flex-col shadow-lg'
				>
					{results.slice(0, 6).map((result, index) => (
						<div
							key={result.index}
							className='w-full p-3 cursor-pointer hover:bg-gray-100'
							onClick={() =>
								handleSearchResultClick(result.book_id)
							}
						>
							{highlightText(result.title, searchQuery)}
						</div>
					))}
				</Flex>
			</Box>
		</Stack>
	)
}

export default Search
