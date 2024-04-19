import { Box } from '@chakra-ui/react'
import { Header } from '../Header'
import { Footer } from '../Footer'

const DesktopLayout = ({ children, isHomepage, showFooter = true, books }) => {
	// console.log(showFooter)
	return (
		<>
			<Box maxWidth='1230px' m='auto' className='font-sans text-info'>
				<Header showSubNav={isHomepage} books={books}/>
				<main >{children}</main>
			</Box>
			{showFooter && <Footer />}
		</>
	)
}
export default DesktopLayout
