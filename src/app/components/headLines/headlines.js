import React from "react";
import "./headlines.css";

const Headlines = (props) => {
   const { title, price, description, sizesAvailbale, startsQty, reviewsQty } = props;
   return(
    <div className="idc-headlines">
       <div className="idc-info">
         <div className="idc-title">{title}</div>
         <div className="idc-pricing">{price}</div>
       </div>
       <div className='idc-stars'>
         {startsQty}
         <span className="idc-reviews"> {reviewsQty} </span> 
       </div>
       <div className="idc-description-box">
          <div className="idc-description"> {description} </div>
      </div>
       <div className='idc-availability'> {sizesAvailbale} </div>
    </div>
    
   )

}
export default Headlines;