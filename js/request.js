window.API = 'https://super-imtihon.herokuapp.com'
let API = window.API

async function request(path, method = "GET", body) {
    let response = await fetch(path, {
    method,
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
})
return await response.json()
}