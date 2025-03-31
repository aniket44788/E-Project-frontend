import React from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import "./navbar.css";
import Allapi from "../Cruds/Allapi";
import Register from "./Register";
import Login from "./Login";
import Mail from "./Mail";
import Cart from "./Cart";

function Navbar() {
  const location = useLocation();

  const hideNavbarOnRoutes = [
    "/allapi",
    "/dashboard",
    "/profile",
    "/mail",
    "/cart",
  ];

  return (
    <>
      {!hideNavbarOnRoutes.includes(location.pathname) && (
        <div className="main-div">
          <nav>
            <Link to="/register"> Sign up </Link>
            <Link to="/login">Login</Link>
          </nav>
        </div>
      )}
      <Routes>
        <Route path="/allapi" element={<Allapi />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mail" element={<Mail />} />
        <Route path="/cart/:id" element={<Cart />} />
      </Routes>
    </>
  );
}

export default Navbar;
