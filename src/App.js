import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./reset.css";
import React from "react";

import SignUp from "./Components/SignUp";
import Login from "./Components/Login";
import Home from "./Components/Home"

import UserContext from "./Context/UserContext";

export default function App(){

    const [token,setToken] = React.useState("");
    const [username,setUsername] = React.useState("");

    return(
        <UserContext.Provider value={{token,setToken,username,setUsername}}>
            <BrowserRouter>
                    <Routes>
                        <Route path="/" element={ <Login /> } />
                        <Route path="/cadastro" element={ <SignUp /> } />
                        <Route path="/home" element={ <Home /> } />
                    </Routes>
            </BrowserRouter>
        </UserContext.Provider>
    )
}