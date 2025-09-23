import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
// import Api from "./api";

const dummyData = [
    {username: 'admin', password:'admin123', role:'admin'},
    {username: 'pelanggan', password:'pelanggan123', role:'customer'},
]

function Login(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e)=>{
        
        e.preventDefault();
        const user = dummyData.find(
            f => f.username === username && f.password === password
        );

    if(user){
        setMessage('Login Berhasil')
        
        if(user.role === "admin"){
            navigate('/admin')
        } else{
            navigate('/customer')
        }
    } else{
        setMessage('Login gagal, Pastikan akun sudah terdaftar')
    }

    // try{
    //     const res = await Api.post ('/Login', {username, password});
    //     const data = res.data;

    //     if(data.success){
    //         localStorage.setItem('token', data.token);
    //         if (data.role === admin) navigate('/admin');
    //         else(navigate('/customer'))
    //     } else {
    //         setMessage(data.message)
    //     }
    // } catch (err){
    //     setMessage(err.response?.data?.message || 'Serevr Error')
    // }
        }

    
    return(
        <div>
            <h2>Login Dulu yaa</h2>
            <form onSubmit={handleLogin}>
                <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
                />
                <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e=> setPassword(e.target.value)}
                required
                />
                <br/><br/>
                <button type="Submit">Login</button>
            </form>
            <p style={{color: 'red'}}>{message}</p>
            <p>Belum punya akun? <Link to='/register'>Register</Link></p>
        </div>
    )

}
export default Login;