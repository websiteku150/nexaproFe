import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
// import AOS from "aos";
// import "aos/dist/aos.css";
import banner1 from "../software_editing/img/banner-editing1.png";
import banner2 from "../software_editing/img/banner-editing2.png";
import banner3 from "../software_editing/img/banner-editing3.png";
import "./streaming.css";
import Navbar from "../navbar/navbar";
import axios from "axios";

function Streaming() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);

useEffect(()=>{
  axios.get('https://db635882499b.ngrok-free.app/').then((res)=>{
    setData(res.data);
  }).catch ((err)=> {
    console.log('Gagal mengambil data:', err)
  })
})

  const filterData = data.filter((f) =>
    f.nama.toLowerCase().includes(search.toLowerCase())
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <>
    <Navbar/>
      <div className="body-container">
        <div className="container-streaming">
        <div className="container-icon-keranjang">
          <p className="icon-keranjang">
            <i
              className="bi bi-cart"
              style={{ marginRight: 10, fontSize: "bold" }}
            ></i>
            {}1
          </p>
        </div>
        <div className="title-streaming-customer">
          <h1 className="judul-streaming-customer">Streaming</h1>
          <h3 className="subtitle-streaming-customer">
            Temukan Streaming Favorit mu, dan dapatkan Akun Premiumnya
          </h3>
        </div>
        <input
          type="text"
          placeholder="Cari berdasarkan nama aplikasi..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-streaming-customer"
        />
        <div style={{margin: "auto", borderRadius: "10px" }} className="carousel-streaming">
          <Slider {...settings}>
            <div>
              <img
                src={banner1}
                alt="1"
                style={{ width: "100%", height: "auto", borderRadius: "10px" }}
              />
            </div>
            <div>
              <img
                src={banner2}
                alt="2"
                style={{ width: "100%", height: "auto", borderRadius: "10px" }}
              />
            </div>
            <div>
              <img
                src={banner3}
                alt="3"
                style={{ width: "100%", height: "auto", borderRadius: "10px" }}
              />
            </div>
          </Slider>
        </div>

        <div className="card-streaming-customer">
          {filterData.length > 0 ? (
            filterData.map((item) => (
              <div key={item.id}>
                <img src={item.logo} />
                <h3>{item.nama}</h3>
                <div>
                  <a href={item.link} target="_blank" rel="noreferrer">
                    Lihat Jenis Akun
                  </a>
                </div>
              </div>
            ))
          ) : (
            <p></p>
          )}
        </div>
        </div>
      </div>
    </>
  );
}
export default Streaming;
