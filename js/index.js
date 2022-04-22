let data = window.localStorage.getItem('response')
if(data){
    data = JSON.parse(data)
    list.innerHTML += `
<img class="avatar-img" src="${data.data.profileImg}" alt="avatar-img" width="32px" height="32px"></img>
`
}
else{
    list.innerHTML += `
<img class="avatar-img" src="./img/avatar.jpg" alt="avatar-img" width="32px" height="32px"></img>
`
}

const navbarList = document.querySelector('.navbar-list')
const navbarList1 = document.querySelector('.navbar-list')

async function render(){
    let users = await request(API + '/users','GET')
    let string = ""
    users.map(user => {
        string += `
            <li onclick = "chek(${user.userId})"class="channel" data-id="${user.userId}">
            <a href="#">
                <img src="${user.profileImg}" alt="channel-icon" width="30px" height="30px">
                <span>${user.username}</span>
            </a>
        </li>
        `
    })
    navbarList.innerHTML += string

}
render()

async function massageRender(){
    let files = await request(API + '/files','GET')
    str = ""
    files.map(file => {
        str += `
        <li class="iframe">
            <video src="${file.viewFile}" controls=""></video>
            <div class="iframe-footer">
                <img src="${file.user.profileImg}" alt="channel-icon">
                <div class="iframe-footer-text">
                    <h2 class="channel-name">${file.user.username}</h2>
                    <h3 class="iframe-title">${file.videoInput}</h3>
                    <time class="uploaded-time">${file.data} | ${file.time}</time>
                    <a class="download" href="${file.downloadLink}">
                        <span>${file.size} MB</span>
                        <img src="./img/download.png">
                    </a>
                </div>                  
            </div>
        </li> 
        `
    })
    list1.innerHTML = str
}
const form = document.querySelector('.search-box')
form.onsubmit = async (event) => {
    event.preventDefault()
    search = inputSearch.value

    let files = await request(API + '/files','GET')
    str = ""
    let file = files.filter(el => el.videoInput == search)
    file.map(file => {
        str += `
        <li class="iframe">
            <video src="${file.viewFile}" controls=""></video>
            <div class="iframe-footer">
                <img src="${file.user.profileImg}" alt="channel-icon">
                <div class="iframe-footer-text">
                    <h2 class="channel-name">${file.user.username}</h2>
                    <h3 class="iframe-title">${file.videoInput}</h3>
                    <time class="uploaded-time">${file.data} | ${file.time}</time>
                    <a class="download" href="${file.downloadLink}">
                        <span>${file.size} MB</span>
                        <img src="./img/download.png">
                    </a>
                </div>                  
            </div>
        </li> 
        `
    })
    list1.innerHTML = str
    inputSearch.value = ''
}
async function chek(id){
    
    let files = await request(API + '/files','GET')
    str = ""
    let file = files.filter(el => +el.user.userId == +id)
    file.map(file => {
        str += `
        <li class="iframe">
            <video src="${file.viewFile}" controls=""></video>
            <div class="iframe-footer">
                <img src="${file.user.profileImg}" alt="channel-icon">
                <div class="iframe-footer-text">
                    <h2 class="channel-name">${file.user.username}</h2>
                    <h3 class="iframe-title">${file.videoInput}</h3>
                    <time class="uploaded-time">${file.data} | ${file.time}</time>
                    <a class="download" href="${file.downloadLink}">
                        <span>${file.size} MB</span>
                        <img src="./img/download.png">
                    </a>
                </div>                  
            </div>
        </li> 
        `
    })
    list1.innerHTML = str
}
const voice1 = new webkitSpeechRecognition()

voice1.lang = 'uz-UZ'
voice1.continious = false

voice1.onresult = async event => {
    const color = event.results[0][0].transcript

    let files = await request(API + '/files','GET')
    str = ""
    let file = files.filter(el => el.videoInput == color)
    file.map(file => {
        str += `
        <li class="iframe">
            <video src="${file.viewFile}" controls=""></video>
            <div class="iframe-footer">
                <img src="${file.user.profileImg}" alt="channel-icon">
                <div class="iframe-footer-text">
                    <h2 class="channel-name">${file.user.username}</h2>
                    <h3 class="iframe-title">${file.videoInput}</h3>
                    <time class="uploaded-time">${file.data} | ${file.time}</time>
                    <a class="download" href="${file.downloadLink}">
                        <span>${file.size} MB</span>
                        <img src="./img/download.png">
                    </a>
                </div>                  
            </div>
        </li> 
        `
    })
    list1.innerHTML = str
}
function voice() {
    voice1.start()
}


chek()
massageRender()
const datalist = document.querySelector('#datalist')
async function datalist1(){
    let files = await request(API + '/files','GET')
    let str = ""
    for (const file of files) {
        str += `
        <option value="${file.videoInput}">
`
    }
    datalist.innerHTML = str
}
datalist1()
