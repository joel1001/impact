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
import aluminium from "../../../assets/images/aluminium.jpg"
import blackAluminium from "../../../assets/images/black_aluminium.jpg"
import blackPlastic from "../../../assets/images/black_plastic.jpg"
import turquoisePlastic from "../../../assets/images/turquoise_plastic.jpg"

const Player = (props) => {
  const { assetId } = props;
  const [playerConfiguration, setPlayerConfiguration] = useState(null);

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
                  price={ window.crate ? "$ " + window.crate.metadata.basePrice.toFixed(2) : ""}
                  description={ window.crate ? window.crate.metadata.productDescription : ""}
                  sizesAvailbale={ window.crate ? window.crate.metadata.availabilitySize : ""}
                  startsQty={starsQty()}
                  reviewsQty={`${window.crate ? window.crate.metadata.starsQty : 0}  reviews`}
              />
              <TabNavbar
                  tabHeaders={window.crate ? Object.values(JSON.parse(window.crate.metadata.tabsArray.replace(/\\/g, ""))) : []}
                  tabDefaultActive={0}
                  tabIndividualTemplateType={["color-palette", "overlap", "mosaic"]}
                  tabsContent={window.crate ? [Object.values(JSON.parse(window.crate.metadata.tabOneContent.replace(/\\/g, ""))),  Object.values(JSON.parse(window.crate.metadata.tabTwoContent.replace(/\\/g, ""))), Object.values(JSON.parse(window.crate.metadata.tabThreeContent.replace(/\\/g, "")))] : []}
                  onElementClick={classesActiveOrInactive}
                  tabColorsNames={window.crate ? Object.values(JSON.parse(window.crate.metadata.colorsName.replace(/\\/g, ""))) : []}
                  tabContentDefaultActive = {0}
                  tabMosaicImages={[aluminium, blackAluminium, blackPlastic, turquoisePlastic]}
              />
              <Footers
                // footerMessage={}
                // addButton={}
                // buttonText={}
                // buttonDo={}
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
