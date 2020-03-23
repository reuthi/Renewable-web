function saveToLocalStorage(key, value) {
    localStorage.setItem(key, value);
}

async function register() {
    const username = $("input[name='username']")[0].value
    const email = $("input[name='email']")[1].value
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
        startMap()
        return false
    } catch (error) {
        $(".register-error").html(JSON.parse(error.statusText).message[0].messages[0].message)
    }
}

function isUserConnected() {
    if (localStorage.getItem(localStorageKey.jwt)) {
        USERNAME = localStorage.getItem(localStorageKey.username)
        $(".signin-btn").hide()
        $(".username-info").append(`
            <li class="nav-item">
                <a href="#" class="nav-link">
                    <span><b class="">Hello, ${USERNAME}</b></span>
                </a>
            </li>
            <li>
                <a href="#" class="nav-link">
                    <span onclick="signOut()" class="">Sign out</span>
                </a>
            </li>
        `);
    }
}
isUserConnected()


async function signin(e) {
    console.log('here')
    e.preventDefault();
    const identifier = $("input[name='email']")[0].value
    const password = $("input[name='password']")[0].value
    // // const email = $("input[name='email']")[0].value
    // const password = $("input[name='signin-password']")[0].value
    console.log($("input[name='password']"))
    const url = `identifier=${identifier}&password=${password}`;
    try {
        const response = await makeRequest("post", `${apiUrl}/auth/local`, url)
        console.log(response)
        const jwt = JSON.parse(response).jwt
        saveToLocalStorage(localStorageKey.jwt, jwt);
        saveToLocalStorage(localStorageKey.username, JSON.parse(response).user.username);
        $("#sign-popup").removeClass("active");
        $(".wrapper").removeClass("overlay-bgg");
        isUserConnected()
        startMap()
        return false
    } catch (error) {
        console.log(error)
        $(".signin-error").html(JSON.parse(error.statusText).message[0].messages[0].message)

    }
    return false
}

async function signOut() {
    localStorage.removeItem(localStorageKey.jwt)
    localStorage.removeItem(localStorageKey.username)
    window.location.reload()
}