  import React, { useState, useEffect } from "react";
  import { useNavigate } from "react-router-dom";
  import "slick-carousel/slick/slick.css";
  import "slick-carousel/slick/slick-theme.css";
  import "../streaming/streaming.css";
  import Navbar from "../navbar/navbar";
  import axios from "axios";
  import { Link } from "react-router-dom";
  import { useParams } from "react-router-dom";

  function AccountSoftwareEditing() {
    const {id} = useParams();
    const [search, setSearch] = useState("");
    const [data, setData] = useState([]);
    const [product, setProduct] = useState()
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [cartCount, setCartCount] =  useState(0);
    const [quantity,setQuantity] = useState(1);

    useEffect(() => {
      axios
        .get(`https://f3bd28eb96d4.ngrok-free.app/api/Account/product/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "ngrok-skip-browser-warning": "true",
          },
        })
        .then((res) => {
          console.log("Respons akun:", res.data);
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

        // axios.get(`https://4a3c718fc610.ngrok-free.app/api/Product/${id}`, {
        //     headers:{
        //         Authorization: `Bearer ${localStorage.getItem("token")}`,
        //         "ngrok-skip-browser-warning": "true"
        //     },
        // }).then((res) => {
        //     setProduct(res.data);
        // }).catch((err)=> {
        //     console.log("Gagal mengambil product:", err)
        // })
    }, [id]);

    // UNTUK GET JUMLAH YG ADA DI KERANJNG
    useEffect(()=> {
      axios.get ("https://f3bd28eb96d4.ngrok-free.app/api/Order/my-cart", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          "ngrok-skip-browser-warning": "true",
        }
      }).then((res) => {
        if (res.data && Array.isArray(res.data.items)){
          const total = res.data.items.reduce((acc, item) => acc + item.quantity, 0);
          setCartCount(total)
        }else {
          setCartCount(0)
        }
      })
      .catch((err) => console.error("Gagal ambil cart:", err));
    }, [])

    // BUAT TAMBAH CART NYA 
    const handleAddToCart = async(accountId) => {
      try{ await axios.post("https://f3bd28eb96d4.ngrok-free.app/api/Order/add-to-cart", {
        items : [
          {
            accountId : accountId,
            quantity : quantity,
          }
        ]
      }, {
        headers: {
          Authorization : `Bearer ${localStorage.getItem('token')}`,
          "ngrok-skip-browser-warning" : "True",
        },
      }
      );
      setCartCount( cartCount + 1);
      alert('Product berhasil ditambahkan ke keranjang')
    }catch(err){
      console.error("Gagal menambahkan ke keranjang:", err.response?.data || err.message);
      alert('Gagal menambahkan ke keranjang');
    }
  };


    // Filtering produk sesuai search input
    const filterData = data.filter((f) =>
      f.specification.toLowerCase().includes(search.toLowerCase())
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

    // BUAT HANDLE POP UP
    const handleOpenPopup = (item) => {
      setSelectedItem(item);
      setQuantity(1);
      setShowPopup(true);
    };

    const handleClosePopup = () => {
      setShowPopup(false);
      setSelectedItem(null);
    };

    const handleBuyNow = (accountId) =>{
      navigate(`/chekout?accountId=${accountId}&quantity=${quantity}`);
    }

    return (
      <>
        <Navbar />
            <div className="full-streaming">
        <div className="body-container">
          <div className="container-streaming">
            <div className="container-icon-keranjang">
              <p className="icon-keranjang">
                <i
                  className="bi bi-cart"
                  style={{ marginRight: 10, fontSize: "bold" }}
                ></i>
                {cartCount}
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
                  <div key={item.id}
                  onClick={() =>handleOpenPopup(item)}
                  style={{cursor: 'pointer'}}
                  className="container-account"
                  >
                    <img src={item.thumbnail} alt="thumbnail" />
                    <h3 style={{fontSize: 22, fontWeight: 'bold', textAlign: 'left'}}>{item.specification}</h3>
                    <p style={{fontWeight: 'bold', color: '#D5583C', textAlign: 'left'}}>Rp{item.price}</p>
                    <p style={{textAlign: 'right'}}>Stok: <span style={{color: '#D5583C', fontWeight: 'bold'}}>{item.count}</span></p>
                    <div>
                      <p className="jenis-streaming"
                      onClick={()=> handleAddToCart(item.id)}

                      >Tambah keranjang</p>
                      <Link>
                      <p className="jenis-streaming">Beli Sekarang</p>
                      </Link>
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
        {showPopup && selectedItem && (
          <div onClick={handleClosePopup} className="popup-overlay">
            <div onClick={(e)=> e.stopPropagation()} className="popup-content">
              <div>
              <img src={selectedItem.thumbnail} alt={selectedItem.specification}/>
              </div>
              <div>
              <h2>{selectedItem.specification}</h2>
              <hr/>
              <p>Deskripsi</p>
              <p>Stok :<span>{selectedItem.count}</span></p>
              <p>Harga :<span>{selectedItem.price}</span></p>
              <div>
                <p onClick={()=> setQuantity((prev)=> Math.max(prev - 1, 1))} style={{cursor: 'pointer'}}>-</p>
                <span>{quantity}</span>
                <p onClick={()=> setQuantity((prev) => prev +1 )} style={{cursor: 'pointer'}}>+</p>
              </div>
              <div>
                <button onClick={()=>handleAddToCart(selectedItem.id)}>Tambah Keranjang</button>
                <button onClick={()=>handleBuyNow(selectedItem.id)}>Beli Sekarang</button>
                <button onClick={handleClosePopup}>Tutup</button>
              </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  export default AccountSoftwareEditing;