import React, { useState, useEffect } from "react";
import loadjs from "loadjs";
import { useActions } from "../../hooks/useActions";
import { useSelector } from "react-redux";
import { ThreekitSetSinglePlayerLoadingStatus, ThreekitSelectModel } from '../../redux/Threekit/actions';
import { SaveMetadada } from "../../redux/Metadata/action";
import "./player.css";
import Headlines from "../headLines/headlines";
import TabNavbar from "../tabNavbar/tabNavbar";
import Footers from "../footers/footers";
import { StarFilled, WindowsFilled } from "@ant-design/icons";
import { classesActiveOrInactive } from "../../utils/activateCssClass";
import Affirm from "../../../assets/images/affirm.svg";
import vinyl from "../../../assets/images/vinyl.png";

const Player = (props) => {
  const { assetId } = props;
  let tabContentDefaultActive = 0;
  let tabDefaultActive = 0;
  let tabItemsDefaultActive = 0;
  tabContentDefaultActive = tabContentDefaultActive == 0 ? 0 : tabContentDefaultActive - 1;
  tabDefaultActive = tabDefaultActive == 0 ? 0 : tabDefaultActive - 1;
  tabItemsDefaultActive = tabItemsDefaultActive == 0 ? 0 : tabItemsDefaultActive - 1;

  const initialPrice = window.crate ? "$ " + (window.crate.metadata.basePrice + parseInt(Object.values(JSON.parse(window.crate.metadata.colorPrices.replace(/\\/g, "")))[tabContentDefaultActive])).toFixed(2) : ""

  function starsQty(){
    let reviewsOfelement = window.crate ? window.crate.metadata.starsQty : 0;
    let starsArray = [<StarFilled/>]
    let startsCalculation = Math.floor(reviewsOfelement/100)
    for(let i = 0; i < 5; i++){
      if(i < (startsCalculation - 1)){
        starsArray.push(<StarFilled/>)
      }
    }
    return starsArray
  }

  function content(){
    let tabsContent = [];
    tabsContent =  
    [   
      window.crate.metadata.tabOneContent !== undefined ? Object.values(JSON.parse(window.crate.metadata.tabOneContent.replace(/\\/g, ""))) : [],  
      window.crate.metadata.tabTwoContent !== undefined ? Object.values(JSON.parse(window.crate.metadata.tabTwoContent.replace(/\\/g, ""))) : [], 
      window.crate.metadata.tabThreeContent !== undefined ? Object.values(JSON.parse(window.crate.metadata.tabThreeContent.replace(/\\/g, ""))) : []
    ]
    return tabsContent
  }
  
  const timeIntervalForShiiping = (e) => {
    const today = new Date();
    const endDate = new Date(today.getFullYear() + "-" + window.crate.metadata.dateToCountDown);
    const days = parseInt((endDate - today) / (1000 * 60 * 60 * 24));
    const hours = parseInt(Math.abs(endDate - today) / (1000 * 60 * 60) % 24);
    const minutes = parseInt(Math.abs(endDate.getTime() - today.getTime()) / (1000 * 60) % 60);
    const seconds = parseInt(Math.abs(endDate.getTime() - today.getTime()) / (1000) % 60); 
      if(days >= 0 && document.querySelector("span.idc-red-font") && e == "countDown"){
        const countDownDateDays = days == 0 ? "" : " " + days + " days ";
        const countDownDateHours = days == 0 && hours <= 0 ? "" : " " + hours + " hours ";
        const countDownDateMins = days == 0 && hours <= 0 && minutes <= 0 ? "" : " " + minutes + " minutes ";
        const countDownDateSeconds = days == 0 && hours <= 0 && minutes <= 0 && seconds <= 0 ? "" : " " + seconds + " sec ";
        document.querySelector("span.idc-red-font").innerHTML = countDownDateDays + countDownDateHours + countDownDateMins + countDownDateSeconds;
      }
      else if(e == "createElement"){
        return days >= 0 ? 1 : 0;
      }
  }

  function infoAndDescriptionsPerTab () {
    let timeIsOver = timeIntervalForShiiping("createElement")
    let colorDefaultPrice = [];
    let sizesPrice = window.crate.metadata.sizesPrice && Object.values(JSON.parse(window.crate.metadata.sizesPrice.replace(/\\/g, "")))[tabContentDefaultActive] !== "0" ? 
      parseInt(Object.values(JSON.parse(window.crate.metadata.sizesPrice.replace(/\\/g, "")))[tabContentDefaultActive]) 
      :
      0;
    let colorPrices = window.crate.metadata.colorPrices && Object.values(JSON.parse(window.crate.metadata.colorPrices.replace(/\\/g, "")))[tabContentDefaultActive] !== "0" ? 
      parseInt(Object.values(JSON.parse(window.crate.metadata.colorPrices.replace(/\\/g, "")))[tabContentDefaultActive]) 
      :
      0;
    let overPriceText = 
    window.crate.metadata.colorPrices && colorPrices || sizesPrice? 
    <span className="idc-price-addition"> {"$ " + (sizesPrice + colorPrices) + " extra charge for this color selection."} </span>
    :
    <span className="idc-price-addition"></span>;
    colorDefaultPrice = 
    [[overPriceText]/*, 

    window.crate.metadata.dateToCountDown && timeIsOver > 0 ? 
    <div className="idc-bussines-logic-text">
      Order the color Gray in
        <span className="idc-red-font">{setInterval(() => timeIntervalForShiiping("countDown"),1000)}</span>
      and your order is
        <span className="idc-green-font">{" Guaranteed "}</span>
      {`to ship in ${window.crate.metadata.shipIn ? window.crate.metadata.shipIn : ""} business days. ALL other colors will ship in ${window.crate.metadata.allOtherShipping ? window.crate.metadata.allOtherShipping : ""} business days.`}
    </div> : null*/
    ]
    return colorDefaultPrice;
  }

  function addToCart() {
  }
  function allClassesActiveOrInactive (a) {
    classesActiveOrInactive(a, '', '', ".idc-tab-headers-section", "idc-tab-active", " .idc-tab-content-box", "idc-visible-content", ".idc-product-info", "idc-product-info-visible", ".idc-button", "idc-buttons-visible")
  }

  function buttonsText (buttonsQty){
    let arrayOfFooterButtonsText = [];
    for(let a = 0; a < buttonsQty; a++){
      if((buttonsQty - 1) == a){
        arrayOfFooterButtonsText[a] = "Add to cart";
      }else{
        arrayOfFooterButtonsText[a] = "Next";
      }
    }
    return arrayOfFooterButtonsText;
  }

  function buttonsDo (buttonsQty){
    let arrayOfFooterButtonsDo = [{}];
    for(let a = 0; a < buttonsQty; a++){
      arrayOfFooterButtonsDo[a] = {"do": function(){}}
      if((buttonsQty - 1) == a){
        arrayOfFooterButtonsDo[a].do = addToCart;
      }else{
        arrayOfFooterButtonsDo[a].do = allClassesActiveOrInactive;
      }
    }
    return arrayOfFooterButtonsDo;
  }

  function createServicesBox(){
    return(
      <div className="idc-services-box">
        <div className="idc-pay-once">
          <div className="idc-pay-once-text">
            PAY ONCE
          </div>
          <div className="idc-pay-once-price">
            {initialPrice}
          </div>
        </div>
        <div className="idc-affirm">
          <div className="idc-affirm-financings-text">*Starting at $63/MO with</div>
          <img src={Affirm}/>
        </div>
      </div>
    )    
  }

  function headerDescriptions(){
    let descriptionTextAndIcons;
    let arrayOfDescriptions = [];
      descriptionTextAndIcons =
      <div className="idc-description-and-start">
        <div className='idc-stars'>
         {starsQty()}
         <span className="idc-reviews">{window.crate.metadata.starsQty ? window.crate.metadata.starsQty + "+ reviews" : 0}</span> 
       </div>
        <div className="idc-description-text">{window.crate.metadata.productDescription ? window.crate.metadata.productDescription : ""}</div>
      </div>
      arrayOfDescriptions[0] = descriptionTextAndIcons;
    let membership = window.crate.metadata.membership ? window.crate.metadata.membership : "";
/*
    if(membership == "premium"){
      let descriptionElements;
      descriptionElements = window.crate.metadata.premiumGift && window.crate.metadata.premiumGift > 0 ?
        <div className="idc-description-gifts">
          <div className="idc-description-gifts-image">
            <img src={vinyl}/>
          </div>
          <div className="idc-description-gifts-info">
            <div className="idc-description-title">FREE PREMIUM GIFTS</div>
            <div className="idc-description-description">Vynil Pad</div>
            <div className="idc-description-description">{`- $ ${window.crate.metadata.premiumGift} (Low Inventory)`}</div>
          </div>
        </div>
      :
        null
      arrayOfDescriptions[1] = descriptionElements;
    }*/
    return arrayOfDescriptions
  }

  const state = useSelector((store) => {
    return {
      Meta: store.Meta,
      Config: store.Config,
    };
  });

  const actions = useActions({
    ThreekitSetSinglePlayerLoadingStatus,
    ThreekitSelectModel,
    SaveMetadada
  });

  let metadata
  metadata = useSelector(state => state.Metadata.payload);

  useEffect(() => {
    actions.ThreekitSetSinglePlayerLoadingStatus(true);
    loadjs(state.Config.threekitScriptURL);
    window
      .threekitPlayer({
        authToken: state.Config.threekitAuthToken,
        el: document.getElementById("player"),
        assetId: assetId,
        orgId: state.Config.threekitOrgId,
        showConfigurator: false,
        showAR: true,
        showLoadingThumbnail: true,
        publishStage: 'draft',
      })
      .then(async (api) => {
        api.enableApi("configurator");
        api.enableApi("player");
        api.enableApi("store");
        await api.when("loaded");
        window.crate = api;
        window.crate.configurator = await api.getConfigurator();
        window.crate.metadata = await window.crate.configurator.getMetadata();
        actions.SaveMetadada(window.crate.metadata)
        api.tools.setTool('orbit', { options: { turnTableMobileOnly: false } });
        api.selectionSet.setStyle({ outlineColor: "#B49F7D" });
      });
  }, []);
  return (
    <div className="idc-threekit-main">
      <div className="idc-content-wrapper">
          <div className="idc-col-2 idc-left-col">
            <div id="player">
            </div>
          </div>
          {window.crate ? 
            <div className="idc-col-2 idc-right-col">
              <Headlines 
                  title={ window.crate ? window.crate.metadata.title : ""}
                  price={ initialPrice }
                  descriptions={ window.crate ? headerDescriptions() : []}
                  //sizesAvailbale={ window.crate ? window.crate.metadata.availabilitySize : ""}
              />
              <TabNavbar
                  tabHeaders={window.crate ? Object.values(JSON.parse(window.crate.metadata.tabsArray.replace(/\\/g, ""))) : []}
                  tabDefaultActive={tabDefaultActive}
                  tabIndividualTemplateType={["color-palette", "overlap", "overlap"]}
                  tabItemsDefaultActive = {tabItemsDefaultActive}
                  tabsContent={window.crate ? content() : []}
                  onElementClick={classesActiveOrInactive}
                  tabColorsNames={window.crate ? Object.values(JSON.parse(window.crate.metadata.colorsName.replace(/\\/g, ""))) : []}
                  tabContentDefaultActive = {tabContentDefaultActive}
                  //tabMosaicImages={[aluminium, blackAluminium, blackPlastic, turquoisePlastic]}
                  infoAndDescriptionsPerTab={window.crate ? infoAndDescriptionsPerTab(): ["", ""]}
                  attributes = {["Color", "Size", "Door"]}
              />
              { <Footers
                tabDefaultActive={tabDefaultActive}
                /*iconsAndServices={createServicesBox()}*/
                buttonText={window.crate ? buttonsText(Object.values(JSON.parse(window.crate.metadata.tabsArray.replace(/\\/g, ""))).length) : buttonsText(0)}
                buttonsDo={window.crate ? buttonsDo(Object.values(JSON.parse(window.crate.metadata.tabsArray.replace(/\\/g, ""))).length) : buttonsDo(0)}
              /> }
            </div>
          :
          <div>
              <div className="idc-loader"></div>
              <div className="idc-loading-text">Loading Impact 3D experince...</div>
          </div>
        }
      </div>
    </div>
  );
};
export default Player;