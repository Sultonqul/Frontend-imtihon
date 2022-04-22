let data = window.localStorage.getItem('response')
if (data) data = JSON.parse(data)
else data = []
if (data.token) window.location = '/'


window.API = 'https://super-imtihon.herokuapp.com'
let API = window.API

const usernameInput  = document.querySelector('#usernameInput'),
    passwordInput    = document.querySelector('#passwordInput'),
    registrationForm = document.querySelector('.site-form'),
    showButton       = document.querySelector('#showButton'),
    title            = document.querySelector('.title')


registrationForm.onsubmit = async (event) => {
    event.preventDefault()
    let formData = new FormData()
    formData.append('username', usernameInput.value)
    formData.append('password', passwordInput.value)
    let response = await fetch(API + '/login', {
        method: 'POST',
        body: formData
    })
    response = await response.json()
    if (response.token) {
        title.textContent = response.message
        window.localStorage.setItem('response', JSON.stringify(response))
        setTimeout(() => {
            window.location = 'admin'
        }, 500)
    }
}

showButton.onclick = () => {  
    if (showButton.classList.contains('zmdi-eye')) {
        showButton.classList.remove('zmdi-eye')
        showButton.classList.add('zmdi-eye-off')
        passwordInput.type = 'text'
    } else {
        showButton.classList.remove('zmdi-eye-off')
        showButton.classList.add('zmdi-eye')
        passwordInput.type = 'password'
    }
}