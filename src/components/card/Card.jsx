import React from 'react'
import img from "../signIn/SignInPersonImg.png"
import "../card/Card.css";

function Card(props) {
    return (
        <>
            <div className='cards'>
                <div id={props.className} className={`card ${props.className}`}>

                    {(props.picPath) ?
                        <img src={props.picPath} alt='profile_pic' className='card_img' /> :
                        <img src={img} alt='profile_pic' className='card_img' />}
                        
                    <div className='card_info'>
                        <span> <h3>{props.fullName}</h3></span>
                        <p>Date of Birth: {props.dob}</p>
                        <p>Zip Code: {props.zipCode}</p>
                        <p>State: {props.state}</p>
                        <p>Country: {props.country}</p>
                    </div>

                </div>
            </div>

        </>
    )
}

export default Card
