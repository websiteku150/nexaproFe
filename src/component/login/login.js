import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Api from "./api";
import "./login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";
import logo from "../img/logo.png";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      Swal.fire({
        icon: "error",
        title: "Login Gagal",
        text: "Username dan Password tidak boleh kosong",
      });
      return;
    }

    try {
      const response = await axios.post(
        "https://73e4e1fc2341.ngrok-free.app/api/Auth/login",
        {
          username,
          password,
          
        }
      );
      const data = response.data;

      if (data.token) {
        setMessage("");

        const decoded = jwtDecode(data.token);
        const role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

        localStorage.setItem("token", data.token);
        localStorage.setItem("role", role);
        localStorage.setItem("username", data.username);
        Swal.fire({
          icon: "success",
          title: "Login Berhasil!",
          text: `Selamat datang ${data.username}!`,
          showConfirmButton: false,
          timer: 2000,
        }).then(() => {
          if (role === "Admin") {
            navigate("/admin");
            console.log(role)
          } else {
            navigate("/customerHome");
          }
        });
        console.log("Respons backend:", data);
      }
    } catch (err) {

      console.error(err);
      if (err.response){
        const status = err.response.status;
        if (status === 401 || status === 400)
        {
          Swal.fire({
          icon: "error",
          title: "Login Gagal",
          text: "Username atau Password salah",
          showConfirmButton: true,
        });
        }
      }else{
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Login Gagal",
        text: "Server error, coba lagi nanti",
        showConfirmButton: true,
      });
    }
    }
  };

  return (
    <div className="container-register">
      <div className="register-box" data-aos="flip-right">
        <div className="logo">
          <img src={logo} alt="logo" style={{ height: 110, marginBottom: 0 }} />
        </div>
        <p className="tagline-register">Masuk ke Akun Anda</p>

        <form onSubmit={handleLogin}>
          {/* Username */}
          <div className="mb-3 input-group">
            <span className="input-group-username-register">
              <i className="bi bi-person" style={{ color: "#1e40af" }}></i>
            </span>
            <input
              className="form-control-register"
              type="text"
              placeholder="Nama Pengguna"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3 input-group password-group">
            <span className="input-group-password-register">
              <i className="bi bi-lock" style={{ color: "#1e40af" }}></i>
            </span>
            <input
              className="form-control-register"
              type="password"
              placeholder="Kata Sandi"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {/* Tombol Login */}
          <button type="submit" className="btn-register">
            Masuk
          </button>
        </form>

        {/* Pesan Error */}
        {message && <div className="message-register">{message}</div>}
        {/* Link Lupa Password */}
        <p className="forgot-password">
          <Link to="/changePassword" className="link-login">
            Lupa kata sandi?
          </Link>
        </p>

        {/* Link ke Register */}
        <p className="register-text">
          Belum punya akun?{" "}
          <Link to="/register" className="link-login">
            Daftar di sini
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
