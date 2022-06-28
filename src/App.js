import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./reset.css";
import React from "react";

import SignUp from "./Components/SignUp";
import Login from "./Components/Login";

import UserContext from "./Context/UserContext";

export default function App(){

    const [token,setToken] = React.useState("")

    return(
        <UserContext.Provider value={{token,setToken}}>
            <BrowserRouter>
                    <Routes>
                        <Route path="/" element={ <Login /> } />
                        <Route path="/cadastro" element={ <SignUp /> } />
                    </Routes>
            </BrowserRouter>
        </UserContext.Provider>
    )
}