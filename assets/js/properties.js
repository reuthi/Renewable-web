async function getProperties() {
    const response = await makeRequest("get", `${apiUrl}/Properties`)
    properties = [...properties, ...JSON.parse(response)]
}

async function loadProperties(length) {
    console.log("loadProperties")
    await getProperties()
    const div = document.createElement('div');
    div.className = 'row'
    const end = length ? length : properties.length
    properties.slice(0, end).forEach((property, index) => {
        div.innerHTML +=
            `<div class="col-lg-4 col-md-4 col-sm-6">
                    <div class="card">
            <div class="open-contact-popup">
                 <a href="property.html?index=${index}">
                    <div class="img-block">
                        <div class="overlay"></div>
                        <img src="assets/properties/${index+1}.jpg" alt="" class="img-fluid">
                        <div class="rate-info">
                            <h5>${property.salesPrice}</h5>
                            <span>${property.assetStatus}</span>
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
                    <li>${property.propertyType}</li>
                    <li>${property.percent}</li>
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
    const index = parseInt(params)
    const property = properties[index]
    console.log(property)
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
                        <li>3 Bathrooms</li>
                        <li>2 Beds</li>
                        <li>Area 555 Sq Ft</li>
                    </ul>
                </div><!--card-body end-->
                <div class="rate-info">
                    <h5>$550.000</h5>
                    <span>For Rent</span>
                </div><!--rate-info end-->
            </div><!--card end-->
        </div><!---property-hd-sec end-->
        <div class="property-single-page-content">
            <div class="row">
                <div class="col-lg-8 pl-0 pr-0">
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
                            <p>Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit consequa ipsum, nec sagittis sem nibh id elit. Duis sed odio sit amet nibh vulputate cursus a sit amet mauris. Morbi accumsan ipsum velit. Nam nec tellus a odio tincidunt auctor a ornare odio. Sed non  mauris vitae erat cons equat auctor eu in elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himen aeos. Mauris in erat justo. Nullam ac urna eu felis dapibus condimentum sit amet a augue.</p>
                        </div><!--descp-text end-->
                        <div class="details-info">
                            <h3>Detail</h3>
                            <ul>
                                <li>
                                    <h4>Construction Tyoe:</h4>
                                    <span>Condo</span>
                                </li>
                                <li>
                                    <h4>Year Built:</h4>
                                    <span>2012</span>
                                </li>
                                <li>
                                    <h4>Units in Building: </h4>
                                    <span>87</span>
                                </li>
                                <li>
                                    <h4>Bathrooms:</h4>
                                    <span>5</span>
                                </li>
                                <li>
                                    <h4>Badrooms:</h4>
                                    <span>7</span>
                                </li>
                                <li>
                                    <h4>Flooring:</h4>
                                    <span>555 Sq Ft</span>
                                </li>
                                <li>
                                    <h4>Amenities:</h4>
                                    <span>Elevator</span>
                                </li>
                                <li>
                                    <h4>Cooling:</h4>
                                    <span>Central Cooling</span>
                                </li>
                                <li>
                                    <h4>Other Features:</h4>
                                    <span>Fireplace</span>
                                </li>
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

loadProperties()