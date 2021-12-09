import React from "react";
import "./headlines.css";

const Headlines = (props) => {
   const { title, price, descriptions, sizesAvailbale} = props;
   return(
    <div className="idc-headlines">
       <div className="idc-info">
         <div className="idc-title">{title}</div>
         <div className="idc-pricing">{price}</div>
       </div>
       <div className="idc-description-box">
         {
            descriptions.map((description, a) => {
               return(
                  <div key={a} className="idc-description" style={{width: (100/descriptions.length) + "%"}}>{description}</div>
               )
            })
         }
      </div>
       <div className='idc-availability'> {sizesAvailbale} </div>
    </div>
    
   )

}
export default Headlines;