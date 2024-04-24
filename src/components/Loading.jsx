import bookshelfColors from "@/styles/colors"
import { Spinner } from "@chakra-ui/react"

export default function Loading({ isScreen = true}) {
  return (
      <div className={`flex flex-col items-center justify-center text-gray-800 ${isScreen ? 'min-h-screen' : 'py-16'} `}>
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