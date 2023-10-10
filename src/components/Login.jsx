import React,{useState} from "react";
import Header from "./Header";
import "./CSS/Login.css";
import axios from "axios";
import { doLogin } from "../auth";
import { Navigate } from "react-router-dom";
import Loader from "./Loader";

function Login()
{
    const [heading,setHead]=useState("Login");
    const [Registered,setRegister]=useState(true);
    const [logStyle,setLogStyle]=useState({
        backgroundColor:"#9933ff",
        color:"white"
    })
    const [signStyle,setSignStyle]=useState({
        backgroundColor:"#e6e6e6",
        color:"black"
    })
    const [input,setInput]=useState({
        name:"",
        email:"",
        password:""
    });
    const [message,setMessage]=useState("");
    const [color,setColor]=useState("red");
    const [logged,setLogged]=useState(false);
    const [visibility,setVisibility]=useState("hidden");

    function handleLogin()
    {
        setHead("Login")
        setRegister(true);
        setSignStyle({
            backgroundColor:"#e6e6e6",
            color:"black"
        })
        setLogStyle({
            backgroundColor:"#9933ff",
            color:"white"
        })
        setMessage("");
    }
    function handleSignUp()
    {
        setHead("Signup");  
        setRegister(false);
        setLogStyle({
            backgroundColor:"#e6e6e6",
            color:"black"
        })
        setSignStyle({
            backgroundColor:"#9933ff",
            color:"white"
        })
        setMessage("");
    }

    function handleChange(e)
    {
        const {name,value}=e.target;
        setInput(prev=>{
            return {
                ...prev,
                [name]:value
            }
        })
    }

    function handleClick(e)
    {
        if(e.target.name==="Signup")
        {
            if(input.name!=="" && input.email!=="" && input.email.endsWith(".com") && !input.email.endsWith("@.com") && input.password!=="")
            {
                setVisibility("visible");
                console.log(visibility);
                axios.post(`${process.env.REACT_APP_API}/register`,{name:input.name,email:input.email,password:input.password})
                .then(res=>res.data)
                .then(data=>{
                    setVisibility("hidden")
                    if(data.message==="Registered successfully, please login")
                    {
                        setColor("green");
                        handleLogin();
                    }
                    else
                    {
                        setColor("red");
                    }
                    setMessage(data.message)
                })
            }
        }
        else if(e.target.name==="Login")
        {
            if(input.email!=="" && input.email.endsWith(".com") && !input.email.endsWith("@.com") && input.password!=="")
            {
                setVisibility("visible");
                axios.post(`${process.env.REACT_APP_API}/login`,{email:input.email,password:input.password})
                .then(res=>res.data)
                .then(data=>{
                    setVisibility("hidden")
                    if(data.message!=="wrong password" && data.message!=="User not found, please register")
                    {
                        setColor("green");
                        doLogin(data.message);
                        setLogged(true);
                        setMessage("Logged in successfully")
                    }
                    else
                    {
                        setColor("red");
                        setMessage(data.message)
                    }
                })
            }
        }
    }
    return(
        <div>
            <Header />
            <Loader style={{visibility:visibility}} />
            <div className="outer">
                <div className="login-container">
                    <h1 className="heading">{heading}</h1>
                    <div className="buttons">
                        <button style={logStyle} onClick={handleLogin} id="login-btn"  >Login</button>
                        <button style={signStyle} onClick={handleSignUp} id="signup-btn">Signup</button>
                    </div>

                    <form className="input-div" onSubmit={(e)=>e.preventDefault()}>
                        {!Registered && (
                            <input type="text" onChange={handleChange} className="input" name="name" value={input.name} placeholder="Name" required="true"/>
                        )}
                        <input type="email" onChange={handleChange} className="input" name="email" value={input.email} placeholder="Email address" required/>
                        <input type="password" onChange={handleChange} className="input" name="password" value={input.password} placeholder="Password" required/>
                        <input type="submit" onClick={handleClick} className="enter-btn" name={heading} value={heading} />
                        {logged && <Navigate to="/todo" />}
                    </form>
                            
                    {Registered && (
                        <button className="new-user" onClick={handleSignUp}>new user? <span style={{color:"#9933ff"}}>Signup</span></button>
                    )}
                    <p style={{color:color}} >{message}</p>
                </div>
            </div>
        </div>
    )
}

export default Login;