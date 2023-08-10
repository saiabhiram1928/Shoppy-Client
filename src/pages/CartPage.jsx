import React from "react";
import { Typography , Button, Stepper } from "@material-tailwind/react";
import { useSelector } from "react-redux";
import Message from "../components/Message";
import { Link, useNavigate } from "react-router-dom";
import ItemCard from '../components/ItemCard.jsx'
import StepperComp from "../components/Stepper";
const CartPage = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const naviagate = useNavigate()
  const handleCheckout = ()=>{
    naviagate('/login?redirect=/shipping')
  }
  return (
    <>
    <div className="mt-10">
      <StepperComp home = {true}/>
      <Typography variant="h1" className="mb-10 mt-2 text-center font-bold">
        Shopping Cart
      </Typography>
      {cartItems.length === 0 ? (
        <Message>
          {" "}
          Your cart is empty ,{" "}
          <Link to="/" className=" underline">
            Go back
          </Link>{" "}
        </Message>
      ) : (
        <div className="mx-auto  max-w-7xl justify-center px-6 md:flex md:space-x-10 xl:px-0">
          <div className="rounded-lg md:w-2/3">
            {cartItems.map((item) => {
              return <ItemCard item={item} />;
            })}
          </div>
          <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
            <div className="mb-2 flex justify-between">
              <Typography className="text-gray-700 font-bold">Subtotal - ({cartItems.reduce((a,c) => a+c.qty , 0)} items)</Typography>
              <p className="text-gray-700">Rs {cartItems.reduce((a,c) => a+c.price*c.qty , 0)} </p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-700">Shipping</p>
              <p className="text-gray-700">Free</p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between">
              <p className="text-lg font-bold">Total</p>
              <div className="">
                <p className="mb-1 text-lg font-bold">Rs {cartItems.reduce((a,c) => a+c.price*c.qty , 0)}</p>
              </div>
            </div>
            <Button onClick = {handleCheckout} className="mt-6 w-full rounded-md py-4 font-medium">
              Proceed to Check Out
            </Button>
          </div>
        </div>
      )}
    </div>
    </>
  );
};
export default CartPage;
