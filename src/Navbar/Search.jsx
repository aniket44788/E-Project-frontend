import React, { useState, useEffect } from "react";
import "./search.css"

function Search() {
  const [state, setState] = useState({ category: "" });
  const [allData, setAllData] = useState([]); // Stores all fetched data
  const [filteredData, setFilteredData] = useState([]); // Stores filtered data
  const [message, setMessage] = useState("");

  const handlesearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setState({ category: searchValue });

    // **Filter Data on Frontend (If API returns all products)**
    if (allData.length > 0) {
      const filtered = allData.filter((product) =>
        product.category.toLowerCase().includes(searchValue)
      );
      setFilteredData(filtered);
      setMessage(
        filtered.length > 0 ? "Data found successfully." : "No data found."
      );
    }
  };

  const submitData = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:4000/getapi/`, {
        method: "GET",
      });
      const result = await res.json();
      console.log("Fetched Data:", result);

      if (res.ok) {
        setAllData(result.data);
        setFilteredData(
          result.data.filter((product) =>
            product.category.toLowerCase().includes(state.category)
          )
        );
        setMessage(
          result.data.length > 0 ? "Data found successfully." : "No data found."
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
      {filteredData.length > 0 ? (
        filteredData.map((product) => {
          const { _id, title, category, description, price, file } = product;
          return (
            <div key={_id} className="aavi-card-wrapper">
              <div className="aavi-product-card">
                <div className="aavi-image-box">
                  <img src={`https://e-project-backend.onrender.com/${file}`} alt={title} />
                </div>
                <div className="aavi-content-box">
                  <h2>
                    {formatPrice(price, "INR")} |{" "}
                    {formatPrice(price * 0.012, "USD")}
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
        })
      ) : (
        <p>{message}</p>
      )}
      </div>
    </>
  );
}

export default Search;
