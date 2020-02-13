
function saveToLocalStorage(key, value) {
    localStorage.setItem(key, value);
}

async function register() {
    console.log($("input[name='username']")[0].value)
    console.log($("input[name='email']")[0].value)
    console.log($("input[name='password']")[1].value)
    console.log($("input[name='country']"))

    const username = $("input[name='username']")[0].value
    const email = $("input[name='email']")[0].value
    const password = $("input[name='password']")[1].value

    const url = `username=${username}&email=${email}&password=${password}`;
    try {
        const response = await makeRequest("post", `${apiUrl}/auth/local/register`, url)
        const jwt = JSON.parse(response).jwt
        saveToLocalStorage(localStorageKey.jwt, jwt);
        saveToLocalStorage(localStorageKey.username, username);
        $("#thankyou-popup").toggleClass("active");
        $("#register-popup").removeClass("active");
        $("#sign-popup").removeClass("active");
        $(".wrapper").addClass("overlay-bgg");
        isUserConnected()
        return false
    } catch (error) {
        console.log("erroe", $(".register-error"), JSON.parse(error.statusText).message[0].messages[0].message)
        $(".register-error").html(JSON.parse(error.statusText).message[0].messages[0].message)
    }

}

function isUserConnected() {
    console.log("isUser", localStorage.getItem(localStorageKey.username))
    if (localStorage.getItem(localStorageKey.jwt)) {
        USERNAME = localStorage.getItem(localStorageKey.username)
        $(".signin-btn").hide()
        $(".username-info").append(`
            <li class="nav-item">
                <a href="#" class="nav-link">
                    <span><b class="">Hello, ${USERNAME}</b></span>
                </a>
            </li>
        `);
    }
}
isUserConnected()


function signIn(e) {
    // TODO
    e.preventDefault();
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
            return false
        }
    }
    xmlHttp.open("post", `${apiUrl}/auth/local`);
    xmlHttp.send(data);
    return false

}




