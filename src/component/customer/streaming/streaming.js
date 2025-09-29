  import React, { useState, useEffect } from "react";
  import { useNavigate } from "react-router-dom";
  import "slick-carousel/slick/slick.css";
  import "slick-carousel/slick/slick-theme.css";
  import Slider from "react-slick";
  import banner1 from "./img/banner-streaming1.png";
  import banner2 from "./img/banner-streaming2.png";
  import banner3 from "./img/banner-streaming3.png";
  import "./streaming.css";
  import Navbar from "../navbar/navbar";
  import axios from "axios";

  function Streaming() {
    const [search, setSearch] = useState("");
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    // Fetch product dari backend sekali saja
    useEffect(() => {
      axios
        .get("https://600647d31151.ngrok-free.app/api/Product", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "ngrok-skip-browser-warning": "true",
          },
        })
        .then((res) => {
          console.log("Respons backend:", res.data);
          if (Array.isArray(res.data)) {
            setData(res.data);
          } else {
            console.error("Respons bukan array:", res.data);
            setData([]);
          }
        })
        .catch((err) => {
          console.error("Gagal mengambil data:", err);
        });
    }, []);

     const streamingData = data.filter(
    (f) => f.category?.toLowerCase().includes("streaming")
  );

    // Filtering produk sesuai search input
    const filterData = streamingData.filter((f) =>
      f.name.toLowerCase().includes(search.toLowerCase())
    );

    // Konfigurasi carousel
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
        <Navbar />
            {/* Carousel */}
            <div className="full-streaming">
            <div
              style={{ marginTop: '100px', margin: "auto", borderRadius: "10px" }}
              className="carousel-streaming"
            >
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

            {/* Input pencarian */}
            <input
              type="text"
              placeholder="Cari berdasarkan nama aplikasi..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-streaming-customer"
            />


            {/* List produk */}
            <div className="card-streaming-customer">
              {filterData.length > 0 ? (
                filterData.map((item) => (
                  <div key={item.id}>
                    <img src={item.logo} alt={item.name} />
                    <h3>{item.name}</h3>
                    <p>{item.category}</p>
                    <div>
                      <a href="#" target="_blank" rel="noreferrer">
                        Lihat Jenis Akun
                      </a>
                    </div>
                  </div>
                ))
              ) : (
                <p>Produk tidak ditemukan</p>
              )}
            </div>
          </div>
        </div>
        </div>
      </>
    );
  }

  export default Streaming;