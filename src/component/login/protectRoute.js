import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function ProtectRoute({children, role}){
    const token = localStorage.getItem('token')
    if(!token) return <Navigate to='/login'/>

    try{
        const decode = jwtDecode(token);
        if (decode.role !== role) return <Navigate to="/login"/>;
        return children
    } catch (err){
        return <Navigate to="/login"/>
    }
}

export default ProtectRoute;