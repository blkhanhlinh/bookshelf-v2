import bookshelfColors from '@/styles/colors'
import {
	Flex,
	FormControl,
	FormLabel,
	Input,
	Checkbox,
	Stack,
	Link,
	Button,
	Text,
	useToast,
	Spinner,
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
// import { useDispatch, useSelector } from 'react-redux'
// import { userLogin } from '@/redux/auth/authActions'


const LoginForm = () => {
	const router = useRouter()
	// const dispatch = useDispatch()
	// const toast = useToast()

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	// const { loading, userInfo, error, success } = useSelector((state) => state.auth)

	// useEffect(() => {
	// 	if (error) {
	// 		toast({
	// 			title: 'An error occurred.',
	// 			description: error,
	// 			status: 'error',
	// 			duration: 2000,
	// 			isClosable: true,
	// 			position: 'bottom-right',
	// 			colorScheme: 'error',
	// 		})
	// 	}
	// }, [error])


	const handleSubmit = async e => {
		e.preventDefault()
		// dispatch(userLogin({ username, password}))
		router.push('/')
	}


	return (
		<Flex
			borderRadius={'2xl'}
			bg={bookshelfColors.white}
			width={'40%'}
			p={12}
			height={'40rem'}
			direction={'column'}
		>
			<h4 className='text-heading-4 mt-4 mb-8 text-center'>Sign in</h4>
			<form onSubmit={handleSubmit}>
				<Stack spacing={4}>
					<FormControl id='username'>
						<FormLabel fontSize='1rem' lineHeight='1.5rem'>
							Username
						</FormLabel>
						<Input
							type='text'
							placeholder='Username'
							borderColor={bookshelfColors.primary.light}
							focusBorderColor={bookshelfColors.primary.main}
							_hover={{
								borderColor: bookshelfColors.primary.main,
							}}
							_placeholder={{
								opacity: 1,
								color: bookshelfColors.grey[4],
							}}
							value={username}
							onChange={e => setUsername(e.target.value)}
						/>
					</FormControl>
					<FormControl id='password'>
						<FormLabel fontSize='1rem' lineHeight='1.5rem'>
							Password
						</FormLabel>
						<Input
							type='password'
							placeholder='Password'
							borderColor={bookshelfColors.primary.light}
							focusBorderColor={bookshelfColors.primary.main}
							_hover={{
								borderColor: bookshelfColors.primary.main,
							}}
							_placeholder={{
								opacity: 1,
								color: bookshelfColors.grey[4],
							}}
							value={password}
							onChange={e => setPassword(e.target.value)}
						/>
					</FormControl>
					<Stack spacing={10}>
						<Stack direction={'row'} justify={'space-between'}>
							<Checkbox
								colorScheme='primary'
								defaultChecked
							>
								Remember me
							</Checkbox>
						</Stack>
						<Button
							bg={bookshelfColors.primary.main}
							color={'white'}
							fontWeight={'normal'}
							_hover={{
								bg: bookshelfColors.primary.dark,
							}}
							type='submit'
						>
							Sign in
						</Button>
					</Stack>
				</Stack>
			</form>
			<Text mt='auto' mb='0' textAlign={'center'}>
				Don{`'`}t have an account?{' '}
				<Link as={NextLink} href='/auth/register' color='secondary.500'>
					Sign up
				</Link>
			</Text>
		</Flex>
	)
}

export default LoginForm
