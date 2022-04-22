let local = window.localStorage.getItem('response')
if (local) local= JSON.parse(local)
else{
    local = []
    window.location = '/register'
} 
let userId = local.data.userId
if(!local.token){
    window.location = '/register'
}
if(local.token.length != 120){
    window.location = '/register'
}
const videoInput = document.querySelector('#videoInput'),
    registrationForm = document.querySelector('.site-form'),
    submitButton = document.querySelector('#submitButton'),
    title = document.querySelector('.title'),
    uploadInput = document.querySelector('#uploadInput'),
    fileName = document.querySelector('.file-name'),
    videosList = document.querySelector('#videosList'),
    videoSlist = document.querySelector('.videos-list'),
    videoItem = document.querySelector('.video-item'),
    content = document.querySelector('.content')

function logoutBtn(){
    window.localStorage.setItem('response',JSON.stringify([]))
    window.location = '/register'
}

registrationForm.onsubmit = async (event) => {
    event.preventDefault()
    let formData = new FormData()
    let date = new Date()
    let time = `${date.getHours() < 10 ? '0' + date.getHours() : date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}`
    formData.append('videoInput', videoInput.value)
    formData.append('time', time)
    formData.append('token',local.token)
    formData.append('userId',userId)
    formData.append('file', uploadInput.files[0])

    await fetch(API + '/files', {
        method: 'POST',
        body: formData
    })
    videoInput.value = ""
}
submitButton.onclick = ()=>{
    videosList.innerHTML = null
    renderAdmin()

}
async function renderAdmin(){
    videosList.innerHTML = null
        let response = await request(API + '/files','GET')
        for (const res of response) {
            let a = [res].find(res => res.user.userId == userId)
            if(a){
                videosList.innerHTML += `
                <li class="video-item">
                <video controls="true" src="${a.viewFile}"></video>
                <p class="content" contenteditable="true">${a.videoInput}</p>
                <img onclick = "dele(${a.fileId})" class="delete-icon" src="${API + "/delete.png"}" width="25">
                </li>
                `
            }
            
        }
}
renderAdmin()
videosList.onclick = (e)=>{
    let val = e.target.textContent
    videosList.onkeyup = async (e) => {
        if(e.keyCode  == 13){
            value = e.target.textContent
            await fetch(API + '/files', {
                method: 'PUT',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({"value":value,"userId":userId, "val":val})
            })
            renderAdmin()
        }
    }
}
async function dele(id) {
        await fetch(API + '/files', {
        method: 'DELETE',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({"fileId":id})
    })
    renderAdmin()
}



