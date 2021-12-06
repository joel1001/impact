import React from "react";
import "./threekitMain.css";
import Navbar from "../layout/navbar";
import Player from "../components/Threekit/Player";

const ThreekitMain = () => {

    return(
        <div className="idc-main">
            <Navbar></Navbar>
            <Player
                assetId="6a800142-1c09-470e-af61-875e6c984e79"
            /> 
        </div>
        
    )

}
export default ThreekitMain;