import DesktopLayout from '@/components/Layout/DesktopLayout'
import DisplayBooks from '@/components/Layout/DisplayBooks'
import { useRouter } from 'next/router'
import { getCategoryList, searchBooks } from '@/api'

export async function getServerSideProps(ctx) {
	const { searchQuery } = ctx.query
	let category_list = []
	let books = []
	try {
		category_list = await getCategoryList()
	} catch (error) {
		console.error('Error fetching category list:', error)
	}

	try {
		books = await searchBooks(searchQuery)
	} catch (error) {
		console.error('Error fetching search results:', error)
	}

	return {
		props: {
			category_list,
			books,
		},
	}
}

const SearchResults = ({ category_list, books }) => {
	return (
		<DesktopLayout
			isHomepage={false}
			category_list={category_list}
			books={books}
		>
			{books && books.length > 0 ? (
				<DisplayBooks
					books={books}
					isSearch={true}
					category_list={category_list}
				/>
			) : (
				<p>No books found for your query.</p>
			)}
		</DesktopLayout>
	)
}

export default SearchResults
