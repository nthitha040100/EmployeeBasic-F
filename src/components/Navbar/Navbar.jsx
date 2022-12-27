import React from 'react'
import { Link, useParams } from 'react-router-dom';
import logout from '../../logout';
import './Navbar.css'


function Navbar() {

  const param = useParams();
  const adminArray = ['Admin', 'Naman'];

  return (
    <>
      <div className='topNav'>
        <Link to={`/homePage/${param.id}`}>Home</Link>
        <Link to={`/getAccInfo/${param.id}`}>My Account</Link>
        {
          (adminArray.includes(param.id)) &&
          <Link to={`/getAllInfo/${param.id}`}>All Accounts</Link>
        }
        <Link to={`/updateAccount/${param.id}`}>Update Account</Link>
        <Link to={`/deleteAcc/${param.id}`}>Delete Account</Link>

        <div className='topNav-right'>
          <Link to='/' onClick={logout} >{`Logout(${param.id})`}</Link>
        </div>

      </div>


    </>
  )
}

export default Navbar




