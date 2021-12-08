import { setConfigurations } from "./setConfiguration";
export function classesActiveOrInactive(indexToActivate, attribute, value, classGroup, classToactivate, classContentGroup, classContentToActivate, footerClassGroup, footerClassToativate){
    const tabs = document.querySelectorAll(classGroup);
    const containTabs = document.querySelectorAll(classContentGroup);
    const footerContains = document.querySelectorAll(footerClassGroup);
    for(let a = 0; a < tabs.length; a++){
        tabs[a].classList.remove(classToactivate);
        containTabs[a] && containTabs[a].classList.remove(classContentToActivate);
        footerContains[a] && footerContains[a].classList.remove(footerClassToativate);
        if(indexToActivate == a){
            tabs[a].classList.add(classToactivate);
            containTabs[a] && containTabs[a].classList.add(classContentToActivate);
            footerContains[a] && footerContains[a].classList.add(footerClassToativate);
        }
    }
    entirePageChangePriceAmount(attribute, value)
    setConfigurations(attribute, value)
}

function entirePageChangePriceAmount(attribute, value){
    if(attribute == "Color"){
        value = value.replace(/\s/g, '');
        document.querySelector(".idc-price-addition").innerHTML = "$ " + JSON.parse(window.crate.metadata.colorPrices.replace(/\\/g, ""))[value] + " extra charge for this color selection.";
        document.querySelector(".idc-pricing").innerHTML = "$ " + (window.crate.metadata.basePrice + parseInt(JSON.parse(window.crate.metadata.colorPrices.replace(/\\/g, ""))[value])).toFixed(2);
        document.querySelector(".idc-pay-once-price").innerHTML = "$ " + (window.crate.metadata.basePrice + parseInt(JSON.parse(window.crate.metadata.colorPrices.replace(/\\/g, ""))[value])).toFixed(2);
    }
}
