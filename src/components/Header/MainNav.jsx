import Image from 'next/image'
import bookshelfColors from '@/styles/colors'
import { Stack } from '@chakra-ui/react'
import { InputGroup, Input, InputRightElement, Button } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export const MenuItem = ({path, name, icon}) => {
	const [isHover, setIsHover] = useState(false)
	return (
		<Link href={path}>
			<div
				className='menu-link'
				onMouseEnter={() => setIsHover(true)}
				onMouseLeave={() => setIsHover(false)}
			>
				<svg				
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 24 24'
					strokeWidth='1.5'
					className='w-7 h-7'
					stroke={isHover ? bookshelfColors.primary.main : bookshelfColors.info}
				>
					{icon}
				</svg>
				<p className='text-small-regular'>{name}</p>
			</div>
		</Link>
	)
}

const MainNav = () => {
	const menu = [
		{
			name: 'Account',
			path: '/account',
			icon: 
				<path
					strokeLinecap='round'
					strokeLinejoin='round'
					d='M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z'
				/>
		},
		{
			name: 'Wishlist',
			path: '/Wishlist',
			icon: 
				<path
					strokeLinecap='round'
					strokeLinejoin='round'
					d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z'
				/>
		},
		{
			name: 'My cart',
			path: '/my-cart',
			icon: 							
				<path
					strokeLinecap='round'
					strokeLinejoin='round'
					d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
				/>
		},
	]

	return (
		<nav id='main-nav'>
			<Stack
				className='bg-background py-4'
				direction='row'
				justify='space-between'
				align='center'
			>
				<Image
					src='/Logo.svg'
					width={173}
					height={40}
					priority
					alt='logo'
				/>
				<Stack
					direction='row'
					spacing='1rem'
					justify='center'
					align='center'
					width={'50%'}
				>
					<InputGroup className='h-10'>
						<Input
							pr='4.0rem'
							placeholder='Search by title, author,...'
							borderColor={bookshelfColors.primary.light}
							focusBorderColor={bookshelfColors.primary.main}
							_hover={{
								borderColor: bookshelfColors.primary.main,
							}}
							_placeholder={{
								opacity: 1,
								color: bookshelfColors.grey[4],
							}}
							width='100%'
						/>
						<InputRightElement width='4.5rem'>
							<Button
								h='1.75rem'
								size='md'
								type='submit'
								bgColor={bookshelfColors.primary.main}
								_hover={{ bg: bookshelfColors.primary.dark }}
							>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'
									strokeWidth='1.5'
									stroke='white'
									className='w-5 h-5'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
									/>
								</svg>
							</Button>
						</InputRightElement>
					</InputGroup>
				</Stack>
				<Stack direction='row' align='center' spacing='2rem'>
					{menu.map((item, index) => (
						<MenuItem
							key={index}
							name={item.name}
							path={item.path}
							icon={item.icon}
						/>
					))}
				</Stack>
			</Stack>
		</nav>
	)
}

export default MainNav
