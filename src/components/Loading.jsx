import bookshelfColors from "@/styles/colors"
import { Spinner } from "@chakra-ui/react"

export default function Loading() {
  return (
      <div className='flex min-h-screen flex-col items-center justify-center text-gray-800'>
          <Spinner
              thickness='4px'
              speed='0.65s'
              emptyColor='gray.200'
              color={bookshelfColors.primary.main}
              size='xl'
          />
          <p>Loading...</p>
      </div>
  )
}