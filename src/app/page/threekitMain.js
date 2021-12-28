import React from "react";
import "./threekitMain.css";
import Navbar from "../layout/navbar";
import Player from "../components/Threekit/Player";
import { useState } from "react";

const ThreekitMain = () => {
    sessionStorage.setItem("priceAmountColor", 0);
    sessionStorage.setItem("priceAmountSize", 0);
    // const switchCrate = assetId => {
    //     sessionStorage.setItem("assetId", assetId);
    //     window.location.reload();
    //   };

    return(
        <div className="idc-main">
            {/* <Navbar></Navbar> */}
            {/* <button className="idc-button-crate" style={{borderRadius: "0.5px solid #AAA", boxShadow: "0px 8px 11px #D6D7D9", top: '5px', left: '400px', color: "#FFF", backgroundColor: "#A3A3A3", zIndex: 2, width: "150px", height: "30px", position: "fixed", cursor: "pointer"}} onClick={() => {switchCrate("6a800142-1c09-470e-af61-875e6c984e79")}}>Collapsible Dog Crate</button>
            <button className="idc-button-crate" style={{borderRadius: "0.5px solid #AAA", boxShadow: "0px 8px 11px #D6D7D9", top: '37px', left: '400px', color: "#FFF", backgroundColor: "#A3A3A3", zIndex: 2, width: "150px", height: "30px", position: "fixed", cursor: "pointer"}} onClick={() => {switchCrate("1473d28c-89be-41cb-a415-bc5b912fce32")}}>Stationary Dog Crate</button>
            <button className="idc-button-crate" style={{borderRadius: "0.5px solid #AAA", boxShadow: "0px 8px 11px #D6D7D9", top: '68px', left: '400px', color: "#FFF", backgroundColor: "#A3A3A3", zIndex: 2, width: "150px", height: "30px", position: "fixed", cursor: "pointer"}} onClick={() => {switchCrate("92599ece-a051-440c-85ed-4b9ded2f552d")}}>High Anxiety Crate</button> */}
            <Player
                assetId={sessionStorage.getItem("assetId") ? sessionStorage.getItem("assetId") : "6a800142-1c09-470e-af61-875e6c984e79"}
            />
        </div>
        
    )

}
export default ThreekitMain;