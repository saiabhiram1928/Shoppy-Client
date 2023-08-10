import React from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
  } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import RatingComp from "./Rating";
const Product = ({product}) => {
  
  return (
    <Card className="my-5 md:w-80 lg:w-96 mx-auto w-80 border-2 border-black flex flex-col justify-evenly items-center">
      <CardHeader color="blue-gray" className="relative lg:h-60 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110  duration-300 h-50">
        <Link to={`/product/${product._id}`}>
        <img
          src={product.image}
          alt="card-image"
        />
        </Link>
       
      </CardHeader>
      <CardBody>
        <Typography variant="h5" color="black" className="mb-2 ">
            <Link className="hover:decoration-solid hover:underline" to={`/product/${product._id}`}>
              {product.name}
            </Link>
        </Typography> 
        <Typography variant="h2" color="black" className="mb-2 tex">
        Rs {product.price}
        </Typography>

        <RatingComp value={product.rating} reviewCount={product.numReviews}/>
      </CardBody>
      <CardFooter className="pt-0 w-full">
      <Link to = {`/product/${product._id}`}>
        <Button className="my-auto w-full" >
          Buy Now
        </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
export default Product