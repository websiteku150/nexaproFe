import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Api from "./api";
import './register.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'

const dummyData = [
    {username: 'admin', password: 'admin123',email: 'admin123@gmail.com', role:'admin'},
    {username: 'customer', password: 'customer',email:'customer123@gmail.com', role:'customer'},
]
function Register(){

    const [users,setUsers] = useState(dummyData)
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate();
    
    const handleRegister = (e) => {
        e.preventDefault();
        if (password !== confirm){
            setMessage("Kata Sandi dan Konfirmasi tidak sama ")
            return;
        }
        if (users.find(f =>f.email === email && f.username === username && f.password === password)){
            Swal.fire({
            icon: 'error',
            title: 'Gagal Registrasi',
            text: 'Ganti Data Anda, Tidak Boleh sama',
            showConfirmButton: 'Oke',
            timer: 2000
            })
                return;
        }

        
        const newUser = {username, password,email,  role: 'customer'};
        setUsers([...users, newUser])
        Swal.fire({
            icon: 'success',
            title: 'Registrasi Berhasil!',
            text: 'Akun kamu sudah dibuat. Selamat datang!',
            showConfirmButton: false,
            timer: 2000
        }).then(() => {navigate("/customer");}, 1000);
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
        <div className="container-register">
        <div className="register-box">
            <h1 className="logo">NEXAPRO</h1>
            <p className="tagline-register">Buat Akun Baru</p>
            <form onSubmit={handleRegister}>
                <div class="mb-3 input-group">
                    <span class="input-group-username-register"><i class="bi bi-person" style={{color:'#1e40af'}}></i></span>
                    <input
                    className="form-control-register"
                    type="text"
                    placeholder="Nama Pengguna"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    />
                </div>
                <div class="mb-3 input-group">
                    <span class="input-group-email-register"><i class="bi bi-envelope" style={{color:'#1e40af'}}></i></span>
                    <input
                    className="form-control-register"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    />
                </div>
                <div class="mb-3 input-group password-group">
                    <span class="input-group-password-register" ><i class="bi bi-lock" style={{color:'#1e40af'}}></i></span>
                    <input
                    className="form-control-register"
                    type={showPassword? "text" : "password"}
                    placeholder="Kata Sandi"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    />
                    <span
                        className="toggle-password"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{ cursor: "pointer", marginLeft: "8px", color:'#2563eb',fontSize: 20  }}
                        >
                        <i className={showPassword ? "bi bi-eye" : "bi bi-eye-slash "}></i>
                    </span>
                </div>
                <div class="mb-3 input-group password-group">
                    <span class="input-group-confirm-register"><i class="bi bi-shield-lock" style={{color:'#1e40af'}}></i></span>
                    <input
                    className="form-control-register"
                    type={showPassword? "text" : "password"}
                    placeholder="Konfirmasi Kata Sandi"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    required
                    />
                    <span
                        className="toggle-password"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{ cursor: "pointer", marginLeft: "8px", color:'#2563eb', fontSize: 20 }}
                        >
                        <i className={showPassword ? "bi bi-eye" : "bi bi-eye-slash"}></i>
                    </span>
                </div>
                <button type="Submit" className="btn-register">Buat Akun</button>
            </form>
            <p>Sudah punya akun? <Link to='/login'>Masuk</Link></p>
            {message && (
            <div className="message-register">
                {message}
            </div>
            )}
        </div>
        </div>
    )
}
export default Register;