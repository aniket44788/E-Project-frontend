import React, { useState, useEffect } from "react";
import "./search.css";

function Search() {
  const [state, setState] = useState({ category: "" });
  const [allData, setAllData] = useState([]); // Stores all fetched data
  const [filteredData, setFilteredData] = useState([]); // Stores filtered data
  const [message, setMessage] = useState("");
  const [isFiltered, setIsFiltered] = useState(false); // Track filtering status

  const handlesearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setState({ category: searchValue });

    if (allData.length > 0) {
      const filtered = allData.filter((product) =>
        product.category.toLowerCase().includes(searchValue)
      );
      setFilteredData(filtered);
      setIsFiltered(true); // Toggle to filtered data
      setMessage(
        filtered.length > 0 ? "Data found successfully." : "No data found."
      );
    } else {
      setIsFiltered(false); // If no data, revert to default state
    }
  };

  const submitData = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_API}/getapi/`, {
        method: "GET",
      });
      const result = await res.json();
      console.log("Fetched Data:", result);

      if (res.ok) {
        setAllData(result.data);
        setFilteredData([]); // Reset filtered data on new fetch
        setIsFiltered(false); // Show fetched data instead
        setMessage(
          result.data.length > 0 ? "Data fetched successfully." : "No data found."
        );
      } else {
        setAllData([]);
        setFilteredData([]);
        setMessage("Data not found");
      }
    } catch (error) {
      console.log(error);
      setAllData([]);
      setFilteredData([]);
      setMessage("Error fetching Data.");
    }
  };

  useEffect(() => {
    console.log("Filtered Data:", filteredData);
  }, [filteredData]);

  const formatPrice = (price, currency) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(price);
  };

  return (
    <>
      <form onSubmit={submitData}>
        <input
          type="search"
          name="category"
          placeholder="Search by category"
          onChange={handlesearch}
          value={state.category}
        />
        <button type="submit">Search</button>
      </form>

      <div className="main-container">
        {isFiltered
          ? filteredData.length > 0
            ? filteredData.map((product) => (
                <ProductCard key={product._id} product={product} formatPrice={formatPrice} />
              ))
            : <p>{message}</p>
          : allData.length > 0
            ? allData.map((product) => (
                <ProductCard key={product._id} product={product} formatPrice={formatPrice} />
              ))
            : <p>{message}</p>}
      </div>
    </>
  );
}

function ProductCard({ product, formatPrice }) {
  const { _id, title, category, description, price, file } = product;

  return (
    <div key={_id} className="aavi-card-wrapper">
      <div className="aavi-product-card">
        <div className="aavi-image-box">
          <img src={`${import.meta.env.VITE_API}/${file}`} alt={title} />
        </div>
        <div className="aavi-content-box">
          <h2>
            {formatPrice(price, "INR")} | {formatPrice(price * 0.012, "USD")}
          </h2>
          <div className="aavi-item-category">
            <h4 className="aavi-product-title">
              {title} ({category})
            </h4>
          </div>
          <div className="aavi-item-description">
            <h6>{description}</h6>
          </div>
          <button className="aavi-buy-button">
            <p className="aavi-button-text">Buy Now</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Search;
