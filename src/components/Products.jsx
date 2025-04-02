import React, { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router'
import { useFilter } from '../hooks/useFilter';
import ProductCard from './ProductCard';
import { useSearch } from '../hooks/useSearch';
import NoDataFound from './NoDataFound';

const Products = () => {
  const [query,setQuery] = useState('');
  const data = useOutletContext();
  const [sortedArray,setSortedArray] = useState([]);
  // console.log(data.searchQuery)
  useEffect(()=>{
    setSortedArray(data.allProducts)
  },[data.allProducts])
  const allProducts = useFilter(sortedArray,(el)=>el.category,query);
  const filteredProduct = useSearch(allProducts,data.searchQuery);
  return (
    <div>
      <div className='flex justify-between'>
        <select name="" id="" className='outline-0 border border-gray-400 py-1 px-4 rounded-sm' onChange={(e)=> setQuery(e.target.value)}>
          <option value="" hidden className='hover:bg-green-500' >Select Category</option>
          <option value="">All</option>
          <option value="men's clothing">Men's Clothing</option>
          <option value="women's clothing">Women's Clothing</option>
          <option value="jewelery">Jewelery</option>
          <option value="electronics">Electronics</option>

        </select>
        <div className='filterProduct flex gap-2'>
           <div className='border border-gray-400 flex gap-3 py-1 px-4 cursor-pointer' onClick={()=>{
             setSortedArray([...sortedArray].sort((a,b)=> a.price-b.price))
           }}>
            <p>Low to High</p>
            <div>
            <i className="fa-solid fa-arrow-up"></i>
            <i className="fa-solid fa-arrow-down"></i>
            </div>
           </div>
           <div className='border border-gray-400 flex gap-3 py-1 px-4 cursor-pointer' onClick={()=>{
            setSortedArray([...sortedArray].sort((a,b)=> b.price-a.price))
           }}>
            <p>High to Low</p>
            <div>
            <i className="fa-solid fa-arrow-up"></i>
            <i className="fa-solid fa-arrow-down"></i>
            </div>
           </div>
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 '>
        {
          filteredProduct && filteredProduct.length>0?(
            filteredProduct.map((item,i)=> {
              return <ProductCard key={i} item={item} allProducts={data.allProducts}/>
            })
          ):(
            <NoDataFound/>
          )
        }
      </div>
    </div>
  )
}

export default Products
