let properties = []
function getProperties() {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            properties = [...properties, ...JSON.parse(xmlHttp.response)]
            console.log("proerties", properties)
        }
    }
    xmlHttp.open("get", "http://34.239.203.248:1337/Properties");
    xmlHttp.send();  
}

getProperties()