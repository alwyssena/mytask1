import React, { useState } from "react"
import axios from "axios"
import { Link,useNavigate } from "react-router-dom"
function Signup() {
    const history=useNavigate()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmpwd, setconfirmpwd] = useState("")
    
    function initial() {
        setPassword("")
        setUsername("")
        setconfirmpwd("")
    }
    async function submit(e) {
        e.preventDefault();
        if (validatePassword(password)) {
            try {
                await axios.post("http://localhost:8000/signup", {
                    username, password
                })
                    .then(res => {
                        if (res.data === "exist") {
                            alert("User already exists")
                            
                            initial()

                        }
                        else if (res.data === "notexist") {
                            console.log(res)
                            history("/")
                            initial()
                        }
                    })
                    .catch(e => {
                        alert("wrong details")
                        console.log(e);
                    })


            }
            catch (e) {
                console.log(e);

            }
        }
        else {
            console.log(e)
        }
    }


    function validatePassword() {
        const hasLowerCase = /[a-z]/.test(password);

        const hasUpperCase = /[A-Z]/.test(password);
        const hasDigit = /[0-9]/.test(password);
        const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);
        const isValidLength = password.length >= 8;
        const bothpwdValid = password === confirmpwd;

        return hasLowerCase && hasUpperCase && hasDigit && hasSpecialChar && isValidLength && bothpwdValid;
    }




    return (
        <div className="login">

            <h1>Signup</h1>

            <form action="POST">



                <label htmlFor="username">username</label>
                <input id="username" type="text" value={username} onChange={(e) => { setUsername(e.target.value) }} placeholder="username" /><br />
                <label htmlFor="pwd">password</label>
                <input id="pwd" type="text" value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder="password" />
                <br />

                <label htmlFor="cpwd">confirm password</label>
                <input id="cpwd" type="text" value={confirmpwd} onChange={(e) => { setconfirmpwd(e.target.value) }} placeholder="confirm password" />
                <br />


                <input type="submit" onClick={submit} />

            </form>

            <br />
            <p>OR</p>
            <br />

             <Link to="/">Login Page</Link>

        </div>
    )
}

export default Signup