import { setConfigurations } from "./setConfiguration";
export function classesActiveOrInactive(indexToActivate, attribute, value, classGroup, classToactivate, classContentGroup, classContentToActivate, footerClassGroup, footerClassToativate, buttonsGroup, buttonToActivate){
    const tabs = document.querySelectorAll(classGroup);
    const containTabs = document.querySelectorAll(classContentGroup);
    const footerContains = document.querySelectorAll(footerClassGroup);
    const buttonsContains = document.querySelectorAll(buttonsGroup);
    for(let a = 0; a < tabs.length; a++){
        tabs[a].classList.remove(classToactivate);
        containTabs[a] && containTabs[a].classList.remove(classContentToActivate);
        footerContains[a] && footerContains[a].classList.remove(footerClassToativate);
        buttonsContains[a] && buttonsContains[a].classList.remove(buttonToActivate);
        if(indexToActivate == a){
            tabs[a].classList.add(classToactivate);
            containTabs[a] && containTabs[a].classList.add(classContentToActivate);
            footerContains[a] && footerContains[a].classList.add(footerClassToativate);
            buttonsContains[a] && buttonsContains[a].classList.add(buttonToActivate);
        }
    }
    entirePageChangePriceAmount(attribute, value)
}

function entirePageChangePriceAmount(attribute, value){
    let colorPrice = 0;
    let acumulatedColorPrice = 0;
    let acumulatedSizePrice = 0;
    let sizePrice = 0;
    let textPriceAdding = "";
    let quantity;
    quantity = value.replace(/\s/g, '');
    if(attribute == "Color"){
        colorPrice = parseInt(JSON.parse(window.crate.metadata.colorPrices.replace(/\\/g, ""))[quantity]);
        textPriceAdding = "color";
        sessionStorage.setItem("priceAmountColor", colorPrice);
    }
    else if(attribute == "Size"){
        quantity = value.includes("tall") ? value.slice(0, 2) + "LW" : value.slice(0, 2);
        sizePrice = parseInt(JSON.parse(window.crate.metadata.sizesPrice.replace(/\\/g, ""))[quantity]);
        textPriceAdding = "size";
        sessionStorage.setItem("priceAmountSize", sizePrice);
    }
    acumulatedColorPrice = parseInt(sessionStorage.getItem("priceAmountColor"));
    acumulatedSizePrice = parseInt(sessionStorage.getItem("priceAmountSize"));

    if(attribute == "Color" || attribute == "Size"){
        document.querySelector(".idc-product-info").style.display = "flex";
        document.querySelector(".idc-price-addition").innerHTML = "$ " +  (colorPrice + sizePrice) + " extra charge for this " + textPriceAdding + " selection.";
        document.querySelector(".idc-pricing").innerHTML = "$ " + (window.crate.metadata.basePrice + (acumulatedColorPrice + acumulatedSizePrice)).toFixed(2);
        document.querySelector(".idc-pay-once-price").innerHTML = "$ " + + (window.crate.metadata.basePrice + (acumulatedColorPrice + acumulatedSizePrice)).toFixed(2);
    }
    setConfigurations(attribute, value)
}
