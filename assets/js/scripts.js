let USERNAME = null

let localStorageKey = {
    jwt: "renewableJwt",
    usaername: "renewableUsername"
}

const users = []
function isUserConnected() {
    console.log("isUser", localStorage.getItem(localStorageKey.username))
    if (localStorage.getItem(localStorageKey.username)) {
        USERNAME = localStorage.getItem(localStorageKey.usaername)
        console.log(USERNAME)
        $(".signin-btn").hide()
        $( ".username-info").append( `
            <li class="nav-item">
                <a href="#" class="nav-link">
                    <span><b class="">Hello, ${USERNAME}</b></span>
                </a>
            </li>
        `);
    } 
}
isUserConnected()




$(window).on("load", async function () {
    "use strict";

    await fetchComponent('header')
    await fetchComponent('footer')
    await fetchComponent('popups')

    isUserConnected()


    $(".features-dv form ul li input:checkbox").on("click", function () {
        return false;
    });

    $(".rtl-select").on("click", function () {
        window.location.href = "17_Features_Example_Alt_Titlebar.rtl.html"
    });
    $(".eng-select").on("click", function () {
        window.location.href = "17_Features_Example_Alt_Titlebar.html"
    });

    /*==============================================
                      Custom Dropdown
    ===============================================*/

    $('.drop-menu').on('click', function () {
        $(this).attr('tabindex', 1).focus();
        $(this).toggleClass('active');
        $(this).find('.dropeddown').slideToggle(300);
    });
    $('.drop-menu').on("focusout", function () {
        $(this).removeAttr('tabindex', 1).focus();
        $(this).removeClass('active');
        $(this).find('.dropeddown').slideUp(300);
    });
    $('.drop-menu .dropeddown li').on('click', function () {
        $(this).parents('.drop-menu').find('span').text($(this).text());
        $(this).parents('.drop-menu').find('span').addClass("selected");
        $(this).parents('.drop-menu').find('input').attr('value', $(this).attr('id'));
    });


    /*==============================================
                      POPUP FUNCTIONS
    ===============================================*/
    $(".signin-op, .signin-open").on("click", function () {
        $("#sign-popup").toggleClass("active");
        $("#register-popup").removeClass("active");
        $(".wrapper").addClass("overlay-bgg");
    });
    $(".open-contact-popup").on("click", function () {
        $("#contact-popup").toggleClass("active");
        $("#register-popup").removeClass("active");
        $("#sign-popup").removeClass("active");
        $(".wrapper").addClass("overlay-bgg");
    });
    $("html").on("click", function () {
        $("#sign-popup").removeClass("active");
        $("#contact-popup").removeClass("active");
        $("#thankyou-popup").removeClass("active");
        $(".wrapper").removeClass("overlay-bgg");
    });
    $(".signin-op, .popup, .signin-open").on("click", function (e) {
        e.stopPropagation();
    });
    $(".open-contact-popup, .popup").on("click", function (e) {
        e.stopPropagation();
    });

    $(".reg-op").on("click", function () {
        $("#register-popup").toggleClass("active");
        $(".wrapper").addClass("overlay-bgg");
        $("#sign-popup").removeClass("active");
    });
    $("html").on("click", function () {
        $("#register-popup").removeClass("active");
        $(".wrapper").removeClass("overlay-bgg");
    });
    $(".reg-op, .popup").on("click", function (e) {
        e.stopPropagation();
    });



    /*==============================================
                FEATURES TOGGLE FUNCTION
    ===============================================*/


    $(".more-feat > h3").on("click", function () {
        $(".features_list").slideToggle();
    });


    /*==============================================
                    HALF MAP POSITIONING
    ===============================================*/


    var hd_height = $("header").innerHeight();
    $(".half-map-sec #map-container.fullwidth-home-map").css({
        "top": hd_height
    });
    $(".half-map-sec").css({
        "margin-top": hd_height
    });



    /*==============================================
        SETTING POSITION ACRD TO CONTAINER
    ===============================================*/


    var offy = $(".container").offset().left;
    $(".banner_text").css({
        "left": offy
    });

    $(".banner_text.fr").css({
        "right": offy
    });


    if ($(window).width() > 768) {
        var aprt_img = $(".apartment-sec .card_bod_full").innerHeight();
        $(".apartment-sec .img-block").css({
            "height": aprt_img
        });
    };

    $(".close-menu").on("click", function () {
        $(".navbar-collapse").removeClass("show");
        return false;
    });




    /*==============================================
                      SETTING HEIGHT OF DIVS
    ===============================================*/

    var ab_height = $(".agent-info").outerHeight();
    $(".agent-img").css({
        "height": ab_height
    });


    /*==============================================
                    SMOOTH SCROLLING
    ===============================================*/

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    /*==============================================
                      DROPDOWN EFFECT
    ===============================================*/


    $('.dropdown').on('show.bs.dropdown', function (e) {
        $(this).find('.dropdown-menu').first().stop(true, true).slideDown(300);
    });

    $('.dropdown').on('hide.bs.dropdown', function (e) {
        $(this).find('.dropdown-menu').first().stop(true, true).slideUp(200);
    });


    /*==============================================
                      ALERT FUNCTIONS
    ===============================================*/



    $(".popular-listing .card .card-footer a .la-heart-o").on("click", function () {
        $(".alert-success").addClass("active");
        return false;
    });
    $(".popular-listing .card .card-footer a .la-heart-o, .alert-success").on("click", function (e) {
        e.stopPropagation();
    });

    $(".close-alert").on("click", function () {
        $(".alert-success").removeClass("active");
        return false;
    });


    /*==============================================
                      POPULAR LISTING HOME PAGE
    ===============================================*/



});

async function fetchComponent(compName) {
    await fetch(`./${compName}.html`)
        .then(response => {
            return response.text()
        })
        .then(data => {
            document.querySelector(compName).innerHTML = data;
        });
}


function loadProperties(length) {
    const div = document.createElement('div');
    div.className = 'row'
    const end = length ? length : properties.length
    // console.log(window.location.href);

    properties.slice(0, end).forEach((property, index) => {
        div.innerHTML +=
            `<div class="col-lg-4 col-md-4 col-sm-6">
        <div class="card">
<div class="open-contact-popup">
    <div class="img-block">
        <div class="overlay"></div>
        <img src="assets/properties/${index+1}.jpg" alt="" class="img-fluid">
        <div class="rate-info">
            <h5>${property.SalesPrice}</h5>
            <span>${property.AssetStatus}</span>
        </div>
    </div>
</div>
<div class="card-body">
    <a href="" title="">
        <h3>${property.Name}</h3>
        <p> <i class="la la-map-marker"></i>${property.Country}</p>
    </a>
    <ul>
        <li>${property.MW} MW</li>
        <li>${property.PropertyType}</li>
        <li>${property.Percent}</li>
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

function displayTerms() {
    const select = document.getElementsByClassName('select-country')[0]
    // console.log(select)
    const country = select.options[select.selectedIndex].value;
    // console.log(country)
    const termsDiv = document.getElementsByClassName('terms')[0]
    console.log(termsDiv)
    termsDiv.textContent = accrediatiaionTerms.filter(term => {
        // console.log(term.Country, country)
        return term.Country === country
    }).map(term => {
        console.log(term)
        return term.Text
    })[0]
}

function register() {
    const keys = ['username', 'email', 'passwords', 'country']
    console.log('registering', )
    // console.log(document.querySelectorAll('form')[2])
    // const data = new FormData(document.querySelectorAll('form')[2])
    // console.log(...data ,typeof data)
    // let obj = {}
    // for (let index = 0; index < keys.length; index++) {
    //     console.log()
    //     obj = {
    //         ...obj,
    //         [keys[index]]: data[index]
    //     }
        
    // }
    console.log($("input[name='username']")[0].value)
    console.log($("input[name='email']")[0].value)
    console.log($("input[name='password']")[0].value)
    console.log($("input[name='country']"))


    const user = {
        username: $("input[name='username']")[0].value,
        email: $("input[name='email']")[0].value,
        password: $("input[name='password']")[0].value,
    }

    users.push(user)
    console.log("users:", users)
//     var xmlHttp = new XMLHttpRequest();
//     xmlHttp.onreadystatechange = function () {
//         if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
//             const jwt = JSON.parse(xmlHttp.response).jwt
            // saveToLocalStorage(localStorageKey.jwt, jwt);
            console.log($("input[name='username']"))
            saveToLocalStorage(localStorageKey.usaername, $("input[name='username']")[0].value);
            $("#thankyou-popup").toggleClass("active");
            $("#register-popup").removeClass("active");
            $("#sign-popup").removeClass("active");
            $(".wrapper").addClass("overlay-bgg");
//         }
//     }
//     xmlHttp.open("post", "http://localhost:1337/auth/local/register");
//     xmlHttp.send(data);
}

function signIn() {
    console.log('signing', )
    console.log(document.querySelectorAll('form')[1])
    const data = new FormData(document.querySelectorAll('form')[1])
    console.log(...data)
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            const jwt = JSON.parse(xmlHttp.response).jwt
            console.log(JSON.parse(xmlHttp.response).user.usaername, JSON.parse(xmlHttp.response).user, JSON.parse(xmlHttp.response))
            saveToLocalStorage(localStorageKey.jwt, jwt);
            saveToLocalStorage(localStorageKey.usaername, JSON.parse(xmlHttp.response).user.username);
            location.reload();
        }
    }
    xmlHttp.open("post", "http://localhost:1337/auth/local");
    xmlHttp.send(data);
}

function handleSearchClick() {
    const country = document.getElementById("country").value;
    const propertyType = document.getElementsByClassName("selected")[0].innerText;
    const newProperties = properties.filter(p => {
        console.log("p:", p, "country", country, "PropertyType", propertyType, )
        return p.PropertyType === propertyType
    })
    console.log("TCL: handleSearchClick -> newProperties", newProperties)



    // return true

}

function saveToLocalStorage(key, value) {
    localStorage.setItem(key, value);
}



function openSignIn() {
    console.log("hello", $("#sign-popup"))
    $("#sign-popup").toggleClass("active");
    console.log(($("#sign-popup")))
    $("#register-popup").removeClass("active");
    $(".wrapper").addClass("overlay-bgg");
}