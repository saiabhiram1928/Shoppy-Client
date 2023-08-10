import React,{useState , useEffect} from 'react'
import StepperComp from '../components/Stepper'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Typography ,Button , Card , List , ListItem , ListItemPrefix , Avatar} from '@material-tailwind/react'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {useCreateOrderMutation} from '../slices/ordersApiSlice'
import { clearCartItems } from '../slices/cartSlice'
import {toast} from 'react-toastify';
const OrderPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const cart = useSelector((state)=> state.cart)
    const {userInfo} = useSelector((state)=> state.auth)
    const {shippingAddress , paymentMethod} = cart
    useEffect(() => {
        if(shippingAddress.address.length == 0 && shippingAddress.city.length == 0 && shippingAddress.postalCode.length == 0 && shippingAddress.country.length == 0){
            console.log("redirected to shipping")
            navigate('/shipping')
        }else if(!paymentMethod){
            navigate('/payment')
        }
      }, [shippingAddress ,paymentMethod ,navigate])
      const [createOrder , {isLoading ,error}] = useCreateOrderMutation()

      const handlePlaceOrder= async ()=>{
        let token = userInfo.token
        try {
          const res =await createOrder({
            orderItems : cart.cartItems,
            shippingAddress : cart.shippingAddress,
            paymentMethod : cart.paymentMethod,
            itemsPrice  : cart.itemsPrice,
            shippingPrice : cart.shippingPrice,
            taxPrice :  cart.taxPrice,
            totalPrice : cart.totalPrice,
            token
          }).unwrap()
          dispatch(clearCartItems());
          navigate(`/order/${res._id}`)
        } catch (error) {
          console.log(error)
          toast.error(error)
        }
      }
  return (
    <>
    <StepperComp home shipping payment  placeorder />
    <div className="max-h-full flex md:flex-row flex-col ">
      {error  && <Message>{error}</Message>}
      <div className="w-2/3">
        <div className='px-10 py-2 '>
          <Typography variant="h4" className="mb-5 flex justify-center items-center">Shipping Details</Typography>
          <Typography variant="paragraph"><span className="font-bold mr-2">Adreess:</span>{shippingAddress.address}</Typography>
          <hr class="h-px mt-8 border-0 bg-gray-700"></hr>
        </div>
        <div className='px-10 py-2'>
          <Typography variant="h4" className="mb-5 flex justify-center items-center">Payment Method</Typography>
          <Typography variant="paragraph"><span className="font-bold mr-2">Method:</span>{paymentMethod}</Typography>
          <hr class="h-px mt-8 border-0 bg-gray-700"></hr>
        </div> 
        <div className='px-10 py-2'>
          <Typography variant="h4" className="mb-5 flex justify-center items-center">Order Items</Typography>
        <Card>
      <List>
        {
          cart.cartItems.length === 0 ? (<Message>Your cart is empty</Message>) : (<>
          {
            cart.cartItems.map((item , index)=>{
             return <ListItem ripple={false} className="hover:bg-none cursor-default flex items-center justify-between px-20">
          <div className='flex justify-center items-center'>
          <ListItemPrefix>
            <Avatar variant="circular" alt="candice" src={item.image} />
          </ListItemPrefix>
          <div>
            <Typography variant="h6" color="blue-gray" className="hover:underline">
              <Link to = {`/product/${item._id}`}>
                {item.name}
              </Link>
            </Typography>
          </div>
          </div>
         <div>
          <Typography> {item.qty} x Rs {item.price}  =  Rs {item.qty * item.price}</Typography>
         </div>
        </ListItem>
            })
          }
          </>)
        }
        
      </List>
    </Card>
          <hr class="h-px mt-8 border-0 bg-gray-700"></hr>
        </div>
       
      </div>
      <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
            <div className="mb-2 flex justify-between">
              <Typography className="text-gray-700 font-bold">Subtotal</Typography>
              <p className="text-gray-700">Rs {cart.itemsPrice} </p>
            </div>
            <div className="flex justify-between mt-5">
              <p className="text-gray-700">Shipping</p>
              <p className="text-gray-700">Rs {cart.shippingPrice}</p>
            </div>
            <div className="flex justify-between mt-5">
              <p className="text-gray-700">Tax</p>
              <p className="text-gray-700">Rs {cart.taxPrice}</p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between">
              <p className="text-lg font-bold">Total</p>
              <div className="">
                <p className="mb-1 text-lg font-bold">Rs {cart.totalPrice}</p>
              </div>
            </div>
            <Button onClick={handlePlaceOrder} disabled={cart.cartItems.length === 0} className="mt-6 w-full rounded-md py-4 font-medium">
              Place Order
            </Button>
            {isLoading &&  <Loader/>}
          </div>
    </div>
    
    </>
  )
}
export default OrderPage