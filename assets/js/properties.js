async function getProperties() {
    const response = await makeRequest("get", "http://34.239.203.248:1337/Properties")
    properties = [...properties, ...JSON.parse(response)]
    console.log("proerties", properties)
}

async function loadProperties(length) {
    await getProperties()
    const div = document.createElement('div');
    div.className = 'row'
    const end = length ? length : properties.length
    console.log(properties)
    properties.slice(0, end).forEach((property, index) => {
        console.log("properties", property)
        div.innerHTML +=
            `<div class="col-lg-4 col-md-4 col-sm-6">
                    <div class="card">
            <div class="open-contact-popup">
                <div class="img-block">
                    <div class="overlay"></div>
                    <img src="assets/properties/${index+1}.jpg" alt="" class="img-fluid">
                    <div class="rate-info">
                        <h5>${property.salesPrice}</h5>
                        <span>${property.assetStatus}</span>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <a href="" title="">
                    <h3>${property.name}</h3>
                    <p> <i class="la la-map-marker"></i>${property.country}</p>
                </a>
                <ul>
                    <li>${property.mw} MW</li>
                    <li>${property.propertyType}</li>
                    <li>${property.percent}</li>
                </ul>
            </div>
            <div class="card-footer">
                <a href="#" class="pull-left">
                    <i class="la la-heart-o"></i>
                </a>
            </div>
            <a href="" title="" class="ext-link"></a>
            </div>  </div>`
    })
    const container = document.getElementsByClassName('listing-row')[0];
    if (container) {
        console.log(container)

        container.appendChild(div)
    }
}