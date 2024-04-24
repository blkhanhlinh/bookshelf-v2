import { Box } from '@chakra-ui/react'
import { Header } from '../Header'
import { Footer } from '../Footer'
import { Loading } from '../Loading'
import { useContext } from 'react'
import { BooksContext } from '@/context/getBooks'

const DesktopLayout = ({
    children,
    isHomepage,
    showFooter = true,
    books,
}) => {
    const { categoryList } = useContext(BooksContext)
    // console.log(showFooter)
    if (!categoryList) {
        return <Loading />
    } else {
        return (
            <>
                <Box maxWidth='1230px' m='auto' className='font-sans text-info'>
                    <Header showSubNav={isHomepage} books={books} />
                    <main>{children}</main>
                </Box>
                {showFooter && <Footer categoryList={categoryList} />}
            </>
        )
    }
}
export default DesktopLayout
