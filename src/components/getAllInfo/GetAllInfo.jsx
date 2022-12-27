import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './getAllInfo.css'
import Navbar from '../Navbar/Navbar';
import Card from '../card/Card';

function GetAllInfo() {

    const [info, setInfo] = useState([]);

    useEffect(() => {
        getAll();
    }, []);

    const getAll = () => {
        axios.get('http://localhost:3500/getAll', {
            headers: {
                authorization: localStorage.getItem('token')
            }
        })
            .then(res => {
                let data = res.data.Data.Result;
                setInfo(data);
            }).catch(err => {
                console.log(`The error : ${err}`);
            })
    }
    return (
        <>
            <Navbar />
            {
                info.map(d =>
                    <Card 
                    key = {d.id}
                    fullName={`${d.firstName} ${d.lastName}`} 
                    dob={d.dob} 
                    zipCode={d.zipCode} 
                    state={d.state} 
                    country={d.country} 
                    picPath={d.profilePicPath} />
                )

            }

        </>
    )
}

export default GetAllInfo
