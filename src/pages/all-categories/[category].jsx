import { useRouter } from 'next/router'
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs'
import DesktopLayout from '@/components/Layout/DesktopLayout'
import DisplayBooks from '@/components/Layout/DisplayBooks'
import {
    getBookRecommendations,
    getBooksByCategory,
    getBooksFromAPI,
    getCategoryList,
} from '@/api'
import { useContext, useEffect } from 'react'
import { BooksContext } from '@/context/getBooks'
import Loading from '@/components/Loading'

const CategoryPage = ({ books }) => {
    const router = useRouter()
    const { category } = router.query
    const { categoryList } = useContext(BooksContext)

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
            categoryList={categoryList}
        >
            <Breadcrumbs category={category} />
            {books.length > 0 ? (
                <DisplayBooks books={books} categoryList={categoryList} />
            ) : (
                <Loading isScreen={false} />
            )}
        </DesktopLayout>
    )
}

export default CategoryPage

export async function getServerSideProps(ctx) {
    const category = ctx.query.category
    let booksPromise
    if (category !== 'Best Sellers' && category !== 'New Arrivals') {
        booksPromise = getBooksByCategory(category).catch(error => {
            console.error('Error fetching books by category:', error)
            return []
        })
    } else {
        booksPromise = getBooksFromAPI().catch(error => {
            console.error('Error fetching books from API:', error)
            return []
        })
    }

    try {
        const [books] = await Promise.all([booksPromise])

        return {
            props: {
                books: books || [],
            },
        }
    } catch (error) {
        console.error('Error during data fetching:', error)
        return {
            redirect: {
                destination: '/error',
                permanent: false,
            },
        }
    }
}
