
import React, { useState } from "react"
import axios from "axios"
import { useNavigate,Link } from "react-router-dom"
function Login() {
    const history=useNavigate();

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    
    function initial() {
        setPassword("")
        setUsername("")

    }
    async function submit(e) {
        e.preventDefault();
        try {

            await axios.post("http://localhost:8000/login", {
                username, password})
                .then(res => {
                    if (res.data === "success") {
                        history("/home")
                        console.log(res) 
                        initial()
                    }
                    if (res.data === "check pwd"){
                        console.log(res)
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







    return (
        <div className="login">
            <h1>login</h1>
            <form action="POST">
                <label htmlFor="username">username</label>
                <input id="username" type="text" value={username} onChange={(e) => { setUsername(e.target.value) }} placeholder="username" /><br />
                <label htmlFor="pwd">password</label>
                <input id="pwd" type="text" value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder="password" />
                <br />
                <input type="submit" onClick={submit} />

            </form>

            <br />
            <p>OR</p>
            <br />

            <Link to="/signup">Signup Page</Link>

        </div>
    )
}

export default Login