import React, { useEffect, useState } from "react";
import "./cart.css";
import { useParams } from "react-router-dom";

function Cart() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const userEmail = "pardhiman832@gmail.com"; // Replace with dynamic user email

  useEffect(() => {
    fetch(`${procces.env.API}/getapi/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched Product:", data);
        setProduct(data);
      })
      .catch((err) => console.log("Error fetching product:", err));
  }, [id]);

  const handleBuyNow = async () => {
    if (!product) {
      alert("Product not loaded yet!");
      return;
    }

    if (!selectedColor) {
      alert("Please select a color!");
      return;
    }

    try {
      const response = await fetch(`${procces.env.API}/buy`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: product.title,
          productId: product.id,
          price: product.price,
          description: product.description,
          email: userEmail,
          color: selectedColor,
          quantity: quantity,
        }),
      });

      const result = await response.json();
      console.log("Server Response:", result);

      alert(result.message);
    } catch (error) {
      console.log("Error processing order:", error);
      alert("Failed to process order.");
    }
  };

  if (!product) return <h2>Loading product details...</h2>;

  return (
    <div className="div-box">
      <h2 className="this-is-title">{product.title}</h2>
      <img src={`${procces.env.API}/${product.file}`} alt={product.title} width="300px" />
      <p className="this-is-price-text"> {product.price} INR</p>
      <p className="this-is-description">{product.description}</p>
      
      <label>Select Color: </label>
      <select value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)}>
        <option value="">--Select--</option>
        <option value="Red">Red</option>
        <option value="Blue">Blue</option>
        <option value="Green">Green</option>
        <option value="Black">Black</option>
      </select>
      <br />
      
      <label>Quantity: </label>
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
        min="1"
      />
      <br />

      <button className="button" onClick={handleBuyNow}> Buy Now </button>
    </div>
  );
}

export default Cart;
