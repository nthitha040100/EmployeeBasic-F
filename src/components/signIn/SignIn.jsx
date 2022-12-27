import React, { useState } from "react";
import axios from "axios";
import './SignIn.css';
import {useNavigate} from "react-router-dom";


const SignIn = () => {

  const link = "http://localhost:3500/signIn";
  const [data, setData] = useState({
    firstName: "",
    password: ""
  });

  const navigate = useNavigate();

  function handle(e) {
    const newData = {...data};
    newData[e.target.id] = e.target.value
    setData(newData)
  }
  
  function submit(e) {
    e.preventDefault();
    axios.post(link, {
      firstName: data.firstName,
      password: data.password
    })
    .then((res) => {
      let token = res.data.token;
      localStorage.setItem('token','Bearer '+token);
      navigate(`/homePage/${data.firstName}`);
    })
    .catch(err => {
      if(err.response && err.response.data){
        document.getElementById("errorField").innerHTML = err.response.data.message;
      }
    })
  }
  

  return (
    <>
        <div className="loginCredentials">
          <h3>Account Login</h3>
          <form id="inputForm" onSubmit={(e) => submit(e)}>
            <input onChange={(e) => handle(e)} id ="firstName" value= {data.firstName} className="inputData" type="text" name="firstName" placeholder="First Name" />
            <input onChange={(e) => handle(e)} id ="password" value= {data.password} className="inputData" type="password" name="password" placeholder="Password" />
            <button id="loginbtn" type="submit" name="submit">SIGN IN</button>
            <p id="errorField"></p>
          </form>
            <h6 className="redirectLink">Haven't Registered yet? <a href= "/signUp" ><strong>Register Now</strong></a></h6>
        </div>
    </>
  );
}

export default SignIn;