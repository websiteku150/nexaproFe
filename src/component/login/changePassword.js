import React, {useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import './register.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from "react-router-dom";

function ChangePassword(){
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate();

    const handleReset = async (e) => {
        e.preventDefault();

            if(password < 6){
                    Swal.fire({
                    icon: 'error',
                    title: 'Kata Sandi Terlalu Pendek!',
                    text: 'Kata Sandi Minimal 6 Karakter',
                    showConfirmButton: 'Oke',
                    timer: 2000
                })
                return;
            }
            try{
                const res = await axios.put("", {
                    username,
                    email,
                    password,
                    role: 'customer'
                });
                Swal.fire({
                    icon: "success",
                    title: "Sukses",
                    text:"Kata Sandi berhasil diubah",
                    timer: 1500,
                    showConfirmButton: false,
                })
                navigate("/login");
            } catch (err){
                Swal.fire({
                    icon: "error",
                    title: "Terjadi Kesalahan",
                    text:"Kata Sandi Gagal diubah",
                    timer: 1500,
                    showConfirmButton: false,
                })
            }
    }
    return(
        <div className="container-register">
        <div className="register-box">
            <h1 className="logo">NEXAPRO</h1>
            <p className="tagline-register">Ganti Kata Sandi Baru</p>
            <form onSubmit={handleReset}>
                <div class="mb-3 input-group">
                    <span class="input-group-username-register"><i class="bi bi-person" style={{color:'#1e40af'}}></i></span>
                    <input
                    className="form-control-register"
                    type="text"
                    placeholder="Nama Pengguna"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    readOnly
                    style={{display: "hidden"}}
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
                <button type="Submit" className="btn-register">Ganti Kata Sandi</button>
            </form>
            <p><Link to='/login'>Kembali ke Halaman Masuk</Link></p>
        </div>
        </div>
    )
}
export default ChangePassword;