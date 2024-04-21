import { Stack } from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { essentialPath } from '@/constant/route'

const SubNav = ({ books }) => {
	const router = useRouter()

	const categoryCounts = books.reduce((acc, book) => {
		acc[book.category] = (acc[book.category] || 0) + 1
		return acc
	}, {})

	const categories = Object.entries(categoryCounts).map(([key, count]) => ({
		path: `/all-categories/${key}`,
		title: key,
		count,
	}))

	const topCategories = categories
		.sort((a, b) => b.count - a.count)
		.slice(0, 7)

	const allPaths = essentialPath.concat(topCategories)

	return (
		<nav id='sub-nav'>
			<Stack
				className='h-12 bg-background py-3'
				direction='row'
				spacing='auto'
				justify='space-between'
				align='center'
			>
				{allPaths.map((category, index) => (
					<Link
						href={`${category.path}`}
						key={index}
						className={`text-base capitalize ${
							router.pathname ===
							`/all-categories/${category.path}`
								? 'text-primary-main'
								: 'hover:text-primary-main'
						}`}
					>
						{category.title}
					</Link>
				))}
			</Stack>
		</nav>
	)
}

export default SubNav
