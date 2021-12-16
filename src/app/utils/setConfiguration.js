export async function setConfigurations(attribute, value){
    await window.crate.configurator.setConfiguration({[attribute]: value})
}