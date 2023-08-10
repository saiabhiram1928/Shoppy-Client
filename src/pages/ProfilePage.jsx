import React,{useState , useEffect} from 'react'
import {useProfileMutation, useUpdateUserMutation} from '../slices/usersApiSlice';
import {useGetMyOrdersQuery} from '../slices/ordersApiSlice';
import {setCredentials} from '../slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { toast } from "react-toastify";
import Loader from '../components/Loader';
import { Link } from 'react-router-dom';
const ProfilePage = () => {
  const [formData, setformData] = useState({
    email : "",
    name: "",
    password: "",
  })
  const [confirmPassword, setconfirmPassword] = useState("")
  const dispatch = useDispatch()
  const {userInfo}= useSelector((state)=> state.auth)
  const [updateProfile ,{isLoading:loadingUpdateProfile}] = useProfileMutation()
  const {data:orders, isLoading , error} = useGetMyOrdersQuery({token : userInfo.token})
  console.log(orders)
  useEffect(() => {
    if(userInfo){
      setformData((prev)=>({
        ...prev,
        name : userInfo.name,
        email : userInfo.email
      }))
      
    }
  }, [userInfo ,userInfo.name , userInfo.email])
  const handleFormData = (e) => {
    const { name, value } = e.target;
    setformData((prev) => ({
      ...prev,
      [name]: value.trim(),
    }));
  };
  const handleSubmit =async (e)=>{
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
    }

    try {
      const res = await updateProfile({ ...formData ,token : userInfo.token ,id:userInfo._id }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success("profile updated")
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
const TABLE_HEAD = ["id", "Date", "Total", "Paid" ,"Delivered"];
  
  return (
    <section className="flex flex-col items-center  justify-center   w-full "> 
    {
      loadingUpdateProfile ? <Loader/> : ( <Card
        className=" bg-gray-50  flex flex-col justify-evenly items-center w-full"
        color="white"
        shadow={false}
      >
        <Typography variant="h4" color="" className="theme-text-1">
          User Profile
        </Typography>
        <Typography color="white" className="mt-1 font-normal">
          Welcome Back!
        </Typography>
        <form onSubmit={handleSubmit} className="mt-8 mb-2 w-96 sm:w-full px-10">
          <div className="mb-4 flex flex-col gap-6">
          <Input
              size="lg"
              type="text"
              className="bg-transparent text-black font-bold"
              name="name"
              value={formData.name}
              label="Full Name"
              onChange={handleFormData}
            />
            <Input
              size="lg"
              type="email"
              className="bg-transparent text-black font-bold"
              name="email"
              value={formData.email}
              label="Email"
              onChange={handleFormData}
            />
            <Input
              type="password"
              className="text-black font-bold"
              name="password"
              value={formData.password}
              size="lg"
              label="Password"
              onChange={handleFormData}
            />
             <Input
              type="password"
              className="text-black font-bold"
              name="confirmPassword"
              value={confirmPassword}
              size="lg"
              label="ConfirmPassword"
              onChange={(e)=> setconfirmPassword(e.target.value)}
            />
          </div>
          <Button
            className="mt-6 btn-16 hover:shadow-2xl"
            fullWidth
            type = "submit"
          >
            Update
          </Button>
        
        </form>
      </Card>)
    }
    <Typography variant="h1" className="flex items-center justify-center m-5">Orders List</Typography>
    <div className='w-full mt-5 h-full flex items-start justify-start'>
    {
      isLoading ? (<Loader/>) : (<Card className="w-full h-full overflow-scroll  ">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => {
            const isLast = index === orders.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
 
            return (
              <tr key={order.id}>
                <td className={classes}>
                  <Link to={`/order/${order._id}`}>
                  
                  <Typography variant="small" color="blue-gray" className="font-normal hover:underline">
                    {order._id}
                  </Typography>
                  </Link>
                </td>
                <td className={`${classes} bg-blue-gray-50/50`}>
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {order.createdAt.substring(0,10)}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {order.totalPrice}
                  </Typography>
                </td>
                <td className={`${classes} bg-blue-gray-50/50`}>
                <Typography variant="small" color="blue-gray" className="font-medium">
                {
                  order.isPaid ? (<p>Paid</p>) : (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                </svg>
                )
                }
                  </Typography> 
                </td> 
                <td className={`${classes} bg-blue-gray-50/50`}>
                <Typography variant="small" color="blue-gray" className="font-medium">
                {
                  order.isDelivered ? (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                ) : (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                </svg>
                )
                }
                  </Typography>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>)
    }
    </div>

</section>

  )
}
export default ProfilePage