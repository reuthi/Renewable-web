function startMap () {
    "use strict";
    async function initMap() {
        var t=new InfoBox;
        function o(propertyPage, imageSrc, country, l, i, s) {
            return '<a href="' + propertyPage + '" class="listing-img-container"><img src="'+ imageSrc +'"><div><div class="listing-item-content"><span><i class="la la-map-marker"></i>' + l + '</span> <h3>' + country + "</h3></div></a>"
        }
        let propertyMarkers = [],
            i = $("#map").attr("data-map-zoom"),
            a = $("#map").attr("data-map-scroll");

        var url = new URL(window.location.href);
        var country = url.searchParams.get("country");
        var properyType = url.searchParams.get("properyType");    
        var min = url.searchParams.get("min");      
        var max = url.searchParams.get("max");  
        propertyMarkers = properties.filter(property => 
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
            return [o(propertyPage, `assets/properties/${index + 1}.jpg`,`${property.region}`, "" ),
                property.lat,
                property.lng,
                index + 1,
                `<i  class="fas ${propertyIcon}"></i>`
            ]
        })
        if (void 0 !== i && !1 !== i) var n = parseInt(i);
        else n = 10;
        n = 3
        if (void 0 !== a && !1 !== a) var r = parseInt(a);
        else r = !1;
        // console.log(n)
        var m = new google.maps.Map(document.getElementById("map"), {
            zoom: n,
            scrollwheel: r,
            center: new google.maps.LatLng(41.850033, -87.6500523),
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
        $(".listing-item-container").on("mouseover", function () {
            if (void 0 !== $(this).data("marker-id")) {
                var t = $(this).data("marker-id") - 1,
                    o = f[t].div;
                $(o).addClass("clicked"), $(this).on("mouseout", function () {
                    $(o).is(":not(.infoBox-opened)") && $(o).removeClass("clicked")
                })
            }
        });
        var g = document.createElement("div");
        g.className = "map-box";
        var p,
            c,
            d = {
                content: g,
                disableAutoPan: !1,
                alignBottom: !0,
                maxWidth: 0,
                pixelOffset: new google.maps.Size(-148, -55),
                zIndex: null,
                boxStyle: {
                    width: "295px"
                },
                closeBoxMargin: "0",
                closeBoxURL: "",
                infoBoxClearance: new google.maps.Size(25, 25),
                isHidden: !1,
                pane: "floatPane",
                enableEventPropagation: !1
            },
            f = [];
        for (p = 0; p < propertyMarkers.length; p++) {
            c = propertyMarkers[p][4];
            var y = new setToMap(new google.maps.LatLng(propertyMarkers[p][1], propertyMarkers[p][2]), m, {
                marker_id: p
            }, c);
            f.push(y),
                google.maps.event.addDomListener(y, "click", function (o, i) {
                        return function () {
                            var open = false;
                            if (typeof propertyMarkers[i].open != 'undefined')
                                open = propertyMarkers[i].open;

                            jQuery.each(propertyMarkers, function () {
                                this.open = false;
                            })
                            t.close();
                            if (open) {
                                propertyMarkers[i].open = false;
                                return false;
                            }
                            propertyMarkers[i].open = true;

                            t.setOptions(d), g.innerHTML = propertyMarkers[i][0], t.open(m, o), propertyMarkers[i][3], google.maps.event.addListener(t, "domready", function () {
                                $(".infoBox-close").click(function (o) {
                                    o.preventDefault(), t.close(), $(".map-marker-container").removeClass("clicked infoBox-opened")
                                })
                            })
                        }
                    }
                    (y, p))
        }
        new MarkerClusterer(m, f, {
                imagePath: "images/",
                styles: [{
                    textColor: "white",
                    url: "",
                    height: 50,
                    width: 50
                }],
                minClusterSize: 2
            }),
            google.maps.event.addDomListener(window, "resize", function () {
                var e = m.getCenter();
                google.maps.event.trigger(m, "resize"), m.setCenter(e)
            });
        var u = document.createElement("div");
        new function (e, t) {
            u.index = 1,
                t.controls[google.maps.ControlPosition.RIGHT_CENTER].push(u),
                e.style.padding = "5px",
                e.className = "zoomControlWrapper";
            var o = document.createElement("div");
            e.appendChild(o);
            var l = document.createElement("div");
            l.className = "custom-zoom-in",
                o.appendChild(l);
            var i = document.createElement("div");
            i.className = "custom-zoom-out",
                o.appendChild(i),
                google.maps.event.addDomListener(l, "click", function () {
                    t.setZoom(t.getZoom() + 1)
                }),
                google.maps.event.addDomListener(i, "click", function () {
                    t.setZoom(t.getZoom() - 1)
                })
        }
        (u, m);
        var v = $("#scrollEnabling");
        $(v).click(function (t) {
                t.preventDefault(), $(this).toggleClass("enabled"), $(this).is(".enabled") ? m.setOptions({
                    scrollwheel: !0
                }) : m.setOptions({
                    scrollwheel: !1
                })
            }),
            $("#geoLocation, .input-with-icon.location a").click(function (e) {
                e.preventDefault(), navigator.geolocation && navigator.geolocation.getCurrentPosition(function (e) {
                    var t = new google.maps.LatLng(e.coords.latitude, e.coords.longitude);
                    m.setCenter(t), m.setZoom(12)
                })
            })
    }
    var o = document.getElementById("map");
    function buildSingleListing() {
        var t = new google.maps.LatLng({
                lng: $("#singleListingMap").data("longitude"),
                lat: $("#singleListingMap").data("latitude")
            }),
            o = new google.maps.Map(document.getElementById("singleListingMap"), {
                zoom: 15,
                center: t,
                scrollwheel: !1,
                zoomControl: !1,
                mapTypeControl: !1,
                scaleControl: !1,
                panControl: !1,
                navigationControl: !1,
                streetViewControl: !1,
                styles: [{
                    featureType: "poi",
                    elementType: "labels.text.fill",
                    stylers: [{
                        color: "#747474"
                    }, {
                        lightness: "23"
                    }]
                }, {
                    featureType: "poi.attraction",
                    elementType: "geometry.fill",
                    stylers: [{
                        color: "#f38eb0"
                    }]
                }, {
                    featureType: "poi.government",
                    elementType: "geometry.fill",
                    stylers: [{
                        color: "#ced7db"
                    }]
                }, {
                    featureType: "poi.medical",
                    elementType: "geometry.fill",
                    stylers: [{
                        color: "#ffa5a8"
                    }]
                }, {
                    featureType: "poi.park",
                    elementType: "geometry.fill",
                    stylers: [{
                        color: "#c7e5c8"
                    }]
                }, {
                    featureType: "poi.place_of_worship",
                    elementType: "geometry.fill",
                    stylers: [{
                        color: "#d6cbc7"
                    }]
                }, {
                    featureType: "poi.school",
                    elementType: "geometry.fill",
                    stylers: [{
                        color: "#c4c9e8"
                    }]
                }, {
                    featureType: "poi.sports_complex",
                    elementType: "geometry.fill",
                    stylers: [{
                        color: "#b1eaf1"
                    }]
                }, {
                    featureType: "road",
                    elementType: "geometry",
                    stylers: [{
                        lightness: "100"
                    }]
                }, {
                    featureType: "road",
                    elementType: "labels",
                    stylers: [{
                        visibility: "off"
                    }, {
                        lightness: "100"
                    }]
                }, {
                    featureType: "road.highway",
                    elementType: "geometry.fill",
                    stylers: [{
                        color: "#ffd4a5"
                    }]
                }, {
                    featureType: "road.arterial",
                    elementType: "geometry.fill",
                    stylers: [{
                        color: "#ffe9d2"
                    }]
                }, {
                    featureType: "road.local",
                    elementType: "all",
                    stylers: [{
                        visibility: "simplified"
                    }]
                }, {
                    featureType: "road.local",
                    elementType: "geometry.fill",
                    stylers: [{
                        weight: "3.00"
                    }]
                }, {
                    featureType: "road.local",
                    elementType: "geometry.stroke",
                    stylers: [{
                        weight: "0.30"
                    }]
                }, {
                    featureType: "road.local",
                    elementType: "labels.text",
                    stylers: [{
                        visibility: "on"
                    }]
                }, {
                    featureType: "road.local",
                    elementType: "labels.text.fill",
                    stylers: [{
                        color: "#747474"
                    }, {
                        lightness: "36"
                    }]
                }, {
                    featureType: "road.local",
                    elementType: "labels.text.stroke",
                    stylers: [{
                        color: "#e9e5dc"
                    }, {
                        lightness: "30"
                    }]
                }, {
                    featureType: "transit.line",
                    elementType: "geometry",
                    stylers: [{
                        visibility: "on"
                    }, {
                        lightness: "100"
                    }]
                }, {
                    featureType: "water",
                    elementType: "all",
                    stylers: [{
                        color: "#d2e7f7"
                    }]
                }]
            });
        $("#streetView").click(function (e) {
            e.preventDefault(), o.getStreetView().setOptions({
                visible: !0,
                position: t
            })
        });
        var l = document.createElement("div");
        new function (e, t) {
            l.index = 1,
                t.controls[google.maps.ControlPosition.RIGHT_CENTER].push(l),
                e.style.padding = "5px";
            var o = document.createElement("div");
            e.appendChild(o);
            var i = document.createElement("div");
            i.className = "custom-zoom-in",
                o.appendChild(i);
            var s = document.createElement("div");
            s.className = "custom-zoom-out",
                o.appendChild(s),
                google.maps.event.addDomListener(i, "click", function () {
                    t.setZoom(t.getZoom() + 1)
                }),
                google.maps.event.addDomListener(s, "click", function () {
                    t.setZoom(t.getZoom() - 1)
                })
        }
        (l, o);
        var i = "<i class='" + $("#singleListingMap").data("map-icon") + "'></i>";
        new setToMap(t, o, {
            marker_id: "1"
        }, i)
    }

    void 0 !== o && null != o && (google.maps.event.addDomListener(window, "load", initMap), google.maps.event.addDomListener(window, "resize", initMap));
    var i = document.getElementById("singleListingMap");
    function setToMap(e, t, o, l) {
        this.latlng = e,
            this.args = o,
            this.markerIco = l,
            this.setMap(t)
    }
    void 0 !== i && null != i && (google.maps.event.addDomListener(window, "load", buildSingleListing), google.maps.event.addDomListener(window, "resize", buildSingleListing)),
    setToMap.prototype = new google.maps.OverlayView,
        setToMap.prototype.draw = function () {
            var t = this,
                o = this.div;
            o || ((o = this.div = document.createElement("div")).className = "map-marker-container", o.innerHTML = '<div class="marker-container"><div class="marker-card"><div class="front face">' + t.markerIco + '</div><div class="back face">' + t.markerIco + '</div><div class="marker-arrow"></div></div></div>', google.maps.event.addDomListener(o, "click", function (o) {
                var open = false;
                if ($(this).hasClass("infoBox-opened"))
                    open = true;
                $(".map-marker-container").removeClass("clicked infoBox-opened"),
                    google.maps.event.trigger(t, "click");
                if (!open) {
                    $(this).addClass("clicked infoBox-opened");
                }
            }), void 0 !== t.args.marker_id && (o.dataset.marker_id = t.args.marker_id), this.getPanes().overlayImage.appendChild(o));
            var l = this.getProjection().fromLatLngToDivPixel(this.latlng);
            l && (o.style.left = l.x + "px", o.style.top = l.y + "px")
        },
        setToMap.prototype.remove = function () {
            this.div && (this.div.parentNode.removeChild(this.div), this.div = null, $(this).removeClass("clicked"))
        },
        setToMap.prototype.getPosition = function () {
            return this.latlng
        }
}