const mongoose = require('mongoose')
const Local_url = "mongodb://127.0.0.1:27017/CurdOperationMERNstack"
const Live_url = "mongodb+srv://rajat:rajat123@cluster0.kqqoudf.mongodb.net/CurdApi?retryWrites=true&w=majority&appName=Cluster0"

const dbconnect = async ()=>{
    try{
        await mongoose.connect(Live_url)
        console.log('mongodb connectd')
    }
    catch(error){
        console.log("error occured",error)
    }
}

module.exports = dbconnect