let properties = []
function getProperties() {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            properties = [...properties, ...JSON.parse(xmlHttp.response)]
        }
    }
    xmlHttp.open("get", "http://localhost:1337/Properties");
    xmlHttp.send();  
}

getProperties()