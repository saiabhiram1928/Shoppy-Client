import React, { useState, useEffect } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { setCredentials } from "../slices/authSlice";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { toast } from "react-toastify";
const RegisterPage = () => {
  const dispath = useDispatch();
  const navigate = useNavigate();
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";
  const [register , { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const [formData, setformData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [confirmPassword, setconfirmPassword] = useState("")
  useEffect(() => {
    if (userInfo) navigate(redirect);
  }, [userInfo, redirect, navigate]);

  const handleFormData = (e) => {
    const { name, value } = e.target;
    setformData((prev) => ({
      ...prev,
      [name]: value.trim(),
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(formData.password !== confirmPassword){
        toast.error("passwords didnt match", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            theme: "dark",
          });
          return ;
    }else{
    try {
      const res = await register({ ...formData }).unwrap();
      dispath(setCredentials({ ...res }));
      navigate(redirect);
    } catch (error) {
      toast.error(error?.data?.message || error.error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "dark",
      });
    }
}
  };
  return (
    <section className="flex  items-center justify-center mt-2 py-5 px-2">
        {isLoading ? <Loader /> : (  
            <Card
        className="p-10 bg-gray-50  border-2 border-black flex flex-col justify-evenly items-center "
        color="white"
        shadow={false}
      >
        <Typography variant="h4" color="" className="theme-text-1">
            signUp
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
              name="name"
              value={formData.name}
              label="Full Name"
              onChange={handleFormData}
              required
            />
            <Input
              size="lg"
              type="email"
              className="bg-transparent text-black font-bold"
              name="email"
              value={formData.email}
              label="Email"
              onChange={handleFormData}
              required
            />
            <Input
              type="password"
              className="text-black font-bold"
              name="password"
              value={formData.password}
              size="lg"
              label="Password"
              onChange={handleFormData}
              required
            />
             <Input
              type="password"
              className="text-black font-bold"
              name="confirmPassword"
              value={confirmPassword}
              size="lg"
              label="ConfirmPassword"
              onChange={(e)=> setconfirmPassword(e.target.value)}
              required
            />
          </div>
          <Button
            className="mt-6 btn-16 hover:shadow-2xl"
            fullWidth
            disabled={isLoading}
            type = "submit"
          >
            Register
          </Button>
        
        </form>
        <Typography color="gray" className="mt-4 text-center font-normal">
          Already Have one?{" "}
          <Link
            to={redirect ? `/login?redirect=${redirect}` : "/login"}
            className="font-medium text-blue-500 transition-colors hover:text-blue-700"
          >
            Login
          </Link>
        </Typography>
      </Card>)}
   
    </section>
  );
};
export default RegisterPage;
