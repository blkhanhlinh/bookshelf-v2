import Head from 'next/head'
import Landing from '@/containers/home/landing'
import Section from '@/containers/home/section'
import DesktopLayout from '@/components/Layout/DesktopLayout'
import { getBooksFromAPI, getCategoryList } from '@/api'
import { useContext } from 'react'
import { BooksContext } from '@/context/getBooks'
import Loading from '@/components/Loading'

const Home = () => {
    const { books, loading } = useContext(BooksContext);
    if (loading) {
        return <Loading />
    }
    return (
        <>
            <Head>
                <meta charSet='utf-8' />
                <meta
                    name='viewport'
                    content='initial-scale=1.0, width=device-width'
                />
                <link rel='icon' type='image/svg+xml' href='/favicon.svg' />
                <title>Bookshelf</title>
            </Head>
            <DesktopLayout
                books={books}
                isHomepage={true}
                className='font-sans'
            >
                <Landing />
                <Section books={books} />
            </DesktopLayout>
        </>
    )
}

export default Home
