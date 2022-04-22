let data = window.localStorage.getItem('response')
if (data) data = JSON.parse(data)
else data = []
if (data.token && data.token.length == 120) window.location = 'admin'
window.API = 'https://super-imtihon.herokuapp.com'
let API = window.API


const usernameInput = document.querySelector('#usernameInput'),
    passwordInput = document.querySelector('#passwordInput'),
    registrationForm = document.querySelector('.site-form'),
    showButton = document.querySelector('#showButton'),
    title = document.querySelector('.title'),
    uploadInput = document.querySelector('#uploadInput'),
    fileName = document.querySelector('.file-name')

uploadInput.addEventListener('change', () => {
    let file = uploadInput.files[0].name
    file = file.length > 25 ? file.slice(0, 20) + '...' + file.slice(file.length - 3, file.length) : file
    fileName.textContent = file
})

registrationForm.onsubmit = async (event) => {
    event.preventDefault()
    let formData = new FormData()
    formData.append('username', usernameInput.value)
    formData.append('password', passwordInput.value)
    formData.append('file', uploadInput.files[0])

    let response = await fetch(API + '/register', {
        method: 'POST',
        body: formData
    })
    response = await response.json()
    console.log(response);
    if (response.token) {
        title.textContent = response.message
        window.localStorage.setItem('response', JSON.stringify(response))
        setTimeout(() => {
            window.location = 'admin'
        }, 1000)
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