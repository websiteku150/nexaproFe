import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
// import AOS from "aos";
// import "aos/dist/aos.css";
import banner1 from '../software_editing/img/banner-editing1.png'
import banner2 from '../software_editing/img/banner-editing2.png'
import banner3 from '../software_editing/img/banner-editing3.png'
import './streaming.css'

function Streaming() {
  const [search, setSearch] = useState("");
  const dummy = [
    {
      id: 1,
      nama: "Capcut",
      logo: "https://s.yimg.com/fz/api/res/1.2/XYLv14Ua5rt2RM6s39IHow--~C/YXBwaWQ9c3JjaGRkO2ZpPWZpdDtoPTI0MDtxPTgwO3c9MjQw/https://s.yimg.com/zb/imgv1/b696b8bc-fcfd-3123-83cf-5dfa4c0a3bee/t_500x300",
      kategori: "Streaming",
      link: "/",
    },
    {
      id: 2,
      nama: "Netflix",
      logo: "https://s.yimg.com/fz/api/res/1.2/XYLv14Ua5rt2RM6s39IHow--~C/YXBwaWQ9c3JjaGRkO2ZpPWZpdDtoPTI0MDtxPTgwO3c9MjQw/https://s.yimg.com/zb/imgv1/b696b8bc-fcfd-3123-83cf-5dfa4c0a3bee/t_500x300",
      kategori: "Streaming",
      link: "/",
    },
  ];
  const filterData = dummy.filter((f) =>
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
    <div>
      <div className="container-icon-keranjang">
      <p className="icon-keranjang"><i className="bi bi-cart" style={{marginRight: 10, fontSize: 'bold'}}></i>{}1</p>
      </div>
      <div className="title-streaming-customer">
      <h1 className="judul-streaming-customer">Streaming</h1>
      <h3 className="subtitle-streaming-customer">Temukan Streaming Favorit mu, dan dapatkan Akun Premiumnya</h3>
      </div>
      <input
        type="text"
        placeholder="Cari berdasarkan nama aplikasi..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-streaming-customer"
      />
      <div style={{width: '80%', margin: 'auto', borderRadius: '10px'}}>
      <Slider {...settings}>
      <div>
        <img src={banner1} alt="1" style={{width: '100%', height: 'auto', borderRadius: '10px'}} />
      </div>
      <div>
        <img src={banner2} alt="2" style={{width: '100%', height: 'auto', borderRadius: '10px'}}/>
      </div>
      <div>
        <img src={banner3} alt="3" style={{width: '100%', height: 'auto', borderRadius: '10px'}}/>
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
  );
}
export default Streaming;
