import DesktopLayout from '@/components/Layout/DesktopLayout'
import DisplayBooks from '@/components/Layout/DisplayBooks'
import { useRouter } from 'next/router'
import { getCategoryList, searchBooks } from '@/api'
import { useContext } from 'react'
import { BooksContext } from '@/context/getBooks'

export async function getServerSideProps(ctx) {
	const { searchQuery } = ctx.query
	let books = []

	try {
		books = await searchBooks(searchQuery)
	} catch (error) {
		console.error('Error fetching search results:', error)
	}

	return {
		props: {
			categoryList,
			books,
		},
	}
}

const SearchResults = ({ books }) => {
	const { categoryList } = useContext(BooksContext)
	return (
		<DesktopLayout
			isHomepage={false}
			categoryList={categoryList}
			books={books}
		>
			{books && books.length > 0 ? (
				<DisplayBooks
					books={books}
					isSearch={true}
					categoryList={categoryList}
				/>
			) : (
				<p>No books found for your query.</p>
			)}
		</DesktopLayout>
	)
}

export default SearchResults
