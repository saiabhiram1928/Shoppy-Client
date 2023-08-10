import React,{useState} from "react";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Input,
  Collapse,
  Badge,
} from "@material-tailwind/react";
import { Cart, LoginIn } from "./icons";
import { Link, useNavigate } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux';
import ProfileMenu from "../ProfileMenu";
import {logout} from '../../slices/authSlice';
import {useLogoutMutation} from '../../slices/usersApiSlice';
import {toast} from 'react-toastify';

 const Header =()=> {
  const [openNav, setOpenNav] = React.useState(false);
  const [searchText, setSearchText] = useState("")
 const dispatch = useDispatch()
 const navigate = useNavigate()
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);
  const [logoutApiCall] =useLogoutMutation()
 const {cartItems } = useSelector((state) => state.cart)
 const {userInfo } = useSelector((state) => state.auth)

  const handleLogout =async ()=>{
    console.log("logut called" , userInfo.token)
    try {
      await logoutApiCall({token : userInfo.token}).unwrap()
      dispatch(logout())
      window.location.pathname = '/login'
    } catch (error) {
      toast.error(error?.data?.message || error.error)
    }
  }
 const handleSearch = ()=>{
if(searchText.trim()) navigate(`/search/${searchText.trim()}`)
else navigate('/')
 }
 
  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-8">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link to="/cart" className="flex items-center">
        <Badge content= {cartItems.reduce((a,c) => a+c.qty , 0)} placement="top" withBorder>
          <div className="p-2 flex justify-center items-center ">
          <Cart  />
          </div>
        </Badge>
        </Link>
      </Typography>
      {
        userInfo ? (  
          <ProfileMenu handleLogout={handleLogout}/>
        ) : (  <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link to="/login" className="flex items-center">
          <LoginIn/>
          LogIn
        </Link>
      </Typography>)
      }
    
    </ul>
  );
 
  return (
    <Navbar className="mx-auto bg-inherit max-w-full py-2 px-4 lg:px-8 lg:py-4">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <Typography
          className="mr-4 cursor-pointer py-1.5 font-medium"
        >
          <Link to="/">Shopy</Link>
          
        </Typography>
        <div className="hidden lg:block w-1/3 "> 
         <div className="relative flex w-full gap-2 md:w-full">
          <Input
            type="search"
            label="Type here..."
            className="pr-20"
            containerProps={{
              className: "min-w-[288px]",
            }}
            value = {searchText}
            onChange = {(e) => setSearchText(e.target.value)}
          />
          <Button size="sm" onClick={handleSearch} className="!absolute right-1 top-1 rounded">
            Search
          </Button>
        </div>
        </div>
        <div className=" ml-0 lg:block hidden">
        {navList}
        </div>
        <div className="flex lg:hidden justify-center items-center ">
        <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 mr-10  block lg:hidden font-normal"
      >
        <Link to="/cart" className="flex items-center">
        <Badge content= {cartItems.reduce((a,c) => a+c.qty , 0)} placement="top" withBorder>
          <div className="p-2 flex justify-center items-center ">
          <Cart  />
          </div>
        </Badge>
        </Link>
      </Typography>
        <IconButton
          variant="text"
          className="h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
        </div>
       
      </div>
      <Collapse open={openNav}>
        <div className="container mx-auto">
        <div className="block my-2 "> 
         <div className="relative flex w-full gap-2 md:w-full">
          <Input
            type="search"
            label="Type here..."
            className="pr-20"
            containerProps={{
              className: "min-w-[288px]",
            }}
            value = {searchText}
            onChange = {(e) => setSearchText(e.target.value)}
          />
          <Button onClick={handleSearch}  size="sm" className="!absolute right-1 top-1 rounded" >
            Search
          </Button>
        </div>
        </div>
        
        {userInfo ? (
            <div className="flex mt-5 mb-2">
            <Typography
              as="li"
              variant="small"
              className="p-3  w-1/2 mr-1 border-2 z-10 hover:text-blue rounded-lg font-normal link link-underline link-underline-black text-blue-600 shadow-lg shadow-cyan-500/50"
            >
              <Link to="/profile" className="flex items-center">
                My Profile
              </Link>
            </Typography> 
            <Button color="white" className="p-3 bg-none  w-1/2 mr-1 border-2 z-10 hover:text-blue rounded-lg font-normal link link-underline link-underline-black text-blue-600 shadow-lg shadow-cyan-500/50">
              Logout
            </Button>
            </div>
          ) : (
            <Button variant="gradient" size="sm" fullWidth className="mb-2">
              <span>Login</span>
            </Button>
          )}
        </div>
      </Collapse>
    </Navbar>
  );
}
export default Header