import React from "react";
import './App.css';
import SignIn from "../src/components/signIn/SignIn";
import SignUp from "../src/components/signUp/signUp";
import Error from "./Error";
import { Routes, Route } from "react-router-dom";
import GetAllInfo from "../src/components/getAllInfo/GetAllInfo";
import GetAccInfo from "../src/components/getAllInfo/getAccInfo";
import DeleteAcc from "../src/components/deleteAccount/DeleteAcc";
import UpdateAccount from "../src/components/updateAccount/UpdateAccount";
import PrivateRoutes from "./utils/PrivateRoutes";
import { ToastContainer } from "react-toastify";
import HomePage from "./components/Home Page/HomePage";

const App = () => {

  return (
    <>
      <Routes>
        <Route element={<PrivateRoutes />} >
          <Route path='/homePage/:id' element={< HomePage />} />
          <Route path='/getAllInfo/:id' element={< GetAllInfo />} />
          <Route path='/getAccInfo/:id' element={<GetAccInfo />} />
          <Route path='/deleteAcc/:id' element={<DeleteAcc />} />
          <Route path='/updateAccount/:id' element={<UpdateAccount />} />
        </Route>
        <Route exact path="/" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <ToastContainer theme="colored"/>
    </>
  );
}

export default App;
