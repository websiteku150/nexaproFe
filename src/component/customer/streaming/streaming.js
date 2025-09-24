import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import AOS from "aos";
// import "aos/dist/aos.css";

function Streaming() {
  const [search, setSearch] = useState("");
  const dummy = [
    {
      id: 1,
      nama: "Netflix",
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
  return (
    <div>
      <h1>Streaming</h1>
      <p></p>
      <input
        type="text"
        placeholder="Cari berdasarkan nama aplikasi..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div>
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
