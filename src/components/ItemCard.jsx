import { Typography ,Select , Option ,IconButton } from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {addToCart , removeFromCart } from '../slices/cartSlice';
const ItemCard = ({ item }) => {
    const dispatch  = useDispatch()
    const handleCart = async (qty , item)=>{
        dispatch(addToCart({...item, qty}))
      } 
      const handleDelete = async (id)=>{
        dispatch(removeFromCart(id))
      }
  return (
    <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md lg:flex lg:justify-start">
      <img
        src={item.image}
        alt="product-image"
        className="w-full rounded-lg lg:w-40"
      />
      <div className="md:ml-4 lg:flex lg:w-full lg:justify-between">
        <div className="mt-5 lg:mt-0 flex items-center justify-center">
          <Typography className="lg:text-lg line-clamp-1 text-base  font-bold text-gray-900">
            {" "}
            <Link
              className="hover:decoration-solid hover:underline"
              to={`/product/${item._id}`}
            >
              {item.name}
            </Link>{" "}
          </Typography>
        </div>
        <div className="mt-5  sm:space-y-6 lg:mt-0 md:block md:space-x-6">
          <div className="flex items-center ">
          <Select
                    size="md"
                    color="blue"
                    label="Qty"
                    className="p-0 "
                    value={item.qty.toString()}
                    onChange={(value) => {
                        handleCart(Number(value) , item)
                    }}
                  >
                    {[...Array(item.countInStock).keys()].map((val) => (
                      <Option value={(val + 1).toString()} key={val+1}>
                        {val + 1}
                      </Option>
                    ))}
                  </Select>
          </div>
          <div className="flex mt-3 items-center justify-center space-x-4">
            <Typography variant="h4"> Rs {item.price} </Typography>
            <IconButton onClick={() => handleDelete(item._id)} size="sm" className="ml-2 " ripple={true}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
  <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
</svg>
      </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ItemCard;
