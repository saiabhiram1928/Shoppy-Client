import React,{useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { Typography ,Button , Card , List , ListItem , ListItemPrefix , Avatar} from '@material-tailwind/react'
import { Link } from 'react-router-dom'
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import {useGetOrderDetailsQuery , usePayOrderMutation, useGetPaypalClientIdQuery} from '../slices/ordersApiSlice';
import {toast} from 'react-toastify';
const ViewOrder = () => {
    const {id :orderId} = useParams()
    const {userInfo}= useSelector((state)=> state.auth)
    let token = userInfo.token
    const {data:order, refetch , isLoading , error} = useGetOrderDetailsQuery({id: orderId , token})
    const [payOrder, {isLoading:loadingPay}] = usePayOrderMutation()
    const [{isPending} , paypalDispatch] = usePayPalScriptReducer()
    const{data:paypal, isLoading:loadingPayPal ,error:errorPayPal} =useGetPaypalClientIdQuery()
    useEffect(()=>{
        if(!errorPayPal && !loadingPayPal && paypal.clientId){
            const loadPayPalScript = async ()=>{
                paypalDispatch({
                    type : "resetOptions",
                    value:{
                        'client-id' :paypal.clientId,
                        currency : "USD",
                    }
                })
                paypalDispatch({type : "setLoadingStatus" ,value:"pending"})
            }
            if(order && !order.isPaid) {
                if(!window.paypal) loadPayPalScript()
            }
        }
    } , [order,paypal,paypalDispatch ,loadingPayPal , errorPayPal])

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details });
        refetch();
        toast.success('Order is paid');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    });
  }

  // TESTING ONLY! REMOVE BEFORE PRODUCTION
  async function onApproveTest() {
   const res= await payOrder({ orderId, details: { payer: {} , token : token} });
   console.log(res)
    refetch();
    toast.success('Order is paid');
  }

  function onError(err) {
    toast.error(err.message);
  }

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: order.totalPrice },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  }

  const deliverHandler = async () => {
    await deliverOrder(orderId);
    refetch();
  };

  return  isLoading ? ( <Loader/>) : error ? (<Message> {error?.data?.message || error.error} </Message>) : (
            <>
             <div className="max-h-full flex md:flex-row flex-col ">
      <div className="w-2/3">
        <div className='px-10 py-2 '>
          <Typography variant="h4" className="mb-5 flex justify-center items-center">Shipping Details</Typography>
          <Typography variant="paragraph"><span className="font-bold mr-2">Name:</span>{order.user.name}</Typography> <Typography variant="paragraph"><span className="font-bold mr-2">email:</span>{order.user.email}</Typography>
          <Typography variant="paragraph"><span className="font-bold mr-2">Adreess:</span>
          {order.shippingAddress.address} ,{"  "}{order.shippingAddress.city} , {" "}  {order.shippingAddress.postalCode} , { " " } {order.shippingAddress.country}</Typography>
          {
            order.isDelivered ? ( <Message >
                The package Delivered
            </Message> ): (
                <Message color="red">
                    Not Delivered
                </Message>
            )
          }
          <hr class="h-px mt-8 border-0 bg-gray-700"></hr>
        </div>
        <div className='px-10 py-2'>
          <Typography variant="h4" className="mb-5 flex justify-center items-center">Payment Method</Typography>
          <Typography variant="paragraph"><span className="font-bold mr-2">Method:</span>{order.paymentMethod}</Typography>
          {
            order.isPaid ? ( <Message >
                Paid
            </Message> ): (
                <Message color="red">
                    Not Paid
                </Message>
            )
          }
          <hr class="h-px mt-8 border-0 bg-gray-700"></hr>
        </div> 
        <div className='px-10 py-2'>
          <Typography variant="h4" className="mb-5 flex justify-center items-center">Order Items</Typography>
        <Card>
      <List>

          {
            order.orderItems.map((item , index)=>{
              console.log(item)
             return <ListItem ripple={false} className="hover:bg-none cursor-default flex items-center justify-between px-20">
          <div className='flex justify-center items-center'>
          <ListItemPrefix>
            <Avatar variant="circular" alt="candice" src={item.image} />
          </ListItemPrefix>
          <div>
            <Typography variant="h6" color="blue-gray" className="hover:underline">
              <Link to = {`/product/${item.product}`}>
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
        
      </List>
    </Card>
          <hr class="h-px mt-8 border-0 bg-gray-700"></hr>
        </div>
       
      </div>
      <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
            <div className="mb-2 flex justify-between">
              <Typography className="text-gray-700 font-bold">Subtotal</Typography>
              <p className="text-gray-700">Rs {order.itemsPrice} </p>
            </div>
            <div className="flex justify-between mt-5">
              <p className="text-gray-700">Shipping</p>
              <p className="text-gray-700">Rs {order.shippingPrice}</p>
            </div>
            <div className="flex justify-between mt-5">
              <p className="text-gray-700">Tax</p>
              <p className="text-gray-700">Rs {order.taxPrice}</p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between">
              <p className="text-lg font-bold">Total</p>
              <div className="">
                <p className="mb-1 text-lg font-bold">Rs {order.totalPrice}</p>
              </div>
            </div>
            {
                !order.isPaid && <>
                {loadingPay && <Loader/>}
                {isPending ? <Loader/> :(
                   <div>
                   {/* THIS BUTTON IS FOR TESTING! REMOVE BEFORE PRODUCTION! */}
                   <Button
                   className='mb-[10px]'
                     onClick={onApproveTest}
                   >
                     Test Pay Order
                   </Button>

                   <div>
                     <PayPalButtons
                       createOrder={createOrder}
                       onApprove={onApprove}
                       onError={onError}
                     ></PayPalButtons>
                   </div>
                 </div>
                )}

                </>
            }
          </div>
    </div>
            </>
        )
}
export default ViewOrder