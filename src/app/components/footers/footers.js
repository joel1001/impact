import React from "react";
import "./footers.css";

const Footers = (props) => {
   const { tabDefaultActive, iconsAndServices, buttonText, buttonsDo } = props;
   return(
    <div className="idc-footers">
      {iconsAndServices} 
         <div className="idc-primary-buttons">
            {
               buttonText.map((text, a) => {
                  return(
                     <div key={a} onClick={() => (buttonsDo[a].do(a + 1))} className={`idc-button ${tabDefaultActive == a ? "idc-buttons-visible" : ""}`}>
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