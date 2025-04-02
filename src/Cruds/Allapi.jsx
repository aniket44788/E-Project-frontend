import { useEffect, useState } from "react";
import "./allapi.css";
import { Link, useNavigate , } from "react-router-dom";
import Search from "../Navbar/Search";

const Allapi = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({ message: "", data: [] });

  useEffect(() => {
    fetch(`${process.env.API}/getapi`)
      .then((res) => res.json())
      .then((data) => {
        console.log("API Response:", data);
        setState(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleBuyNow = (id) => {
    navigate(`/cart/${id}`); 
  };  

  const exchangeRate = 83;

  const formatPrice = (amount, currency) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(amount);
  };
  return (
    <>
      <nav>
        <Link to="/allapi">Store</Link>
        <Link to="cart/">Cart</Link>
        <Link to="/mail">Contact us</Link>
        <Link to="/">About us</Link>
      </nav>
      <Search/>
      <div className="main-container">

        {state.data.map((alldata) => {
          const { _id, title, price, description, category, file } = alldata;

          const priceInUSD = (price / exchangeRate).toFixed(2);

          return (
            <div key={_id}>
              <div className="card-wrapper">
                <div className="product-card">
                  <div className="image-box">
                    <img src={`/${file}`} alt={title} />
                  </div>
                  <div className="content-box">
                    <h2>
                      {formatPrice(price, "INR")} |{" "}
                      {formatPrice(priceInUSD, "USD")}
                    </h2>
                    <div className="item-category">
                      <h4 className="product-title">{title}</h4>
                    </div>
                    <div className="item-description">
                      <h6>{description}</h6>
                    </div>
                    <button className="buy-button" onClick={()=> handleBuyNow(_id)}>
                      <svg
                        viewBox="0 0 16 16"
                        className="bi bi-cart-check"
                        height="24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#fff"
                      >
                        <path d="M11.354 6.354a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"></path>
                        <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>
                      </svg>
                      <p className="button-text">Buy Now</p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Allapi;
