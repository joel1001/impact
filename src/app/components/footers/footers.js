import React from "react";
import "./footers.css";

const Footers = (props) => {
   const { iconsAndServices, buttonText, buttonsDo } = props;
   return(
    <div className="idc-footers">
      {iconsAndServices} 
         <div className="idc-primary-buttons">
            {
               buttonText.map((text, a) => {
                  return(
                     <div key={a} onclick={buttonsDo[a]} className="idc-button">
                        {text}
                     </div>
                  )
               })
            }
         </div>
    </div>
    
   )

}
export default Footers;