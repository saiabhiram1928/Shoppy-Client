import { Carousel, Typography } from "@material-tailwind/react";
import {useGetTopProductsQuery} from '../slices/productsApiSlice';
import { Link } from 'react-router-dom'
import Loader from './Loader'; 
import Message from './Message'; 

const ProductCarousel = () => {
    const {data:products , isLoading, error} = useGetTopProductsQuery()
    console.log(products ,error)
  return isLoading ? (<Loader/>) : error ? (<Message color = "red"> {error?.data?.message|| error.error} </Message>) :( 
  <Carousel
  autoplay = {true}
  autoplayDelay={5000}
  loop={true}
    className="rounded-xl"
    navigation={({ setActiveIndex, activeIndex, length }) => (
      <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
        {new Array(length).fill("").map((_, i) => (
          <span
            key={i}
            className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
              activeIndex === i ? "w-10 bg-black" : "w-4 bg-blue-500/50"
            }`}
            onClick={() => setActiveIndex(i)}
          />
        ))}
      </div>
    )}
  >
    {
        products.map((product)=>(
            <>
            <img
            src={product.image}
            alt="image 1"
            className="h-full w-full object-cover"
          />
          {/* <Typography variant="h4"><Link to={`/product/${product._id}`}> {product.name} </Link> </Typography> */}
          </>
        ))
    }
   

  </Carousel>)
   

}
export default ProductCarousel