import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Typography, Button, Select, Option, Input  ,Card, Textarea} from "@material-tailwind/react";
import RatingComp from "../components/Rating";
import Message from "../components/Message";
import { useGetProductDetailsQuery ,useCreateReviewMutation } from "../slices/productsApiSlice";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import {addToCart} from '../slices/cartSlice';
import {toast} from 'react-toastify';
import { Link } from 'react-router-dom'
const ProductPage = () => {
  const { id } = useParams();
  const {userInfo} = useSelector((state) => state.auth)
  const { data: product, refetch, isLoading, error } = useGetProductDetailsQuery(id);
  const [qty, setqty] = useState(1);
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const dispatch = useDispatch()
  const [createReview , {isLoading:loadingProductReview}] = useCreateReviewMutation()
  const handleCart =async ()=>{
    dispatch(addToCart({...product,qty}))
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createReview({
        productId : id,
        rating,
        comment,
        token : userInfo.token
      }).unwrap();
      refetch();
      toast.success('Review created successfully');
      setRating(0)
      setComment("")
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <h1>{error?.data?.message || error.error}</h1>
      ) : (
        <section class="pt-12 pb-24  overflow-hidden">
          <div class="container px-4 mx-auto ">
            <div class="flex flex-wrap -mx-4">
              <div class="w-full lg:w-1/2 px-4 mb-16 lg:mb-0 ">
                <div class="h-30 block mt-4 mr-2 sm:mr-0">
                  <img class="h-full w-full" src={product.image} alt="" />
                </div>
              </div>
              <div class="w-full lg:w-1/2 px-4">
                <div class="max-w-lg mb-6">
                  <span class="text-xs text-gray-400 tracking-wider">
                    APPLE #3299803
                  </span>
                  <h2 class="mt-6 mb-4 text-5xl md:text-3xl lg:text-4xl font-heading font-medium">
                    {product.name}{" "}
                  </h2>
                  <p class="flex items-center mb-6">
                    <Typography variant="h1" color="black" className="mb-2">
                      Rs {product.price}
                    </Typography>
                  </p>
                  <Typography
                    variant="paragraph"
                    size="lg"
                    color="gray"
                    className="mb-2 text-lg"
                  >
                    {product.description}
                  </Typography>
                </div>
                <RatingComp
                  value={product.rating}
                  reviewCount={product.numReviews}
                />
                <div class="my-10 w-1/2">
                  <Select
                    size="md"
                    color="blue"
                    label="Qty"
                    className="w-full"
                    value={qty.toString()}
                    onChange={(value) =>setqty(+(value))}
                    animate={{
                      mount: { y: 0 },
                      unmount: { y: 25 },
                    }}
                  >
                    {[...Array(product.countInStock).keys()].map((val) => (
                      <Option value={(val + 1).toString()} key={val+1}>
                        {val + 1}
                      </Option>
                    ))}
                  </Select>
                </div>
                <Button className="my-auto w-full py-5 mb-5 " onClick={handleCart}>
                  Add to Cart
                </Button>

              </div>
            </div>
          </div>
          <Typography variant="h1" className="flex items-center justify-center">Review</Typography>
          {product.review.length ===0 &&(<Message color={"red"}>No reviews</Message>)}
          <div className=" flex items-center ">
          {product.review.map((review) =>{
            return <div key={review._id} class="mb-2 rounded-t-8xl rounded-b-5xl overflow-hidden w-full px-6 shadow-lg rounde-lg ">
             <div class="pt-3 pb-3 md:pb-1 px-4 md:px-16 bg-white bg-opacity-40">
               <div class="flex flex-wrap items-center">
                 <h4 class="w-full md:w-auto text-xl font-heading font-medium">{review.name}</h4>
                 <RatingComp reviewCount ={1} value={review.rating}/>
               </div>
             </div>
             <div class="px-4 overflow-hidden md:px-16 pt-8 pb-12 bg-white">
               <div class="flex flex-wrap">
                 <div class="w-full md:w-2/3 mb-6 md:mb-0">
                   <p class="mb-8 max-w-2xl text-darkBlueGray-400 leading-loose"> {review.comment} </p>
                   <div class="-mb-2">
                     <div class="inline-flex w-full md:w-auto md:mr-2 mb-2">
                       <div class="flex items-center h-12 pl-2 pr-6 bg-green-100 border-2 border-green-500 rounded-full">
                         <span class="text-green-500 font-heading font-medium">{review.createdAt.substring(0,10)} </span>
                       </div>
                     </div>

                   </div>
                 </div>
               </div>
             </div>
           </div>
       
          })}
         </div>
         <div>
          {loadingProductReview && <Loader/>}
          {
            userInfo? (
              <Card
              className="p-10 bg-gray-50 mt-20  border-2 border-black flex flex-col justify-evenly items-center "
              color="white"
              shadow={false}
            >
              <Typography variant="h4" color="" className="theme-text-1">
                  Write a Review
              </Typography>
              <form onSubmit={handleSubmit}  className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 ">
                <div className="mb-4 flex flex-col gap-6">
                <Textarea
                    size="lg"
                    variant="standard"
                    type="text"
                    className="bg-transparent text-black font-bold"
                    name="name"
                    value={comment}
                    label="Comment"
                    onChange={(e)=>setComment(e.target.value)}
                    required
                  />
                   <Select label="Rating" size = "lg" value = {rating.toString()} onChange = {(value) =>  setRating(+value)} required>
                   <Option value="1">1</Option>
                   <Option value="2">2</Option>
              
                   <Option value="3">3</Option>
                   <Option value="4">4</Option>
                   <Option value="5">5</Option>
                 </Select> 
                </div>
                <Button
                  className="mt-6 btn-16 hover:shadow-2xl"
                  fullWidth
                  disabled={loadingProductReview}
                  type = "submit"
                >
                  Submit
                </Button>
              
              </form>
            </Card>
            ) : (
              <div className="mt-4">
              <Message  >Please Login Write Review <Link to="/login" className="link-underline">Login</Link></Message>
              </div>
            )
          }
         </div>
        </section>
      )}
    </>
  );
};
export default ProductPage;
