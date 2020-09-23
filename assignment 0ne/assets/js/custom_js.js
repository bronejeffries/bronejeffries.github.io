const DIR = "file:///media/coseke-pc/ea20a456-fd67-43d9-a762-f50db6db9caa/projects/learning/Tunga%20Projects/assignment%200ne/"
function checkSession(){

    logged_in = JSON.parse(localStorage.getItem('loggedIn'))
    if (logged_in!=true) {
        location.href = DIR+"app/login.html"
    }
}