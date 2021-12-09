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
import aluminium from "../../../assets/images/aluminium.jpg";
import blackAluminium from "../../../assets/images/black_aluminium.jpg";
import blackPlastic from "../../../assets/images/black_plastic.jpg";
import turquoisePlastic from "../../../assets/images/turquoise_plastic.jpg";
import Affirm from "../../../assets/images/affirm.svg";

const Player = (props) => {
  const { assetId } = props;
  const [playerConfiguration, setPlayerConfiguration] = useState(null);
  const tabContentDefaultActive = 0;
  const tabDefaultActive = 0;
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
      if(document.querySelector("span.idc-red-font")){
        document.querySelector("span.idc-red-font").innerHTML = " " + days + " days " + hours + " hrs " + minutes + " min " + seconds + " sec ";
      }
  }

  function infoAndDescriptionsPerTab () {
    var today = new Date();
    var endDate = new Date(today.getFullYear() + "-" + window.crate.metadata.dateToCountDown);
    var diffMs = (endDate - today);
    var diffDays = Math.floor(diffMs / 86400000) * 24;

    let colorDefaultPrice = [];
    let overPriceText = 
    window.crate.metadata.colorPrices  && Object.values(JSON.parse(window.crate.metadata.colorPrices.replace(/\\/g, "")))[tabContentDefaultActive] !== "$ 0" ? 
    <span className="idc-price-addition"> {"$ " + Object.values(JSON.parse(window.crate.metadata.colorPrices.replace(/\\/g, "")))[tabContentDefaultActive] + " extra charge for this color selection."} </span>
    :
    "";
    colorDefaultPrice = 
    [[overPriceText], 

    window.crate.metadata.dateToCountDown && diffDays > 0 ? 
    <div className="idc-bussines-logic-text">
      Order the color Gray in
        <span className="idc-red-font">{setInterval(() => timeIntervalForShiiping(""),1000)}</span>
      and your order is
        <span className="idc-green-font">{" Guaranteed "}</span>
      {`to ship in ${window.crate.metadata.shipIn ? window.crate.metadata.shipIn : ""} business days. ALL other colors will ship in ${window.crate.metadata.allOtherShipping ? window.crate.metadata.allOtherShipping : ""} business days.`}
    </div> : ""
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
        showAR: false,
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
                  description={ window.crate ? window.crate.metadata.productDescription : ""}
                  sizesAvailbale={ window.crate ? window.crate.metadata.availabilitySize : ""}
                  startsQty={starsQty()}
                  reviewsQty={`${window.crate ? window.crate.metadata.starsQty : 0}  reviews`}
              />
              <TabNavbar
                  tabHeaders={window.crate ? Object.values(JSON.parse(window.crate.metadata.tabsArray.replace(/\\/g, ""))) : []}
                  tabDefaultActive={tabDefaultActive}
                  tabIndividualTemplateType={["color-palette", "overlap", "mosaic"]}
                  tabsContent={window.crate ? content() : []}
                  onElementClick={classesActiveOrInactive}
                  tabColorsNames={window.crate ? Object.values(JSON.parse(window.crate.metadata.colorsName.replace(/\\/g, ""))) : []}
                  tabContentDefaultActive = {tabContentDefaultActive}
                  tabMosaicImages={[aluminium, blackAluminium, blackPlastic, turquoisePlastic]}
                  infoAndDescriptionsPerTab={window.crate ? infoAndDescriptionsPerTab() : ["", ""]}
              />
              <Footers
                tabDefaultActive={tabDefaultActive}
                iconsAndServices={createServicesBox()}
                buttonText={window.crate ? buttonsText(Object.values(JSON.parse(window.crate.metadata.tabsArray.replace(/\\/g, ""))).length) : buttonsText(0)}
                buttonsDo={window.crate ? buttonsDo(Object.values(JSON.parse(window.crate.metadata.tabsArray.replace(/\\/g, ""))).length) : buttonsDo(0)}
              />
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
