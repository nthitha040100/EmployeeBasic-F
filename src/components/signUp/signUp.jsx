import React, { useState } from "react";
import axios from "axios";
import "./signUp.css"
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import getTodayDate from "../../utils/getTodayDate";
toast.configure();

const SignUp = () => {

    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        dob: "",
        zipCode: "",
        state: "",
        country: "",
        password: ""
    })

    const [validation, setValidation] = useState({
        firstName: "",
        lastName: "",
        dob: "",
        zipCode: "",
        state: "",
        country: "",
        password: ""
    });

    const [file, setFile] = useState(null);

    const navigate = useNavigate();


    function handle(e) {

        checkValidation(e.target.id, e.target.value);
        const newData = { ...data };
        newData[e.target.id] = e.target.value
        setData(newData)
    }

    const saveFile = (e) => {
        setFile(e.target.files[0]);
    };

    const shouldSubmit = () => {
        for (const [value] of Object.entries(validation)) {
            if (value === '') {
                return true;
            } else {
                return false
            }
        }
    }

    const checkValidation = (id, value) => {
        let errors = validation;
        let nameRegExp = new RegExp(/^[A-Za-z]+$/);

        switch (id) {
            case 'firstName': {
                if (!value) {
                    errors.firstName = "*Field is required"
                    
                } else if (value.length > 10) {
                    errors.firstName = '*Characters should be below 10 characters'
                    
                } else if ((!nameRegExp.test(value))) {
                    errors.firstName = '*Please use alphabets only'
                    
                } else {
                    errors.firstName = ""

                }
                break;
            }
            case 'lastName': {
                if (!value) {
                    errors.lastName = "*Field is required"
                    
                } else if (value.length > 10) {
                    errors.lastName = '*Characters should be below 10 characters'
                    
                } else if ((!nameRegExp.test(value))) {
                    errors.lastName = '*Please use alphabets characters only'
                    
                } else {
                    errors.lastName = ""

                }
                break;
            }
            case 'dob': {
                let pattern = new RegExp(/^\d{4}-(0?[1-9]|1[0-2])-(0?[1-9]|[1-2][0-9]|3[01])$/);
                let today = new Date();
                let date = new Date(value);
                if (!value) {
                    errors.dob = "*Field is required";
                    
                } else if (!pattern.test(value)) {
                    errors.dob = "*Date of Birth should be in YYYY-MM-DD format";
                    
                } else if (today < date) {
                    errors.dob = "*Date of Birth should be less than today's date";
                    
                }
                else {
                    errors.dob = "";
                    
                }
                break;
            }
            case 'zipCode': {
                let pattern = new RegExp(/^([0-9]{6})$/);
                if (!value) {
                    errors.zipCode = "*Field is required";
                    
                } else if (!pattern.test(value)) {
                    errors.zipCode = "*Should be 6 numeric digits";
                    
                } else {
                    errors.zipCode = "";
                    
                }
                break;
            }

            case 'state': {
                if (!value) {
                    errors.state = "*Field is required"
                    
                } else if (value.length > 10) {
                    errors.state = '*Characters should be below 10 characters'
                    
                } else if ((!nameRegExp.test(value))) {
                    errors.state = '*Please use alphabets characters only'
                    
                } else {
                    errors.state = "";
                    
                }
                break;
            }

            case 'country': {
                if (!value) {
                    errors.country = "*Field is required"
                    
                } else if (value.length > 10) {
                    errors.country = '*Characters should be below 10 characters'
                    
                } else if ((!nameRegExp.test(value))) {
                    errors.country = '*Please use alphabets characters only'
                    
                } else {
                    errors.country = ""
                    
                }
                break;
            }

            case 'password': {
                const cond = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,20}$/;
                const password = value;
                console.log(value)
                if (!password) {
                    errors.password = "password is required";
                    
                } else if (password.length < 6) {
                    errors.password = "Password must be longer than 6 characters";
                    
                } else if (password.length >= 20) {
                    errors.password = "Password must shorter than 20 characters";
                    
                } else if (!password.match(cond)) {
                    errors.password = "Password must contain at least one lowercase, one capital letter, numbers";
                    
                } else {
                    errors.password = "";
                    
                }
                break;
            }

            default: {
                errors = "";
                
            }


        }
        setValidation(errors);
    }

    function submit(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append('photo', file)
        formData.append('firstName', data.firstName)

        if (shouldSubmit) {
            axios.post("http://localhost:3500/signUp", {
                firstName: data.firstName,
                lastName: data.lastName,
                dob: data.dob,
                zipCode: data.zipCode,
                state: data.state,
                country: data.country,
                password: data.password
            })
                .then(res => {
                    axios.post('http://localhost:3500/uploadImage',
                        formData, {
                            headers: { 'Content-Type': 'multipart/form-data' }
                    }).then(() => {                        
                        toast.success("Registered Successfully");
                        navigate('/');
                    }).catch(err => {
                        console.log(err.response);
                    })

                })
                .catch(err => {
                    if (err.response && err.response.data) {
                        toast.error(err.response.data.message);
                    }
                })
        } else {
            toast.warning("Please fill your form with valid inputs only");
        }
    }



    return (
        <>

            <div id="signUpBox">
                <h2>Registration Form</h2>
                <form onSubmit={(e) => submit(e)} autoComplete='off' encType='multipart/form-data'>
                    <input onChange={(e) => handle(e)} id="firstName" value={data.firstName} type="text" name="firstName" placeholder="First Name" required />
                    {validation.firstName && <p className="error">{validation.firstName}</p>}
                    {validation.firstName && console.log(validation)}

                    <input onChange={(e) => handle(e)} id="lastName" value={data.lastName} type="text" name="lastName" placeholder="Last Name" required />
                    {validation.lastName && <p className="error">{validation.lastName}</p>}

                    <input onChange={(e) => handle(e)} id="dob" value={data.dob} type="date" max={getTodayDate()} name="dob" placeholder="Date of Birth" required />
                    {validation.dob && <p className="error">{validation.dob}</p>}

                    <input onChange={(e) => handle(e)} id="zipCode" value={data.zipCode} type="text" name="zipCode" placeholder="Zip Code" required />
                    {validation.zipCode && <p className="error">{validation.zipCode}</p>}

                    <input onChange={(e) => handle(e)} id="state" value={data.state} type="text" name="state" placeholder="State" required />
                    {validation.state && <p className="error">{validation.state}</p>}

                    <input onChange={(e) => handle(e)} id="country" value={data.country} type="text" name="country" placeholder="Country" required />
                    {validation.country && <p className="error">{validation.country}</p>}

                    <input onChange={(e) => handle(e)} id="password" value={data.password} type="password" name="password" placeholder="New Password" required />
                    {validation.password && <p className="error">{validation.password}</p>}

                    <input onChange={(e) => saveFile(e)} id="profilePic" type="file" name="photo" required/>

                    <button id="signUpBtn" type="submit" name="submit" >REGISTER NOW</button>
                </form>
            </div>
        </>
    );
}

export default SignUp;