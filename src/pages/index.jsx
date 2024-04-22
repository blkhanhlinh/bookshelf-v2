import Head from 'next/head'
import DesktopLayout from '@/components/Layout/DesktopLayout'
import { getBooksFromAPI, getCategoryList } from '@/api'
import dynamic from 'next/dynamic'

const Landing = dynamic(() => import('@/containers/home/Landing'))
const Section = dynamic(() => import('@/containers/home/Section'))

const Home = ({ books, category_list }) => {
    return (
        <>
            <Head>
                <meta charSet='utf-8' />
                <meta
                    name='viewport'
                    content='initial-scale=1.0, width=device-width'
                />
                {/* <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" /> */}
                <link rel='icon' type='image/svg+xml' href='/favicon.svg' />
                <title>Bookshelf</title>
            </Head>
            <DesktopLayout
                books={books}
                category_list={category_list}
                isHomepage={true}
                className='font-sans'
            >
                <Landing />
                <Section books={books} />
            </DesktopLayout>
        </>
    )
}

export async function getServerSideProps() {
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
            books,
            category_list,
        },
    }
}

export default Home
