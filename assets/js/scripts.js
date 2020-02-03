
$(window).on("load", async function () {
    "use strict";


    await fetchComponent('header')
    await fetchComponent('footer')
    await fetchComponent('popups')

    isUserConnected()
    markHeaderByUrl()

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




function displayTerms() {
    const select = document.getElementsByClassName('select-country')[0]
    // console.log(select)
    const country = select.options[select.selectedIndex].value;
    // console.log(country)
    const termsDiv = document.getElementsByClassName('terms')[0]
    termsDiv.textContent = accrediatiaionTerms.filter(term => {
        // console.log(term.Country, country)
        return term.Country === country
    }).map(term => {
        
        return term.Text
    })[0]
}



function handleSearchClick() {
    const country = $('#country li.selected').text();
    const propertyType = $('#propertyType li.selected').text();
    const newProperties = properties.filter(p => {
        console.log("p:", p, "country", country, "PropertyType", propertyType)
        return p.PropertyType === propertyType
    })
}

// TODO:

function markHeaderByUrl() {
    var url = new URL(window.location.href);
    console.log(url.pathname)
    // var page = document.getElementById();
    // console.log("page:", page)

}

