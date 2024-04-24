import DesktopLayout from '@/components/Layout/DesktopLayout'
import { useRouter } from 'next/router'
import { getBooksFromAPI, getCategoryList } from '@/api'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	Flex,
	Spacer,
} from '@chakra-ui/react'
import { connect } from 'react-redux'
import DisplayBooks from '@/components/Layout/DisplayBooks'
import { useContext } from 'react'
import { BooksContext } from '@/context/getBooks'

export async function getServerSideProps() {
	let books = []
	try {
		books = await getBooksFromAPI()
	} catch (error) {
		console.log('Error fetching books by category', error)
	}
	return {
		props: {
			books,
		},
	}
}

const AllCategories = ({ books }) => {
	const { categoryList } = useContext(BooksContext)
	return (
		<DesktopLayout
			isHomepage={false}
			books={books}
			categoryList={categoryList}
		>
			<Breadcrumb pt='4'>
				<BreadcrumbItem>
					<BreadcrumbLink href='/'>Home</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbItem isCurrentPage className='text-primary-main'>
					<BreadcrumbLink>All Categories</BreadcrumbLink>
				</BreadcrumbItem>
			</Breadcrumb>
			<DisplayBooks books={books} categoryList={categoryList} />
		</DesktopLayout>
	)
}

export default AllCategories
