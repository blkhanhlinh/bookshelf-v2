import { useRouter } from 'next/router'
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs'
import DesktopLayout from '@/components/Layout/DesktopLayout'
import DisplayBooks from '@/components/Layout/DisplayBooks'
import { getBookRecommendations, getBooksByCategory, getBooksFromAPI, getCategoryList } from '@/api'
import { useEffect } from 'react'

const CategoryPage = ({ books, category_list }) => {
    const router = useRouter()
    const { category } = router.query

    useEffect(() => {
		if (category === 'Best Sellers') {
			const bestSellers = [...books]
				.sort((a, b) => {
					return b.average_rating - a.average_rating
				})
				.slice(0, 20)
			books = bestSellers
		} else if (category === 'New Arrivals') {
			const newArrivals = [...books]
				.sort((a, b) => {
					return b.published_year - a.published_year
				})
				.slice(0, 20)
			books = newArrivals
		}
    }, [books])

    return (
        <DesktopLayout
            isHomepage={false}
            books={books}
            category_list={category_list}
        >
            <Breadcrumbs category={category} />
            <DisplayBooks books={books} category_list={category_list} />
        </DesktopLayout>
    )
}

export default CategoryPage

export async function getServerSideProps(ctx) {
    const category = ctx.query.category
	if(category !== 'Best Sellers' && category !== 'New Arrivals') {
		let books = []
		let category_list = []
		try {
			books = await getBooksByCategory(category)
		} catch (error) {
			console.log('Error fetching books by category', error)
		}
		try {
			category_list = await getCategoryList()
		} catch (error) {
			console.log('Error fetching category list', error)
		}
		return {
			props: {
				books,
				category_list,
			},
		}
	} else {
		let books = []
		let category_list = []
		try {
			books = await getBooksFromAPI()
		} catch (error) {
			console.log('Error fetching books by category', error)
		}
		try {
			category_list = await getCategoryList()
		} catch (error) {
			console.log('Error fetching category list', error)
		}
		return {
			props: {
				books: books,
				category_list: category_list,
			},
		}
	}
}
