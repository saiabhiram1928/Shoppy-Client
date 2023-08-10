import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    IconButton,
    Typography,
  } from "@material-tailwind/react";
import { ProfileIcon } from "./headerComp/icons";
import { Link } from "react-router-dom";

  const ProfileMenu =({handleLogout})=> {

    return (
      <Menu >
        <MenuHandler>
        <IconButton ripple={true} variant="text" className="rounded-full hover:bg-white">
          <ProfileIcon className= "w-8 h-8 text-black" />
      </IconButton>
        </MenuHandler>
        <MenuList>
          <MenuItem className="flex items-center">
            <Link to = '/profile' className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <Typography variant="small" className="font-normal">
              My Profile
            </Typography>
            </Link>
          </MenuItem>


          <hr className="my-2 border-blue-gray-50" />
          <MenuItem className="flex items-center gap-2 " onClick={handleLogout}> 
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.636 5.636a9 9 0 1012.728 0M12 3v9"
              />
            </svg>
            <Typography variant="small" className="font-normal">
              Logout 
            </Typography>
          </MenuItem>
        </MenuList>
      </Menu>
    );
  }
  export default ProfileMenu