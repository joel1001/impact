import React from "react";
import "./switch.css";

const Switch = (props) => {
    let switchInitial = 1;
    const { switchTitle, clicked, disableText, enableText, top, left, disabledColor, enableColor, toggleDisableColor, toggleEnableColor} = props;
    const switchStyles = () => {
        clicked();
        document.querySelector(".idc-switch-bg").style.backgroundColor = switchInitial == 0 ? disabledColor : enableColor;
        document.querySelector(".idc-switch-bg").style.paddingRight = switchInitial == 0 ? "6px" : "12px";
        document.querySelector(".idc-switcher").style.backgroundColor = switchInitial == 0 ? toggleDisableColor : toggleEnableColor;
        document.querySelector(".idc-switcher").style.borderColor = switchInitial == 0 ? disabledColor : enableColor;
        document.querySelector(".idc-switch-display").innerHTML = switchInitial == 0 ? disableText : enableText;
        document.querySelector(".idc-switch-display").style.color = switchInitial == 0 ? "#000" : "#FFF";
        document.querySelector(".idc-switch-display").style.order = switchInitial == 0 ?  0 : 1;
        switchInitial = switchInitial == 0 ? 1 : 0;
   }
   return(
    <div className="idc-switch" style={{top: top, left: left}}>
        <div className="idc-switch-title">{switchTitle}</div>
        <div onClick={switchStyles} className="idc-switch-bg" style={{backgroundColor: disabledColor}}> 
            <div className="idc-switch-display">{disableText}</div>
            <div className="idc-switcher" style={{backgroundColor: toggleDisableColor, border: "2px solid " + disabledColor}}></div>
        </div>
    </div>
    
   )

}
export default Switch;