import React from 'react'
import { Alert } from "@material-tailwind/react";
const Message = ({color, children }) => {
  return (
    <Alert
    open={true}
    color = {color}
    variant='filled'
    className='text-center flex items-center justify-center'
  >
   {children}
  </Alert>
  )
}
Message.defaultProps ={
    color : 'blue'
}
export default Message