import React, { useState, useEffect } from "react";
import {Card, Input, Button, Typography} from '@material-tailwind/react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {saveShippingAddress} from '../slices/cartSlice';
import StepperComp from "../components/Stepper";
const ShippingPage = () => {
    const cart = useSelector((state) => state.cart)
    const {shippingAddress} =cart
    const [formData, setformData] = useState({
        address : shippingAddress?.address || "",
        city : shippingAddress?.city || "",
        postalCode: shippingAddress?.postalCode || "",
        country : shippingAddress?.country || "",
      });
      const navigate = useNavigate()
      const dispatch = useDispatch()
    
      const handleFormData=(e)=>{
        const { name, value } = e.target;
        setformData((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
      const handleSubmit=(e)=>{
        e.preventDefault()
        console.log("submitteed")
        dispatch(saveShippingAddress({...formData}))
        navigate('/payment')
      }
    return (
    // <!-- component -->
    <section className="flex flex-col items-center justify-center mt-2 py-5 px-2">
      <StepperComp home={true} shipping={true}/>
  <Card
        className="p-10 bg-gray-50  border-2 border-black flex flex-col justify-evenly items-center "
        color="white"
        shadow={false}
      >
        <Typography variant="h1" color="" className="theme-text-2">
            Shipping Adress
        </Typography>
        <Typography color="white" className="mt-1 font-normal">
          Welcome Back!
        </Typography>
        <form onSubmit={handleSubmit} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 ">
          <div className="mb-4 flex flex-col gap-6">
          <Input
              size="lg"
              type="text"
              className="bg-transparent text-black font-bold"
              name="address"
              value={formData.address}
              label="Adress"
              onChange={handleFormData}
              required
            />
            <Input
              size="lg"
              type="text"
              className="bg-transparent text-black font-bold"
              name="city"
              value={formData.city}
              label="City"
              onChange={handleFormData}
              required
            />
            <Input
              type="text"
              className="text-black font-bold"
              name="postalCode"
              value={formData.postalCode}
              size="lg"
              label="PostalCode"
              onChange={handleFormData}
              required
            />  <Input
              type="text"
              className="text-black font-bold"
              name="country"
              value={formData.country}
              size="lg"
              label="Country"
              onChange={handleFormData}
              required
            />

          </div>
          <Button
            className="mt-6 btn-16 hover:shadow-2xl"
            fullWidth
            type="submit"
          >
            Continue
          </Button>
        
        </form>

      </Card>

    {/* <a href="https://www.buymeacoffee.com/dgauderman" target="_blank" className="md:absolute bottom-0 right-0 p-4 float-right">
      <img src="https://www.buymeacoffee.com/assets/img/guidelines/logo-mark-3.svg" alt="Buy Me A Coffee" className="transition-all rounded-full w-14 -rotate-45 hover:shadow-sm shadow-lg ring hover:ring-4 ring-white"/>
    </a> */}
    </section>
  )
}
export default ShippingPage