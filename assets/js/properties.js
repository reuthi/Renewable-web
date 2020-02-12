
async function getProperties() {
    const response = await makeRequest("get", `${apiUrl}/Properties`)
    console.log(response)
    properties = [...properties, ...dataProperties]
    // fs.writeFile('myjsonfile.json', JSON.parse(response), 'utf8');
    // return 

}

async function loadProperties(length) {
    console.log("loadProperties")
    await getProperties()
    const div = document.createElement('div');
    div.className = 'row'
    const end = length ? length : properties.length
    properties.slice(0, end).forEach((property, index) => {
        console.log(property)
        div.innerHTML +=
            `<div class="col-lg-4 col-md-4 col-sm-6">
                    <div class="card">
            <div class="open-contact-popup">
                 <a href="property.html?index=${index}">
                    <div class="img-block">
                        <div class="overlay"></div>
                        <img src="assets/properties/${index+1}.jpg" alt="" class="img-fluid">
                        <div class="rate-info">
                           ${property.salesPrice ? `<h5>${property.salesPrice}</h5>` : ``} 
                            <span>${property.stage}</span>
                        </div>
                    </div>
                </a>
            </div>
            <div class="card-body">
                <a href="property.html?index=${index} title="">
                    <h3>${property.name}</h3>
                    <p> <i class="la la-map-marker"></i>${property.country}</p>
                </a>
                <ul>
                    <li>${property.mw} MW</li>
                    <li>${(property.propertyType).charAt(0).toUpperCase() + property.propertyType.slice(1)}</li>
                    <li>${property.percentOfDealForSale}% Equity Interest</li>
                </ul>
            </div>
            <div class="card-footer">
                <a href="property.html?index=${index} class="pull-left">
                    <i class="la la-heart-o"></i>
                </a>
            </div>
            <a href="property.html?index=${index}" title="" class="ext-link"></a>
            </div>  </div>`
    })
    const container = document.getElementsByClassName('listing-row')[0];
    if (container) {
        container.appendChild(div)
    }
    getProperty()
}

function getProperty() {
    var params = (new URL(window.location)).searchParams.toString();
    params = params.substring(params.indexOf('=') + 1, params.length);
    if (!params) return
    const index = parseInt(params)
    const property = properties[index]
    const div = document.createElement('div');
    div.innerHTML =
`             <div class="container">
        <div class="property-hd-sec">
            <div class="card">
                <div class="card-body">
                    <a href="#">
                        <h3>${property.name}</h3>
                        <p><i class="la la-map-marker"></i>${property.country}</p>
                    </a>
                    <ul>
                    <li>${property.mw} MW</li>
                    <li>${(property.propertyType).charAt(0).toUpperCase() + property.propertyType.slice(1)}</li>
                    <li>${property.percentOfDealForSale}% Equity Interest</li>
                    </ul>
                </div><!--card-body end-->
                <div class="rate-info">
                    <h5>${property.salesPrice ? property.salesPrice + '$' : 'Contact Seller'}</h5>
                    <span>${property.stage}</span>
                </div><!--rate-info end-->
            </div><!--card end-->
        </div><!---property-hd-sec end-->
        <div class="property-single-page-content">
            <div class="row">
                <div class="col-lg-9 pl-0 pr-0">
                    <div class="property-pg-left">
                        <div class="property-imgs">
                            <div class="property-main-img">
                                <div class="property-img">
                                    <img src="https://via.placeholder.com/770x515" alt="">
                                </div><!--property-img end-->
                            </div><!--property-main-img end-->
                        </div><!--property-imgs end-->
                        <div class="descp-text">
                            <h3>Description</h3>
                            <p>${property.description}</p>
                        </div><!--descp-text end-->
                        <div class="details-info">
                            <h3>Detail</h3>
                            <ul>
                                ${getDetails(property)}
                            </ul>
                        </div><!--details-info end-->
                    </div><!--property-pg-left end-->
                </div>
                <div class="col-lg-4 pr-0">
                    <div class="sidebar layout2">
                    </div><!--sidebar end-->
                </div>
            </div>
        </div><!--property-single-page-content end-->
    </div>

`
    const container = document.getElementsByClassName('property-single-pg')[0];
    if (container) {
        container.appendChild(div)
    }
}
function getDetails(property) {
    let list = ``;
    Object.keys(propertyDetailsKeys).forEach(key => {
        list += property[key] 
        ? `<li>
            <h4>${propertyDetailsKeys[key]}: </h4>
            <span>${key === 'ConstructionDate' || key === 'ComissioningDate' ? new Date(property[key]).toDateString() : property[key]}</span>
        </li>` : ``
    })
    return list
    
}

loadProperties()