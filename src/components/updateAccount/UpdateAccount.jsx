import axios from 'axios'
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import './updateAccount.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import getTodayDate from '../../utils/getTodayDate';
import Navbar from '../Navbar/Navbar';
toast.configure();


function UpdateAccount() {

    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        dob: '',
        zipCode: '',
        state: '',
        country: ''
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
    // const [fileName, setFileName] = useState("");

    const shouldSubmit = () => {
        for (const [value] of Object.entries(validation)) {
            if (value === '') {
                return true;
            } else {
                return false
            }
        }
    }

    useEffect(() => {
        getPrefilledData()
    }, [])


    function handle(e) {

        checkValidation(e.target.id, e.target.value);
        const newData = { ...data };
        newData[e.target.id] = e.target.value
        setData(newData)
    }

    const saveFile = (e) => {
        setFile(e.target.files[0]);
    };

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
                // let pattern = new RegExp(/^(0?[1-9]|[1-2][0-9]|3[01])-(0?[1-9]|1[0-2])-\d{4}$/);
                // let today = new Date();
                // console.log(today.toLocaleDateString());
                // let date = new Date(value);
                if (!value) {
                    errors.dob = "*Field is required";

                }
                // else if (!pattern.test(value)) {
                //     errors.dob = "*Date of Birth should be in YYYY-MM-DD format";

                // }
                // else if (today < date) {
                //     errors.dob = "*Date of Birth should be less than today's date";

                // }
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

    const update = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('photo', file)
        formData.append('firstName', data.firstName)

        const headers = {
            'authorization': localStorage.getItem('token'),

        }
        if (shouldSubmit) {

            axios.put('http://localhost:3500/editAccount', {
                firstName: data.firstName,
                lastName: data.lastName,
                dob: data.dob,
                zipCode: data.zipCode,
                state: data.state,
                country: data.country
            }, { headers })
                .then(res => {
                    axios.post('http://localhost:3500/uploadImage',
                        formData, {
                            headers: { 'Content-Type': 'multipart/form-data' }
                    }).then(() => {
                        toast.success(`${res.data.message}`);
                    }).catch(err => {
                        console.log(err.response);
                    })

                }).catch(err => {

                    console.log(err.message)
                    if (err.response.data) {
                        toast.error(err.response.data.message || err.response.data.errors[0].msg)
                    }

                })
        } else {
            toast("Please update form with valid inputs only")
        }
    }

    const getPrefilledData = () => {
        axios.get('http://localhost:3500/getAccountInfo', {
            headers: {
                authorization: localStorage.getItem('token')
            }
        }).then((res) => {
            let d = res.data.Data.Result[0];
            console.log(`d.dob: ${d.dob}`)

            setData({
                ...data,
                firstName: d.firstName,
                lastName: d.lastName,
                dob: d.dob,
                zipCode: d.zipCode,
                state: d.state,
                country: d.country
            });

        }).catch((err) => {
            console.log(err);
        })
    }


    // function dateFormat(date){
    //     console.log(date);
    //     let dateArr = date.split('-');
    //     let dd = dateArr[0];
    //     let mm = dateArr[1];
    //     let yyyy = dateArr[2];

    //     return (yyyy +"-"+ mm +"-"+ dd)
    // }


    return (
        <>
            <Navbar />
            <div id="UpdateBox">
                <h2>Update User</h2>
                <form onSubmit={(e) => update(e)} autoComplete='off' encType='multipart/form-data'>
                    <input onChange={(e) => handle(e)} id="firstName" value={data.firstName} type="text" name="firstName" placeholder="First Name" required />
                    {validation.firstName && <p className="error">{validation.firstName}</p>}

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

                    <input onChange={(e) => saveFile(e)} id="profilePic" type="file" name="photo" />

                    <button id="updateBtn" type="submit" name="submit" >UPDATE</button>
                </form>
            </div>
        </>
    )
}

export default UpdateAccount;
