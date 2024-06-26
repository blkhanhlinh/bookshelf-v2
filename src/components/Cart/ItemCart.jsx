import bookshelfColors from '@/styles/colors'
import { IconButton } from '@chakra-ui/react'
import Image from 'next/image'
import { BsTrash } from 'react-icons/bs'

const ItemCart = ({ item, removeItem }) => {
	// console.log(item)
	return (
		<div className='flex items-center justify-between gap-2 p-5'>
			<Image
				src={item.thumbnail}
				alt={item.title}
				width={48}
				height={48}
				className='rounded-sm'
			/>
			<div className='flex flex-col flex-1 leading-normal'>
				<strong className='text-info text-regular-bold'>
					{item.title}
				</strong>
				<p className='text-info flex gap-1'>
					<span className='text-primary-main text-regular-bold'>
						<span>$</span>
						{item.price} x {item.quantity}
					</span>
					<span className='text-primary-main text-regular-bold'>
						= <span>$</span>
						{item.price * item.quantity}
					</span>
				</p>
			</div>
			<IconButton
				aria-label='Remove item from cart'
				icon={<BsTrash size={18} color={bookshelfColors.info} />}
				onClick={() => removeItem(item.book_id)}
				rounded='lg'
				variant='ghost'
			/>
		</div>
	)
}
export default ItemCart
