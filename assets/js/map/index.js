var map;
// const zoom = e("#map").attr("data-map-zoom");
// const scroll = e("#map").attr("data-map-scroll");
var url = new URL(window.location.href);
var country = url.searchParams.get("country");
var properyType = url.searchParams.get("properyType");    
var min = url.searchParams.get("min");      
var max = url.searchParams.get("max"); 

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: new google.maps.LatLng(41.850033, -87.6500523),
    zoom: 3,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    zoomControl: !1,
    mapTypeControl: !1,
    scaleControl: !1,
    panControl: !1,
    navigationControl: !1,
    streetViewControl: !1,
    gestureHandling: "cooperative",
    styles: [{
        featureType: "water",
        elementType: "geometry",
        stylers: [{
            color: "#e9e9e9"
        }, {
            lightness: 17
        }]
    }, {
        featureType: "landscape",
        elementType: "geometry",
        stylers: [{
            color: "#f5f5f5"
        }, {
            lightness: 20
        }]
    }, {
        featureType: "road.highway",
        elementType: "geometry.fill",
        stylers: [{
            color: "#ffffff"
        }, {
            lightness: 17
        }]
    }, {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [{
            color: "#ffffff"
        }, {
            lightness: 29
        }, {
            weight: .2
        }]
    }, {
        featureType: "road.arterial",
        elementType: "geometry",
        stylers: [{
            color: "#ffffff"
        }, {
            lightness: 18
        }]
    }, {
        featureType: "road.local",
        elementType: "geometry",
        stylers: [{
            color: "#ffffff"
        }, {
            lightness: 16
        }]
    }, {
        featureType: "poi",
        elementType: "geometry",
        stylers: [{
            color: "#f5f5f5"
        }, {
            lightness: 21
        }]
    }, {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [{
            color: "#dedede"
        }, {
            lightness: 21
        }]
    }, {
        elementType: "labels.text.stroke",
        stylers: [{
            visibility: "on"
        }, {
            color: "#ffffff"
        }, {
            lightness: 16
        }]
    }, {
        elementType: "labels.text.fill",
        stylers: [{
            saturation: 36
        }, {
            color: "#333333"
        }, {
            lightness: 40
        }]
    }, {
        elementType: "labels.icon",
        stylers: [{
            visibility: "off"
        }]
    }, {
        featureType: "transit",
        elementType: "geometry",
        stylers: [{
            color: "#f2f2f2"
        }, {
            lightness: 19
        }]
    }, {
        featureType: "administrative",
        elementType: "geometry.fill",
        stylers: [{
            color: "#fefefe"
        }, {
            lightness: 20
        }]
    }, {
        featureType: "administrative",
        elementType: "geometry.stroke",
        stylers: [{
            color: "#fefefe"
        }, {
            lightness: 17
        }, {
            weight: 1.2
        }]
    }]
  });
  getMarkers(map)
}

function getMarkers(map) {
  const propertyMarkers = properties.filter(property => 
    country ? property.country === country : true 
    && properyType ? property.properyType === property: true
    && min ? property.salesPrice ? property.salesPrice > min : true :true
    && max ? property.salesPrice ? property.salesPrice < max : true :true
)
.map((property, index) => {
    let propertyIcon;
    switch (property.propertyType) {
        case 'wind':
            propertyIcon = 'fa-wind'
            break;
        case 'solar':
            propertyIcon = 'fa-solar-panel'
            break;
        case 'hydro':
            propertyIcon = 'fa-water'
            break;
        case 'bio':
            propertyIcon = 'fa-leaf'
            break;
        case 'storage':
            propertyIcon = 'fa-box-open'
            break;
        case 'other':
            propertyIcon = ''
            break;
    }
    const propertyPage = USERNAME ? "24_Property_Single.html" + `?${index}` : '/#'
    const marker = new google.maps.Marker({position: {lat: property.lat, lng: property.lng}, map});
    console.log(marker)
    // return new google.maps.Marker({position: {lat: property.lat, lng: property.lng}, map});
})
// return propertyMarkers
}