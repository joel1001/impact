import { setConfigurations } from "./setConfiguration";
export function classesActiveOrInactive(indexToActivate, attribute, value, classGroup, classToactivate, navbarPart, classContentGroup, classContentToActivate){
    debugger
    const tabs = document.querySelectorAll(classGroup);
    const containTabs = document.querySelectorAll(classContentGroup)
    for(let a = 0; a < tabs.length; a++){
        tabs[a].classList.remove(classToactivate);
        containTabs[a] && containTabs[a].classList.remove(classContentToActivate)
        if(indexToActivate == a){
            tabs[a].classList.add(classToactivate);
            containTabs[a] && containTabs[a].classList.add(classContentToActivate);
        }
    }
    setConfigurations(attribute, value)
}
