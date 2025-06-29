import React from 'react'
import { useState,useEffect } from 'react'
import { TbTrash } from 'react-icons/tb'

const ListProd = () => {

    const [allProducts,setAllProducts] = useState([]);
    const fetchInfo = async () => {
        await fetch(`${import.meta.env.VITE_API_URL}/allproducts`).then((res) => res.json()).then((data)=> {setAllProducts(data)});
    }

    useEffect(() => {
        fetchInfo();
    }, [])


    const remove_product = async (id) => {
        await fetch(`${import.meta.env.VITE_API_URL}/removeproduct` , {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({id:id})
        })
        await fetchInfo();
    }


  return (
  <div className="p-2 box-border bg-white mb-0 rounded-sm w-full mt-4 sm:p-4 sm:m-7">
    <h4 className="font-bold text-2xl p-5 uppercase">Product List</h4>

    <div className="max-h-[77vh] overflow-auto px-4 text-center">
      <table className="w-full mx-auto">
        <thead>
          <tr className="bg-primary font-semibold text-start py-3 text-sm sm:text-lg">
            <th className="p-2">Products</th>
            <th className="p-2">Title</th>
            <th className="p-2">Old Price</th>
            <th className="p-2">New Price</th>
            <th className="p-2">Category</th>
            <th className="p-2">Remove</th>
          </tr>
        </thead>

        <tbody>
          {allProducts.map((product, i) => (
            <tr key={i} className="border-b border-slate-200 text-gray-600 py-4 text-sm font-medium">
              <td className="flex justify-start items-center sm:justify-center sm:items-center">
                <img
                  src={product.image}
                  alt=""
                  className="rounded-lg ring-1 ring-slate-200 my-1 h-12 w-12 object-cover"
                />
              </td>
              <td>
                <div className="line-clamp-3">{product.name}</div>
              </td>
              <td>₹{product.old_price}</td>
              <td>₹{product.new_price}</td>
              <td>{product.category}</td>
              <td>
                <div className="font-bold pl-6 sm:pl-14 text-red-600 text-lg">
                  <TbTrash onClick={() => remove_product(product.id)} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

}

export default ListProd
