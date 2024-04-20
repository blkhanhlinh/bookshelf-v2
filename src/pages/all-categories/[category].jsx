import { useRouter } from 'next/router'
import axios from 'axios'
import { API_URL } from '@/constant/api'
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs'
import DesktopLayout from '@/components/Layout/DesktopLayout'
import DisplayBooks from '@/components/Layout/DisplayBooks'
import { getBooksByCategory, getCategoryList } from '@/api'

const CategoryPage = ({ books, category_list }) => {
	const router = useRouter()
	const { category } = router.query

	return (
		<DesktopLayout isHomepage={false} books={books} category_list={category_list}>
			<Breadcrumbs category={category} />
			<DisplayBooks books={books} category_list={category_list}/>
		</DesktopLayout>
	)
}

export default CategoryPage


export async function getServerSideProps(ctx) {
	const category = ctx.query.category
	let books = [];
	let category_list = [];
	try {
		books = await getBooksByCategory(category);
	} catch (error) {
		console.log('Error fetching books by category', error);
	}

	try {
		category_list = await getCategoryList();
	} catch (error) {
		console.log('Error fetching category list', error);
	}
	return {
		props: {
			books,
			category_list,
		}
	}
}
