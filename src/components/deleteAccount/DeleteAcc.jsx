import axios from 'axios'
import React from 'react'
import { useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import './DeleteAcc.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from '../Modal/Modal';
import Navbar from '../Navbar/Navbar';

function DeleteAcc() {

    const [, setPass] = useState({
        password: ''
    });

    const [openModal, setOpenModal] = useState(false);

    let navigate = useNavigate();
    const para = useParams();

    const enteredPass = (pass) => {
        console.log(pass)
        
        if (pass == null) {
            toast('Please enter your password')
        } else {
            console.log(pass)
            setPass(pass)
            del(pass);
        }
    }

    const del = (pass) => {

        axios.delete('http://localhost:3500/deleteAccount', {
            headers: {
                authorization: localStorage.getItem('token')
            },
            data: {
                password: pass
            }
        })
            .then(res => {
                console.log('IN res ')
                if (res.status === 200) {
                    toast.success('Account deleted successfully');
                    navigate('/')
                }
            })
            .catch(err => {
                console.log('IN err ')
                toast.error(err.response.data.message)
            })
    }

    return (
        <>
            <Navbar />
            <h3 id='mainText' > Are you sure you want to delete your account ?</h3>
            <div className='btns'>

                <button
                    onClick={() => setOpenModal(true)}
                    id='btn'>
                    Yes
                </button>
                <Modal
                    open={openModal}
                    onClose={() => setOpenModal(false)}
                    enteredPass={enteredPass}
                />
                <button id='btn' onClick={() => { navigate(`/homePage/${para.id}`) }}>No</button>
            </div>
            <p id='err'></p>
        </>
    )
}

export default DeleteAcc
