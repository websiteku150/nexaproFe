import React, { use } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Api from "./api";

const dummyData = [
    {username: 'admin', password: 'admin123',email: 'admin123@gmail.com', role:'admin'},
    {username: 'customer', password: 'customer',email:'customer123@gmail.com', role:'customer'},
]
function Register(){
    //roziiiiiiiii

    

    const [users,setUsers] = useState(dummyData)
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    
    const handleRegister = (e) => {
        e.preventDefault();
        if (password !== confirm){
            setMessage("Password dan Konfirmasi password tidak sama ")
            return;
        }
        if (users.find(f => f.username === username && f.password === password)){
            setMessage("Ganti Username dan Password anda")
            return;
        }

        const newUser = {username, password,email,  role: 'customer'};
        setUsers([...users, newUser])
        setMessage('Register Berhasil')
        setTimeout(() => {navigate("/customer");}, 1000);
    }
    
        // try{
        //     const res = await Api.post('/register',{
        //         username,
        //         password,
        //         email,
        //         role: 'customer'
        //     })

        //     const data = res.data;

        //     if (data.success){
        //         localStorage.setItem('token', data.token);
        //         navigate('/customer')
        //     }
        //     else {
        //         setMessage(data.message);
        //     }
        // }catch(err){
        //     setMessage(err.response?.data?.message || "SERVER ERROR");
        // }
    return(
        <div>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <input
                type="text"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                />
                <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />
                <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
                <input
                type="password"
                placeholder="Konfirmasi Password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
                />
                <button type="Submit">Register</button>
            </form>
            <p>{message}</p>
        </div>
    )
}
export default Register;