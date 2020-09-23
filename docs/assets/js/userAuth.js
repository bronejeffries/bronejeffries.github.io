// userModel = require('user.js')

function routeToLogin(){
    location.href =  DIR+"app/login.html"
}

function routeToHome(){
    location.href =  DIR+"app/blogs/index.html"
}

function loginUser(user_id){
    localStorage.setItem("loggedIn",true)
    localStorage.setItem("logged_in_user",user_id)
    routeToHome()
}

function logoutUser(){
    localStorage.setItem("loggedIn",false)
    localStorage.setItem("logged_in_user",null)
    routeToLogin()
}

user_reg_form = document.getElementById('registration_form')
if (user_reg_form!=null) {
    user_reg_form.addEventListener('submit',(e)=>{
        e.preventDefault()
        user_data = {
            'username':(user_reg_form.getElementsByClassName('username_input')[0]).value,
            'email':(user_reg_form.getElementsByClassName('email_input')[0]).value,
            'password':(user_reg_form.getElementsByClassName('password_input')[0]).value
        }

        // new_user = userModel.user(user_data)
        // userModel.save_user(new_user)

        new_user = newUserEntry(user_data)
        console.log(new_user);
        saveUser(new_user)
        routeToLogin()
    })
}


user_login_form = document.getElementById('login_form')
if (user_login_form!=null) {
    user_login_form.addEventListener('submit',(e)=>{
        e.preventDefault()

        user_found = findUser((user_login_form.getElementsByClassName('username_input')[0]).value,(user_login_form.getElementsByClassName('password_input')[0]).value)
        console.log(user_found);
        if (user_found!=null) {
            loginUser(user_found.id)
        }
    })
}

user_logout_form = document.getElementById('logout')
if (user_logout_form!=null) {
    user_logout_form.addEventListener('submit',(e)=>{
        e.preventDefault()
        logoutUser()
    })
}

