import React from 'react'
import { Link } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa'

const Item = ({ id, name, image, old_price, new_price }) => {
  return (
    <div className='rounded-xl overflow-hidden shadow-lg'>
      <div className='relative flex items-center justify-center group overflow-hidden transition-all duration-100'>
        <Link to={`/product/${id}`} className='h-12 w-12 bg-white rounded-full flex items-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 py-2 z-20 scale-0 group-hover:scale-100 transition-all duration-700'>
          <FaSearch className='hover:rotate-90 hover:scale-125 transition-all duration-200' />
        </Link>

        <img onClick={window.scrollTo(0,0)} src={image} alt='productImage' className='w-full block object-cover group-hover:scale-110 transition-all duration-1000' />
      </div>
    
      <div className='p-4 overflow-hidden'>
        <h4 className='my-2 text-base font-medium line-clamp-2 text-gray-600'>{name}</h4>
        <div className='flex gap-5'>
          <div className='text-lg font-bold text-black'>₹{new_price}.00</div>
          <div className='text-secondary bold-16 line-through'>₹{old_price}.00</div>
        </div>
      </div>
    </div>
  )
}

export default Item