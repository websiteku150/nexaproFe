import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate, Link } from "react-router-dom";
import "./register.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import AOS from "aos";
import "aos/dist/aos.css";
import logo from "../img/logo.png";

function ChangePassword() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleReset = async (e) => {
    e.preventDefault();

    // Validasi manual
    if (!email || !password || !confirm) {
      Swal.fire({
        icon: "error",
        title: "Data Tidak Lengkap",
        text: "Semua kolom harus diisi",
        timer: 2000,
        showConfirmButton: false,
      });
      return;
    }

    if (password.length < 6) {
      Swal.fire({
        icon: "error",
        title: "Kata Sandi Terlalu Pendek",
        text: "Minimal 6 karakter",
        timer: 2000,
        showConfirmButton: false,
      });
      return;
    }

    if (password !== confirm) {
      Swal.fire({
        icon: "error",
        title: "Konfirmasi Salah",
        text: "Kata sandi tidak sama",
        timer: 2000,
        showConfirmButton: false,
      });
      return;
    }

    try {
      await axios.put("", {
        username,
        email,
        password,
        role: "customer",
      });
      Swal.fire({
        icon: "success",
        title: "Sukses",
        text: "Kata sandi berhasil diubah",
        timer: 1500,
        showConfirmButton: false,
      });
      navigate("/login");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Terjadi Kesalahan",
        text: "Kata sandi gagal diubah",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  return (
    <div className="container-register">
      <div className="register-box" data-aos="flip-right">
        <div className="logo">
          <img src={logo} alt="logo" style={{ height: 110, marginBottom: 0 }} />
        </div>
        <p className="tagline-register">Ganti Kata Sandi Baru</p>

        <form onSubmit={handleReset}>
          {/* Username hidden */}
          <div className="mb-3 input-group" style={{ display: "none" }}>
            <span className="input-group-username-register">
              <i className="bi bi-person" style={{ color: "#1e40af" }}></i>
            </span>
            <input
              className="form-control-register"
              type="text"
              placeholder="Nama Pengguna"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              readOnly
            />
          </div>

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
            />
          </div>

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
            />
          </div>

          <button type="submit" className="btn-register">
            Ganti Kata Sandi
          </button>
        </form>

        <p style={{ marginTop: 10 }}>
          <Link to="/login" className="link-register">
            Kembali ke Halaman Masuk
          </Link>
        </p>
      </div>
    </div>
  );
}

export default ChangePassword;
