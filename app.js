const express = require('express')
const app = express()
const port =5000
const dbconnect = require('./db/dbconnect')
const web = require('./routes/web')
const mongoose = require('mongoose')
const cookieparser = require('cookie-parser')
const fileUpload = require('express-fileupload')
const cors = require('cors')



//file upload configure
app.use(fileUpload({
    useTempFiles: true,
    // tempFileDir: '/tmp/'
}))

//cors configure
app.use(cors())


//env configure
const dotenv = require('dotenv')
dotenv.config({})
const PORT = process.env.PORT || 5000


app.use(express.json())

//mongodb connection
dbconnect()

//localhost server
app.use('/api',web)
app.listen(port,()=>{
    console.log("server start localhost:5000")
})