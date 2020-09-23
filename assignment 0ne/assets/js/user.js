
const USER_KEY = 'users'
const App_Users = getUsers()

function newUserEntry(data) {

    return {
        'username': data['username'],
        'email': data['email'],
        'password': data['password'],
        'id':(App_Users.length + 1)
    }
}

function saveUser(user) {
    App_Users.push(user)
    storeUsers()
}

function getUsers() {
    stored_users = localStorage.getItem(USER_KEY)
    if (stored_users == null) {
        stored_users = "[]"
    }
    return JSON.parse(stored_users)
}

function storeUsers() {
    localStorage.setItem(USER_KEY, JSON.stringify(App_Users))
}

function findUser(username, password) {

    user_found = null
    App_Users.forEach(user => {
        if (user != null && (user.username == username || user.email==username) && user.password == password) {
            user_found = user
        }
    });

    return user_found

}

// module.exports = {
//     'user': user,
//     'save_user': saveUser,
//     'getUsers': getUsers,
//     'storeUsers': storeUsers
// }