import { Box } from '@chakra-ui/react'
import { Header } from '../Header'
import { Footer } from '../Footer'
import { Loading } from '../Loading'

const DesktopLayout = ({
    children,
    category_list,
    isHomepage,
    showFooter = true,
    books,
}) => {
    // console.log(showFooter)
    if (!category_list) {
        return <Loading />
    } else {
        return (
            <>
                <Box maxWidth='1230px' m='auto' className='font-sans text-info'>
                    <Header showSubNav={isHomepage} books={books} />
                    <main>{children}</main>
                </Box>
                {showFooter && <Footer category_list={category_list} />}
            </>
        )
    }
}
export default DesktopLayout
