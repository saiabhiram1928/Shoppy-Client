import React from "react";
import { ButtonGroup, Button, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
 
const StepperComp = ({home, shipping , payment , placeorder}) =>{
    const navigate = useNavigate()
    const handleStepper = (e)=>{
        console.log(e.target.name)
        navigate(e.target.name)
    }
  return (
    <ButtonGroup variant="text" size = 'lg' className='mb-10' fullWidth>
    <Button name="/" onClick = {handleStepper} disabled={!home}>Home</Button>
    <Button name="/shipping" onClick = {handleStepper} disabled={!shipping}>Shipping</Button>
    <Button name="/payment"  onClick = {handleStepper} disabled={!payment}>Payment</Button>
    <Button name="/placeorder"  onClick = {handleStepper} disabled={!placeorder}>Place Order</Button>
  </ButtonGroup>
  );
}
export default StepperComp