import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Card from '../card/Card';
import Navbar from '../Navbar/Navbar';


function GetAccInfo() {

    const [info, setInfo] = useState([]);

    useEffect(() => { actInfo(); }, []);


    // const seperateDate = (date) => {
    //     return date.split('T')[0];
    // }

    const actInfo = () => {
        axios.get('http://localhost:3500/getAccountInfo', {
            headers: {
                authorization: localStorage.getItem('token')
            }
        })
            .then((res) => {
                setInfo(res.data.Data.Result);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <>
            <Navbar />
            {
                info.map(d =>
                    <Card 
                    className = 'accountInfo'
                    key={d.id}
                    fullName={`${d.firstName} ${d.lastName}`} 
                    dob={d.dob} 
                    zipCode={d.zipCode} 
                    state={d.state} 
                    country={d.country}
                    picPath={d.profilePicPath} />
                )

            }
            {/* <div className='getAllTable'>
                <table>
                    <tbody>

                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Date of Birth</th>
                            <th>Zip Code</th>
                            <th>State</th>
                            <th>Country</th>
                        </tr>
                        {info.map(d =>
                            <tr key={d.id}>
                                <td>{d.firstName}</td>
                                <td>{d.lastName}</td>
                                <td>{seperateDate(d.dob)}</td>
                                <td>{d.zipCode}</td>
                                <td>{d.state}</td>
                                <td>{d.country}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div> */}
        </>
    )
}

export default GetAccInfo
