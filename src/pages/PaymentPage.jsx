import React,{useEffect , useState} from "react";
import {
    Button,
    Card,
    Radio, Typography
} from "@material-tailwind/react";
import StepperComp from "../components/Stepper";
import { useDispatch , useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {savePaymentMethod} from '../slices/cartSlice';

 

const PaymentPage = () =>{
    const [paymentMethod, setpaymentMethod] = useState('PayPal')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cart = useSelector((state) => state.cart)
  const {shippingAddress} = cart
  useEffect(() => {
    if(shippingAddress.address.length == 0 && shippingAddress.city.length == 0 && shippingAddress.postalCode.length == 0 && shippingAddress.country.length == 0){
        console.log("redirected to shipping")
        navigate('/shipping')
    }
  }, [shippingAddress , navigate])
  const handleSubmit = ()=>{
    dispatch(savePaymentMethod(paymentMethod))
    navigate('/placeorder')
  }
  return (
    <div className="flex flex-col">
        <StepperComp home shipping payment/>
    <div className="flex max-w-full mt-2  my-auto items-center flex-col justify-center">
    <Typography variant="h5" className="mb-5">Please Select Payment type</Typography> 
    
    <Radio name="type" label="Paypal" defaultChecked/>
    <Radio name="type" label="Stripe"  disabled/>
  </div>
  <div className="flex items-end justify-center mt-10">
  <Button className="btn-16"  onClick={handleSubmit}>Continue</Button>
  </div>
  
  </div>
  );
}
export default PaymentPage 