import {
	Badge,
	Box,
	Button,
	Flex,
	Icon,
	Popover,
	PopoverContent,
	PopoverTrigger,
	Text,
} from '@chakra-ui/react'
import WidgetCart from './WidgetCart'
import bookshelfColors from '@/styles/colors'
import { MenuItem } from '../Header/MainNav'
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '@/redux/cart/cartSlice';
import { selectCartTotalAmount, selectCartTotalQuantity } from '@/redux/cart/cartSelectors';

export default function ShoppingCart() {
	const dispatch = useDispatch();
	const quantity = useSelector(selectCartTotalQuantity);
	const price = useSelector(selectCartTotalAmount);

	return (
		<Popover
			isLazy
			trigger='hover'
			placement='bottom-end'
			className='lg:relative flex flex-col justify-center'
		>
			<PopoverTrigger>
				<Flex direction='column' align='center'>
					<MenuItem
                        path="/my-cart"
                        name="My Cart"
						icon={
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
							/>
						}
					/>
					{quantity > 0 && (
						<Badge
							mt={1}
							px={1.5}
							bg={bookshelfColors.secondary.main}
							color='white'
							rounded='full'
							className='absolute -top-0 -right-1 text-white text-[6px]'
						>
							{quantity}
						</Badge>
					)}
				</Flex>
			</PopoverTrigger>
			<PopoverContent>
				<WidgetCart />
			</PopoverContent>
		</Popover>
	)
}
