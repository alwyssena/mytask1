const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://indrasena197:indrasena@cluster0.dov1iki.mongodb.net/userDetails")
    .then(() => {
        console.log("success")
    })
    .catch(() => {
        console.error("error")
    })

const newSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
    


})

const collection = mongoose.model("mycollection", newSchema)
console.log(collection)
module.exports = collection