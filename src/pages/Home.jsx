import React , {useState , useEffect} from 'react'
import { Typography } from '@material-tailwind/react'
import Product from '../components/Product'
import {useGetProductsQuery} from '../slices/productsApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import ProductCarousel from '../components/ProductCarousel';
import { useParams } from 'react-router-dom';
const Home = () => {
    const {keyword} = useParams()
    const {data:products , isLoading ,error} = useGetProductsQuery({ keyword: keyword || '' })
  return (
    <>
    {isLoading ? <Loader/> : error ? (<Message color = "red">{error?.data?.message || error.error }</Message>) :(<>        
        <div>
        <div className="flex items-center justify-center bg-gray-50 h-[500px] ">
  <div className="h-full w-2/3 ">
    <ProductCarousel />
  </div>
</div>

        <Typography  color="black" className="text-3xl my-10 flex items-center justify-center">
            Latest Product
        </Typography>
        <div className="grid content-center  justify-center lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-2 md:gap-y-3">
            {
                products.map((product)=>{
                    return <Product key={product._id} product={product} />;
                })
            }
        </div>
    </div>
        </>)}
</>
   
  )
}
export default Home