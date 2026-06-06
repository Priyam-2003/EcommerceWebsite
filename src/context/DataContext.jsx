import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export const DataContext = createContext(null);

export const DataProvider = ({children})=>{
    const [data,setData] = useState([]);
    // Fetching all Products from API
    const fetchAllProducts = async()=>{
        try {

            const res = await axios.get('https://dummyjson.com/products?limit=194');
            const productsData = res.data.products;
            setData(productsData);
        } catch (error) {
            console.log(error);
        }
    }
        const getCatagory = (data,category) =>{
            let newVal = data?.map((curr)=>{
                return curr[category];
            })
            return [...new Set(newVal)];
        }
        const allCategory = getCatagory(data,"category");
        const categoryData = ["All", ...(allCategory?.slice(5, 10) || [])];
        const allBrand = getCatagory(data,"brand");
        const brandData = ["All",...(allBrand?.filter((item, i) => i !== 14) || [])];
    return <DataContext.Provider value={{data,setData,fetchAllProducts,categoryData,brandData}}>
{children}
    </DataContext.Provider>
}

export const getData = () => useContext(DataContext);