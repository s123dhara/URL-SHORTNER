const mongoose = require('mongoose')

mongoose.connect("mongodb://127.0.0.1:27017/URLshortnerdb")
.then((res)=>{
    console.log("Mongodb connected!")
}).catch((err)=>{
    console.log("No connection!", err)
})

module.exports = mongoose.connection