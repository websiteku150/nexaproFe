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
import logo from '../img/logo.png'

const dummyData = [
  { username: "admin", password: "admin123", email: "admin123@gmail.com", role: "admin" },
  { username: "customer", password: "customer", email: "customer123@gmail.com", role: "customer" },
];

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Validasi input kosong
    if (!username.trim() || !password.trim()) {
      setMessage("Username dan Password tidak boleh kosong");
      return;
    }

    const user = dummyData.find((f) => f.username === username && f.password === password);

    if (user) {
      setMessage("");
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
          navigate("/customerHome");
        }
      });
    } else {
      // Hanya mengganti setMessage(...) menjadi SweetAlert seperti yang diminta
      Swal.fire({
        icon: "error",
        title: "Login Gagal",
        text: "Pastikan Username dan Password benar",
        showConfirmButton: true,
      });
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
              className={`form-control-register ${!username && message ? "error-input" : ""}`}
              type="text"
              placeholder="Nama Pengguna"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                borderColor: message === "Username dan Password tidak boleh kosong" && !username ? "red" : ""
              }}
            />
          </div>

          {/* Password */}
          <div className="mb-3 input-group password-group">
            <span className="input-group-password-register">
              <i className="bi bi-lock" style={{ color: "#1e40af" }}></i>
            </span>
            <input
              className={`form-control-register ${!password && message ? "error-input" : ""}`}
              type="password"
              placeholder="Kata Sandi"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                borderColor: message === "Username dan Password tidak boleh kosong" && !password ? "red" : ""
              }}
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
              style={{ cursor: "pointer", marginLeft: "8px", color: "#2563eb", fontSize: 20 }}
            >
              {/* Jika mau menampilkan icon toggle, bisa isi <i> di sini. Saya tidak merubah logika lain. */}
            </span>
          </div>
          {/* Tombol Login */}
          <button type="submit" className="btn-register">
            Masuk
          </button>
        </form>

        {/* Pesan Error (masih tampil untuk validasi kosong seperti sebelumnya) */}
        {message && <div className="message-register">{message}</div>}
        {/* Link Lupa Password */}
        <p className="forgot-password">
          <Link to="/changePassword" className="link-login">Lupa kata sandi?</Link>
        </p>

        {/* Link ke Register */}
        <p className="register-text">
          Belum punya akun? <Link to="/register" className="link-login">Daftar di sini</Link>
        </p>

      </div>
    </div>
  );
}

export default Login;
