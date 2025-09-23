import React, {useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function ChangePassword(){
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const navigate = useNavigate();

    const handleReset() = async (e) => {
        
    }
}