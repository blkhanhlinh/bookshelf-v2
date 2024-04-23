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

    const categoryListPromise = getCategoryList().catch(error => {
        console.error('Error fetching category list:', error)
        return []
    })

    try {
        const [books, category_list] = await Promise.all([
            booksPromise,
            categoryListPromise,
        ])

        return {
            props: {
                books: books || [],
                category_list: category_list || [],
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
