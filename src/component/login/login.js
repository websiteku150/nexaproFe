import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Api from "./api";
import "./login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import Swal from "sweetalert2";

const dummyData = [
  { username: "admin", password: "admin123", email: "admin123@gmail.com", role: "admin" },
  { username: "customer", password: "customer", email: "customer123@gmail.com", role: "customer" },
];

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const user = dummyData.find((f) => f.username === username && f.password === password);

    if (user) {
      Swal.fire({
        icon: "success",
        title: "Login Berhasil!",
        text: `Selamat datang ${user.username}!`,
        showConfirmButton: false,
        timer: 2000,
      }).then(() => {
        if (user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/customer");
        }
      });
    } else {
      setMessage("Login gagal, pastikan username & password benar ❌");
    }
  };

  return (
    <div className="container-register">
      <div className="register-box">
        <h1 className="logo">NEXAPRO</h1>
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
              type={showPassword ? "text" : "password"}
              placeholder="Kata Sandi"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
              style={{ cursor: "pointer", marginLeft: "8px", color: "#2563eb", fontSize: 20 }}
            >
              <i className={showPassword ? "bi bi-eye" : "bi bi-eye-slash"}></i>

            </span>
          </div>
          {/* Link Lupa Password */}
        </form>
          {/* Tombol Login */}
          <button type="submit" className="btn-register">
            Masuk
          </button>
          

        {/* Pesan Error */}
        {message && <div className="message-register">{message}</div>}
          <p className="forgot-password">
            <Link to="/changePassword">Lupa kata sandi?</Link>
          </p>

        {/* Link ke Register */}
        <p className="register-text">
          Belum punya akun? <Link to="/register">Daftar di sini</Link>
        </p>

      </div>
    </div>
  );
}

export default Login;
