const DIR = location.origin
function checkSession(){

    logged_in = JSON.parse(localStorage.getItem('loggedIn'))
    if (logged_in!=true) {
        location.href = DIR+"app/login.html"
    }
}