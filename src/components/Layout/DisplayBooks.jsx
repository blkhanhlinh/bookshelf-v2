import { useRouter } from 'next/router'
import { BookGrid } from '../Books'
import { FilterSidebar } from '../Filter'
import {
    Box,
    Flex,
    Grid,
    HStack,
    Select,
    Spacer,
    Stack,
    Text,
} from '@chakra-ui/react'
import bookshelfColors from '@/styles/colors'
import {
    sortBooksAsc,
    sortBooksDesc,
    resetSort,
} from '@/redux/filter/filterSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import Loading from '../Loading'

const DisplayBooks = ({ books, categoryList, isSearch = false }) => {
    const dispatch = useDispatch()
    const sortedbooks = useSelector(state => state.books)
    const router = useRouter()
    const { searchQuery } = router.query
    const [sortBy, setSortBy] = useState('')

    useEffect(() => {
        if (sortBy === 'ascending') {
            dispatch(sortBooksAsc(books))
        } else if (sortBy === 'descending') {
            dispatch(sortBooksDesc(books))
        }

        return () => {
            dispatch(resetSort(books))
        }
    }, [sortBy, books, dispatch])

    return (
        <Grid marginBottom={8} gap={8} className='md:grid-cols-4'>
            <FilterSidebar categoryList={categoryList} books={books} />
            <Stack direction='column' py={{ base: '6', lg: '8' }} className='md:col-span-3 sm:col-span-2'>
                {isSearch && (
                    <Box className='w-full mb-6'>
                        <Box
                            bg={bookshelfColors.primary.light}
                            borderColor={bookshelfColors.primary.main}
                            borderWidth={1}
                            p={4}
                            rounded={4}
                        >
                            Results for "{searchQuery}" here &#129303;
                        </Box>
                    </Box>
                )}
                <HStack spacing={6} mb={6}>
                    <Text w={'full'}>Sort by:</Text>
                    <Select placeholder='Price' colorScheme='teal' bg={'white'}>
                        <option value='ascending'>Price: Low to high</option>
                        <option value='descending'>Price: High to low</option>
                    </Select>
                    <Select
                        placeholder='Alphabet'
                        colorScheme='teal'
                        bg={'white'}
                        onChange={e => setSortBy(e.target.value)}
                    >
                        <option value='descending'>Alphabet: A-Z</option>
                        <option value='ascending'>Alphabet: Z-A</option>
                    </Select>
                </HStack>
                {books.length > 0 ? (
                    <BookGrid books={books} />
                ) : (
                    <Loading isScreen={false} className="w-full"/>
                )}
            </Stack>
        </Grid>
    )
}

export default DisplayBooks
