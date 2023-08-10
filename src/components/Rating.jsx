import React from "react";
import { Rating, Typography } from "@material-tailwind/react";
 
const RatingComp =({value,reviewCount})=> {
  return (
    <div className="flex items-center gap-2">
      <Rating value={value} readonly />
      <Typography color="black" className="font-medium">
        {reviewCount} Reviews
      </Typography>
    </div>
  );
}
export default RatingComp