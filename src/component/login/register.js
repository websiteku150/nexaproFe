import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./register.css";
import logo from "../img/logo.png";
import axios from "axios";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    let newErrors = {};

    // Validasi Username
    if (!username || username.length < 3) {
      newErrors.username = "Username minimal 3 karakter!";
    }

    // Validasi Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      newErrors.email = "Email tidak boleh kosong!";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Format email tidak valid!";
    }

    // Validasi Password
    if (!password) {
      newErrors.password = "Password tidak boleh kosong!";
    } else if (password.length < 6) {
      newErrors.password = "Kata sandi minimal 6 karakter!";
    }

    // Validasi Konfirmasi Password
    if (!confirm) {
      newErrors.confirm = "Konfirmasi password tidak boleh kosong!";
    } else if (password !== confirm) {
      newErrors.confirm = "Konfirmasi tidak sama dengan password!";
    }

    // Jika ada error, tampilkan
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const res = await axios.post(
        "https://600647d31151.ngrok-free.app/api/Auth/register",
        {
          username,
          email,
          password,
          role: "Customer",
        }
      );
      Swal.fire({
        icon: "success",
        title: "Registrasi Berhasil!",
        text: "Akun kamu sudah dibuat. Selamat datang!",
        showConfirmButton: false,
        timer: 2000,
      }).then(() => {
        navigate("/login");
      });
    } catch(err) {
      Swal.fire({
        icon: "error",
        title: "Registrasi Gagal!",
        text: "Terjadi Kesalahan saat Registrasi. silahkan coba lagi",
        showConfirmButton: 'Oke',
      }).then(() => {
        navigate("/register");
      });
    }
  }

  return (
    <div className="container-register">
      <div className="register-box" data-aos="flip-left">
        <div className="logo">
          <img src={logo} alt="logo" style={{ height: 110, marginBottom: 0 }} />
        </div>
        <p className="tagline-register">Buat Akun Baru</p>

        <form onSubmit={handleRegister}>
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
              style={{
                borderColor: errors.username ? "red" : "",
              }}
            />
          </div>
          {errors.username && (
            <small style={{ color: "red" }}>{errors.username}</small>
          )}

          {/* Email */}
          <div className="mb-3 input-group">
            <span className="input-group-email-register">
              <i className="bi bi-envelope" style={{ color: "#1e40af" }}></i>
            </span>
            <input
              className="form-control-register"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                borderColor: errors.email ? "red" : "",
              }}
            />
          </div>
          {errors.email && (
            <small style={{ color: "red" }}>{errors.email}</small>
          )}

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
              style={{
                borderColor: errors.password ? "red" : "",
              }}
            />
          </div>
          {errors.password && (
            <small style={{ color: "red" }}>{errors.password}</small>
          )}

          {/* Confirm Password */}
          <div className="mb-3 input-group password-group">
            <span className="input-group-confirm-register">
              <i className="bi bi-shield-lock" style={{ color: "#1e40af" }}></i>
            </span>
            <input
              className="form-control-register"
              type="password"
              placeholder="Konfirmasi Kata Sandi"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              style={{
                borderColor: errors.confirm ? "red" : "",
              }}
            />
          </div>
          {errors.confirm && (
            <small style={{ color: "red" }}>{errors.confirm}</small>
          )}

          {/* Tombol */}
          <button type="submit" className="btn-register">
            Buat Akun
          </button>
        </form>

        <p style={{ marginTop: 10 }}>
          Sudah punya akun?{" "}
          <Link to="/login" className="link-register">
            Masuk
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
