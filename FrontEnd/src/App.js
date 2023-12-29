//import logo from "./logo.svg";
import React from "react";
import "./App.css";
import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
//import * as mdb from "mdb-ui-kit"; // lib
//import { Input } from "mdb-ui-kit"; // module
import ProductSection from "./components/ProductSection";
import "bootstrap/dist/css/bootstrap.min.css";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Admin from "./components/Admin";
import AddtoCart from "./components/AddtoCart";
import VegetarianSection from "./components/VegetarianSection";
import FruitsSection from "./components/FruitsSection";
import VegetableSection from "./components/VegetableSection";
import HealthyFoodSection from "./components/HealthyFoodSection";

function App() {
  const login = window.localStorage.getItem("Tokken");
  return (
    <div className="App">
      {/* <Navbar /> */}
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/Login" element={<Login />}></Route>
          <Route
            exact
            path="/healthy-food"
            element={<HealthyFoodSection />}
          ></Route>
          <Route exact path="/vegetable" element={<VegetableSection />}></Route>
          <Route exact path="/fruits" element={<FruitsSection />}></Route>
          <Route
            exact
            path="/vegetarian"
            element={<VegetarianSection />}
          ></Route>
          <Route exact path="/products" element={<ProductSection />}></Route>
          <Route exact path="/addtocart" element={<AddtoCart />}></Route>
          <Route exact path="/signup" element={<Signup />}></Route>
          <Route exact path="/admin" element={<Admin />}></Route>
        </Routes>
      </Router>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
