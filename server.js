import express from 'express'
import fileUpload from 'express-fileupload'
import path from 'path'

const PORT = process.env.PORT || 5000

const app = express();
app.use(express.json())
app.use(fileUpload())


app.use(express.static(path.join(process.cwd())))

app.get('/', (req, res)=>{
    res.sendFile(path.join(process.cwd(),'index.html'));
})

app.get('/register', (req, res)=>{
    res.sendFile(path.join(process.cwd(),'register.html'))
})

app.get('/login', (req, res) =>{
    res.sendFile(path.join(process.cwd(),'login.html'))
})
app.get('/admin', (req, res) =>{
    res.sendFile(path.join(process.cwd(),'admin.html'))
})

app.listen(PORT, () => console.log(`Server is run http://localhost:${PORT}`))