import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import loading from "../assets/loading2.webm"
import { ChevronLeft } from 'lucide-react';
import ProductListView from '../Components/ProductListView';

const CategoryProducts = () => {
    const params = useParams();
    const category = params.category
    const [categoryData,setCategoryData] = useState([]);
    const navigate = useNavigate();
    
    const getCatagoryData = async ()=>{
        try {
            const res = await axios.get(`https://dummyjson.com/products/category/${category}`);
            const data = res.data.products;
            setCategoryData(data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
    getCatagoryData();
    window.scrollTo(0,0);
    },[])
    
  return (
    <div>
      {
        categoryData.length > 0 ? (
        <div className='max-w-6xl mx-auto mt-10 mb-10 px-4 '>
            <button 
            onClick={()=>navigate('/')}
            className='bg-gray-800 mb-5 text-white px-3 py-1 rounded-md cursor-pointer flex gap-1 items-center'><ChevronLeft/>Back</button>
            {
                categoryData.map((item)=>{
                    return(
                        <ProductListView key={item.id} item={item}/>
                    )
                })
            }
        </div>
    ):(
    <div className='flex items-center justify-center h-100'>
        <video muted autoPlay loop>
            <source src={loading} type='video/webm'/>
        </video>
    </div>
)
      }
    </div>
  )
}

export default CategoryProducts
