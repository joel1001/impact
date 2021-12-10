
import React from "react";
import "./tabNavbar.css";
import PropTypes from 'prop-types'; 

const TabNavbar = (props) => {
   let error = false;
   let {tabHeaders, tabDefaultActive, tabIndividualTemplateType, tabsContent, onElementClick, tabColorsNames, tabContentDefaultActive, tabMosaicImages, infoAndDescriptionsPerTab} = props;
   if(tabHeaders.length !== tabsContent.length){
      console.log("WARNING!!: the number of tab headers does not correspond content of tab headers that you are sending, " + tabHeaders.length + " tab headers and then you just send: " + tabsContent.length + " content" + (tabsContent.length > 1 ? "s" : ""));
   }
   if(tabDefaultActive > tabHeaders.length || tabDefaultActive < 0){
      console.log("WARNING!!: can not set default tab header, couse does not exist tab header " + tabDefaultActive + " if you just have " + tabHeaders.length + " tab headers");
      tabDefaultActive = 0
   }
   if(tabContentDefaultActive > tabsContent[tabDefaultActive].length || tabContentDefaultActive < 0){
      console.log("WARNING!!: can not set default tab content, couse does not exist tab content " + tabContentDefaultActive + " if you just have " + tabsContent[tabDefaultActive].length + " tab content");
      tabContentDefaultActive = 0
   }
   if(tabColorsNames.length > tabsContent[tabContentDefaultActive].length){
      console.log("WARNING!!: the quantity of color names " + tabColorsNames.length + " is not corresponding with the quantity colors " + tabsContent[tabContentDefaultActive].length + " in the tab content")
   }
   if(tabIndividualTemplateType){
      for(let a = 0; a < tabIndividualTemplateType.length; a++){
         if(tabIndividualTemplateType[a] !== 'color-palette' && tabIndividualTemplateType[a] !== 'overlap' && tabIndividualTemplateType[a] !== 'mosaic'){
            console.log("WARNING!!: " + tabIndividualTemplateType[a] + " is an unknown template for this component, make sure to send whatever of this templates, templates supported: color-palette, overlap and mosaic.");
            tabIndividualTemplateType[a] = "overlap";
         }
      }
   }
   return(
    <div className="idc-tab-nav">
       <div className="idc-tab-headers">
         {
            tabHeaders && tabHeaders.map((header, index)=>{
               return(
                  <div key={index} className="idc-tab-nav-content">                  
                     <div onClick={() => {onElementClick(index, '', '', ".idc-tab-headers-section", "idc-tab-active", ".idc-tab-content-box", "idc-visible-content", ".idc-product-info", "idc-product-info-visible", ".idc-button", "idc-buttons-visible")}} className={`idc-tab-headers-section ${tabDefaultActive == index ? " idc-tab-active" : ""}`}>{header}</div>
                     <div className={`idc-template-${tabIndividualTemplateType[index]} idc-tab-content`}>
                     </div>
                  </div>
               )   
            })
         }
      </div>
      <div className="idc-tab-cointains">
         {
           tabsContent.map((content, a) => (
               tabIndividualTemplateType[a] == 'color-palette' ? 
                  <div key={a} className={`idc-tab-content-box ${tabContentDefaultActive == a ? "idc-visible-content" : ""}`}>
                     {
                        content.map((color, b) => {
                           return (
                              <div key={b} className={`idc-tab-color ${tabContentDefaultActive == b ? "idc-option-active" : ""}`} onClick={() =>  {onElementClick(b, "Color", tabColorsNames[b], ".idc-tab-color", "idc-option-active")}} style={{backgroundColor: color}}></div>
                           )
                        })
                     } 
                  </div>
               :
               <div className={`idc-tab-content-box ${tabContentDefaultActive == a ? "idc-visible-content" : ""} idc-non-color`} style={tabIndividualTemplateType[a] == "mosaic" ? {width:"90%", justifyContent:"space-around"} : null}>
                  {
                     content.map((content, c) => {
                        return(
                           tabIndividualTemplateType[a] == "mosaic" ? 
                           <div key={c} onClick={() =>  {onElementClick(c, "mosaic", tabsContent[c], ".idc-mosaic-elemnts", "idc-option-active")}} className={`idc-mosaic-elemnts ${tabContentDefaultActive == c ? "idc-option-active" : ""}`} style={{width: (100/tabMosaicImages.length + 10) + "%"}}>
                              <img src={tabMosaicImages[c]}/>
                              <div className={`idc-tab-${tabIndividualTemplateType[a]} ${tabContentDefaultActive == c ? "idc-option-active-non-color" : ""}`}>{content}</div>
                           </div>
                           :
                           <div key={c} className={`idc-tab-${tabIndividualTemplateType[a]} ${tabContentDefaultActive == c ? "idc-option-active-non-color" : ""}`} onClick={() =>  {onElementClick(c, "Size", tabsContent[c], `.idc-tab-${tabIndividualTemplateType[a]}`, "idc-option-active-non-color")}}>{content}</div>
                        )
                     })
                  }
               </div>
            ))
         }

      </div>
      <div className="idc-tabs-footer">
         {
            infoAndDescriptionsPerTab.map((info, d) => (
               Array.isArray(info) ? 
                  info.map((description, e) => {
                     return(
                        <div key={e} className={`idc-product-info ${tabContentDefaultActive == d && description? "idc-product-info-visible" : ""}`}>{description}</div>
                     )
                  })
               :
               <div key={d} className={`idc-product-info ${info ? "idc-visible" : ""}`}>{info}</div>
            ))
         }
      </div>
    </div>
   )
}
export default TabNavbar;

TabNavbar.propTypes = {
   onElementClick: PropTypes.func,
   infoAndDescriptionsPerTab: PropTypes.instanceOf(Element),
   tabMosaicImages: PropTypes.array
}