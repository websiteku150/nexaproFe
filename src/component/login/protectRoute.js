import React from "react";
import { Navigate } from "react-router-dom";
import jwt_decode from 'jwt-decode';

function ProtectRoute({children, role}){
    const token = localStorage.getItem('token')
    if(!token) return <Navigate to='/login'/>

    try{
        const decode = jwt_decode(token);
        if (decode.role !== role) return <Navigate to="/login"/>;
        return children
    } catch (err){
        return <Navigate to="/login"/>
    }
}

export default ProtectRoute;