


const express = require("express")
const collection = require("./mongo")
const cors = require("cors")
const app = express()
app.use(express.json())
const bcrypt = require('bcrypt');
const e = require("express")
app.use(cors())
app.post("/login", async (req, res) => {
    const { username, password } = req.body
    const data = {
        username: username,
        password: password
    }
    try {
        // check the username
        const check =await collection.findOne({ username: username })
        if (check){
            // check password
            const isPasswordMatched = await bcrypt.compare(password, check.password);
            console.log(check)
            if (isPasswordMatched){
                
                res.json("success")
            }
            else{
                res.json("check pwd")
            }
        }

    }
    catch (e) {
        res.json("fail")
    }

})

app.post("/signup", async (req, res) => {
    const { username, password} = req.body

    const data = {
        username: username,
        password: password,
    
    }

    try {
        const check = await collection.findOne({ username: username })


        if (check) {

            res.json("exist")
        }
        else {
            res.json("notexist")
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // const hashedPassword = await bcrypt.hash(request.body.password, 10);
            const v = ({ username, password: hashedPassword })
            console.log(v)
            await collection.insertMany([v])
        }

    }
    catch (e) {
        res.json("fail")
    }

})

app.listen(8000, () => {
    console.log("port connected");
})
