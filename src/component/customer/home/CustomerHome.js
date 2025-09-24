import React from "react";
import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./CustomerHome.css";
import Navbar from "../navbar/navbar";
import AOS from "aos";
import "aos/dist/aos.css";

function CustomerHome() {
  useEffect(() => {
      AOS.init({ duration: 1000 });
    }, []);
  return (
  <>
  <Navbar/>
    <div className="landing-page-home">
      <div className="hero-section-home">
        <div className="content-home">
          <h1 className="main-heading-home" data-aos="fade-up">
            Selamat datang di <span className="highlight">NEXAPRO</span>
          </h1>
          <h2 className="sub-heading-home" data-aos="fade-up">
            Tempat Beli Akun Streaming & Software Editing Murah, Aman, Langsung
            Pakai
          </h2>
          <p className="description-home" data-aos="fade-up">
            Dapatkan Akun Premium Streaming seperti Netflix, Spotify, Bstation
            dan Software Editing seperti Capcut, Adobe, Canva tanpa ribet.
            Pilih, bayar, langsung dapat Akun Premiumnya
          </p>
          <button className="cta-button-home" data-aos="flip-up">
            Beli Akun Sekarang
            <i
              className="bi bi-cart2"
              style={{ fontWeight: "bold", fontSize: 20 }}
            ></i>
          </button>
        </div>
        <div className="container-card-home" >
          <div className="card-home" data-aos="flip-right">
            <h1 className="icon-promo-home">
              <i className="bi bi-shield-check"></i>
            </h1>
            <h3 className="nama-promo-home">Bonus Garansi</h3>
            <p className="isi-promo-home">Garansi akun 1minggu sampai1 bulan. Respon Cepat 1-5 Menit</p>
          </div>
          <div className="card-home" data-aos="flip-right">
            <h1 className="icon-promo-home">
              <i className="bi bi-lightning"></i>
            </h1>
            <h3 className="nama-promo-home">Pengiriman Cepat</h3>
            <p className="isi-promo-home">Akun akan dikirim 1-5 menit setelah pembayaran selesai.</p>
          </div>
          <div className="card-home" data-aos="flip-right">
            <h1 className="icon-promo-home">
              <i className="bi bi-tags"></i>
            </h1>
            <h3 className="nama-promo-home">Harga Terjangkau</h3>
            <p className="isi-promo-home">PaketHarian/Mingguan/
              Bulanan,Pilih sesuai kebutuhan</p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default CustomerHome;
