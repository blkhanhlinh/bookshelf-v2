import React, { useState } from 'react'
import {
	Box,
	Button,
	Checkbox,
	CheckboxGroup,
	Divider,
	Stack,
	Text,
} from '@chakra-ui/react'
import Link from 'next/link'
import { categories } from '@/constant/route'
import { useRouter } from 'next/router'
import bookshelfColors from '@/styles/colors'
import PriceFilter from './PriceFilter'
import RatingFilter from './RatingFilter'
import AuthorFilter from './AuthorFilter'

const FilterSidebar = ({ books, categoryList }) => {
	const router = useRouter()
	const [showMore, setShowMore] = useState(false)

	categoryList = ['All Categories', 'Best Sellers', 'New Arrivals'].concat(
		categoryList
	)
	const currentPath = `/all-categories/${router.query.category}`

	const displayedCategories = showMore
		? categoryList
		: categoryList.slice(0, 10)

	const handleshowMore = () => {
		setShowMore(!showMore)
	}

	return (
		<Box
			h='full'
			w='290px'
			bg='white'
			rounded='xl'
			mt={{
				base: '6',
				lg: '8',
			}}
		>
			<Box p={6}>
				<Text className='text-xl font-bold'>Product Categories</Text>
				<Stack paddingLeft={2} pt={2} dir='columns' spacing={4}>
					{displayedCategories.map((cate, index) => {
						const catePath =
							cate === 'All Categories'
								? '/all-categories'
								: `/all-categories/${cate}`
						return cate !== 'All Categories' ? (
							<Link href={catePath} key={index} passHref>
								<Text
									as='a'
									py='1'
									px='2'
									fontSize='base'
									fontWeight={
										currentPath === catePath
											? 'bold'
											: 'normal'
									}
									_hover={{
										color: bookshelfColors.primary.main,
									}}
									color={
										currentPath === catePath
											? bookshelfColors.primary.dark
											: bookshelfColors.info
									}
								>
									{cate}
								</Text>
							</Link>
						) : (
							<Link href={catePath} key={index} passHref>
								<Text
									as='a'
									py='1'
									fontSize='base'
									fontWeight={'bold'}
									_hover={{
										color: bookshelfColors.primary.main,
									}}
									color={bookshelfColors.info}
								>
									{cate}
								</Text>
							</Link>
						)
					})}
					{categoryList.length > 6 && (
						<Text
							onClick={handleshowMore}
							mt={3}
							color={bookshelfColors.secondary.main}
							_hover={bookshelfColors.secondary.light}
							display='flex'
							flexDirection='row'
							className='w-full justify-center cursor-pointer'
						>
							{showMore ? 'Show less' : 'Show more'}
							<span>
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
						</Text>
					)}
				</Stack>
			</Box>
			<Divider />
			<PriceFilter books={books} />
			<RatingFilter />
			<AuthorFilter />
		</Box>
	)
}

export default FilterSidebar
