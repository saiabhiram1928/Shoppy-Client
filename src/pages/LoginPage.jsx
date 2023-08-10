import React, { useState, useEffect } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { setCredentials } from "../slices/authSlice";
import { useLoginMutation } from "../slices/usersApiSlice";
import { toast } from "react-toastify";
const LoginPage = () => {
  const dispath = useDispatch();
  const navigate = useNavigate();
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";
  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });
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
    try {
      const res = await login({ ...formData }).unwrap();
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
  };
  return (
    <section className="flex  items-center justify-center py-20">
        {isLoading ? <Loader /> : (   <Card
        className="p-10 bg-gray-50  border-2 border-black flex flex-col justify-evenly items-center "
        color="white"
        shadow={false}
      >
        <Typography variant="h4" color="" className="theme-text-1">
          Login
        </Typography>
        <Typography color="white" className="mt-1 font-normal">
          Welcome Back!
        </Typography>
        <form onSubmit={handleSubmit} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 ">
          <div className="mb-4 flex flex-col gap-6">
            <Input
              size="lg"
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
          </div>
          <Button
            className="mt-6 btn-16 hover:shadow-2xl"
            fullWidth
            disabled={isLoading}
            type= "submit"
          >
            Login
          </Button>
        
        </form>
        <Typography color="gray" className="mt-4 text-center font-normal">
          Don't Have one?{" "}
          <Link
            to={redirect ? `/register?redirect=${redirect}` : "/register"}
            className="font-medium text-blue-500 transition-colors hover:text-blue-700"
          >
            Register
          </Link>
        </Typography>
      </Card>)}
   
    </section>
  );
};
export default LoginPage;
