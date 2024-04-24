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
import Loading from '@/components/Loading'


const AllCategories = () => {
	const { books, categoryList, loading } = useContext(BooksContext)
	
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
			{loading ? (
				<Loading />
			) : (
				<DisplayBooks books={books} categoryList={categoryList} />
			)}
		</DesktopLayout>
	)
}

export default AllCategories
