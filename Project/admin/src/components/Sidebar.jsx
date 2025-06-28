import React from 'react';
import listProduct from '../assets/productlist.png';
import addProduct from '../assets/addproduct.png';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className='py-7 flex justify-center gap-x-1 gap-y-5 w-full bg-white sm:gap-x-4 lg:flex-col lg:pt-20 lg:max-w-60 lg:h-screen lg:justify-start lg:pl-6'>
      <Link to={'/addproduct'}>
        <button className='flex items-center justify-center gap-2 rounded-md bg-primary h-14 w-40 xs:w-44 medium-16'>
          <img src={addProduct} alt="" height={44} width={44} />
          <span>Add Product</span>
        </button>
      </Link>

      <Link to={'/listproduct'}>
        <button className='flex items-center justify-center gap-2 rounded-md bg-primary h-14 w-40 xs:w-44 medium-16'>
          <img src={listProduct} alt="" height={44} width={44} />
          <span>Product List</span>
        </button>
      </Link>
    </div>
  );
};

export default Sidebar;
