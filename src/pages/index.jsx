import Head from 'next/head'
import Landing from '@/containers/home/landing'
import Section from '@/containers/home/section'
import DesktopLayout from '@/components/Layout/DesktopLayout'
import { getBooksFromAPI } from '@/api'

const Home = ({ books }) => {
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
			<DesktopLayout books={books} isHomepage={true} className='font-sans'>
				<Landing />
				<Section books={books} />
			</DesktopLayout>
		</>
	)
}

export async function getServerSideProps() {
	try {
	  const books = await getBooksFromAPI();
	  return { props: { books } };
	} catch (error) {
	  console.error("Failed to fetch books:", error);
	  return { props: { books: [] } };
	}
}
  
export default Home