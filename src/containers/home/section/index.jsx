import { CardSlider } from '@/components/HomeSlider'
import { Box, Flex, HStack, Heading, Text } from '@chakra-ui/react'
import Link from 'next/link'
import useBestSellers from '@/hooks/useBestSellers'
import useNewArrivals from '@/hooks/useNewArrivals'
import bookshelfColors from '@/styles/colors'

const SectionHeader = ({ children }) => {
	return (
		<Text fontWeight={'700'} fontSize={'3xl'}>
			{children}
		</Text>
	)
}

const links = [
	{
		title: 'Best Sellers',
		link: '/best-sellers',
	},
	{
		title: 'New Arrivals',
		link: '/new-arrivals',
	},
]

const Section = ({ books }) => {
	const bestSellers = useBestSellers(books);
	const newArrivals = useNewArrivals(books);
	return (
		<>
			{links.map(link => {
				return (
					<Box key={link.title} paddingBottom={'80px'}>
						<Flex
							justifyContent={'space-between'}
							paddingBottom={4}
							alignItems={'center'}
						>
							<SectionHeader>{link.title}</SectionHeader>
							<Link href={link.link}>
								<HStack
									alignItems={'center'}
									className='hover:text-primary-main'
									transition="transform 0.2s"
									_hover={{
										transform: 'translateX(4px)',
									}}>
									<Text>See all</Text>
									<Box
										_hover={{stroke: bookshelfColors.primary.main}}
									>
										<svg
											width='32'
											height='32'
											viewBox='0 0 32 32'
											fill='none'
											xmlns='http://www.w3.org/2000/svg'
										>
											<path
												d='M4 16H28'
												stroke='#264653'
												strokeWidth='2'
												strokeLinecap='round'
												strokeLinejoin='round'
											/>
											<path
												d='M21.3333 9.33331L28 16L21.3333 22.6666'
												stroke='#264653'
												strokeWidth='2'
												strokeLinecap='round'
												strokeLinejoin='round'
											/>
										</svg>
									</Box>
								</HStack>
							</Link>
						</Flex>
						<CardSlider books={link.title === "Best Sellers" ? bestSellers : newArrivals} />
					</Box>
				)
			})}
		</>
	)
}

export default Section
