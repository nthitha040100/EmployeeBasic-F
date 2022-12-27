import React from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import "../Home Page/HomePage.css"


function HomePage() {

    const param = useParams();

    function greeting() {
        let d = new Date();
        let time = d.getHours();

        if (time >= 0 && time < 12) {
            return ("Good morning");
        }
        if (time >= 12 && time < 20) {
            return ("Good afternoon");
        }
        if (time >= 20 && time > 0) {
            return ("Good evening");
        }
    }
    
    return (
        <div>
            <Navbar />
            <div id='welcomeContainer'>
                <p className='center'>{`${greeting()} ${param.id}`}</p>
            </div>
        </div>
    )
}

export default HomePage
