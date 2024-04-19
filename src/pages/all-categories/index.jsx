import DesktopLayout from "@/components/Layout/DesktopLayout"
import { useRouter } from "next/router"
import { getBooksFromAPI, getCategoryList } from "@/api";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, Spacer } from "@chakra-ui/react";
import { connect } from "react-redux";
import DisplayBooks from "@/components/Layout/DisplayBooks";

export async function getServerSideProps() {
	let books = [];
	let category_list = [];
	try {
		books = await getBooksFromAPI();
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

const AllCategories = ({ books, category_list }) => {
    return (
        <DesktopLayout isHomepage={false}>
            <Breadcrumb pt="4">
                <BreadcrumbItem>
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem isCurrentPage className="text-primary-main">
                    <BreadcrumbLink>All Categories</BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumb>
			<DisplayBooks books={books} category_list={category_list}/>
        </DesktopLayout>
    )
}

export default AllCategories;