
const ieV = () => {
    let ie = navigator.appVersion.match(/MSIE\s(.+?);/i) || [0, 100000];
    return parseInt(ie[1])
}

const ieVersion = ieV()

export default ieVersion
