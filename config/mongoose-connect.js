const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://spdh427:wOw9EZoA4Ye47t8m@suprioy.jbdl4qj.mongodb.net/URLshortnerdb")
.then((res)=>{
    console.log("Mongodb connected!")
}).catch((err)=>{
    console.log("No connection!", err)
})

module.exports = mongoose.connection