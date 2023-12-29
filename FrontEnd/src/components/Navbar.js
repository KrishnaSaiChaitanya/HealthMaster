import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const customerLogin = window.localStorage.getItem("customerId");

  return (
    <nav
      id="nav-main"
      className="navbar navbar-expand-lg p-1 navbar-light xs:p-0 bg-white mx-5 xs:mx-0 sticky-top"
    >
      <div className="container-fluid md:mx-5">
        <div className="d-flex ">
          <button
            className="navbar-toggler"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars"></i>
          </button>
          <a className="navbar-brand mt-2 mt-lg-0" href="/">
            <img
              src="logo.svg"
              // height="60"
              style={{ width: "300px" }}
              alt="MDB Logo"
              loading="lazy"
            />
          </a>
        </div>
        <div
          className="collapse navbar-collapse justify-content-center"
          id="navbarSupportedContent"
        >
          {/* <a className="navbar-brand mt-2 mt-lg-0" href="#">
            <img src="logo.svg" height="55" alt="MDB Logo" loading="lazy" />
          </a> */}
          <ul className="navbar-nav  mb-2 mb-lg-0 px-4 fw-bold">
            <li className="nav-item px-2">
              <a className="nav-link" href="./">
                Main Page
              </a>
            </li>
            <li className="dropdown nav-item px-2">
              <a className="nav-link" href="#">
                Health
                <svg
                  class="icon"
                  width="14"
                  height="16"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 320 512"
                >
                  <path d="M151.5 347.8L3.5 201c-4.7-4.7-4.7-12.3 0-17l19.8-19.8c4.7-4.7 12.3-4.7 17 0L160 282.7l119.7-118.5c4.7-4.7 12.3-4.7 17 0l19.8 19.8c4.7 4.7 4.7 12.3 0 17l-148 146.8c-4.7 4.7-12.3 4.7-17 0z" />
                </svg>
              </a>

              <ul class="dropdown-nav  text-left">
                <li className="nav-item">
                  <a className="nav-link text-center" href="/healthy-food">
                    Healthy food
                  </a>
                </li>
                <li className="nav-item ">
                  <a className="nav-link" href="/vegetable">
                    Vegetable
                  </a>
                </li>
                <li className="nav-item ">
                  <a className="nav-link" href="/fruits">
                    Fruits
                  </a>
                </li>
                <li className="nav-item ">
                  <a className="nav-link" href="/vegetarian">
                    Vegetarian
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item px-2">
              <a className="nav-link" href="/Features">
                Features
              </a>
            </li>
            <li className="nav-item px-2">
              <a className="nav-link" href="/">
                News
              </a>
            </li>
            <li className="nav-item px-2">
              <a className="nav-link" href="./">
                Service
              </a>
            </li>
            <li>
              <div class="container d-flex justify-content-center">
                <div class="input-group col-sm-4  input-group-lg">
                  <div class="input-group-prepend">
                    <span class="input-group-text google">
                      <img src="search.svg" />
                    </span>
                  </div>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Search"
                    style={{
                      borderTopRightRadius: "30px",
                      borderBottomRightRadius: "30px",
                      width: "120px",
                    }}
                  />
                </div>
              </div>
            </li>
          </ul>
        </div>
        {/* Drop Down Start */}
        {/* <div className="d-flex align-items-center">
          <div className="dropdown">
            <a
              className="dropdown-toggle d-flex align-items-center hidden-arrow"
              // href="#"
              id="navbarDropdownMenuAvatar"
              role="button"
              data-mdb-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src="user.svg"
                className="rounded-circle"
                height="35"
                alt="Black and White Portrait of a Man"
                loading="lazy"
              />
            </a>
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="navbarDropdownMenuAvatar"
            >
              <li>
                <a className="dropdown-item" href="#">
                  My profile
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Settings
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div> */}
        {/* Drop Down End */}
        <div>{customerLogin ? <DropdownBtn /> : <LoginBtn />}</div>
      </div>
    </nav>
  );
};

export default Navbar;

const DropdownBtn = () => {
  const navigate = useNavigate();
  const Logout = () => {
    window.localStorage.removeItem("Tokken");
    window.localStorage.removeItem("customerId");
    window.location.reload();
    navigate("/");
  };
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        <img
          src="user.svg"
          className="rounded-circle"
          height="35"
          alt="Black and White Portrait of a Man"
          loading="lazy"
        />{" "}
        Profile
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Settings</Dropdown.Item>
        <Dropdown.Item href="/AddtoCart">Cart Items</Dropdown.Item>
        <Dropdown.Item onClick={() => Logout()}>Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

const LoginBtn = () => {
  const navigate = useNavigate();
  console.log("hi");
  const GoToLogin = () => {
    navigate("/Login");
  };
  return (
    <div>
      <button
        className="fs-5 p-1"
        style={{ backgroundColor: "#8DD566" }}
        onClick={GoToLogin}
      >
        Login/Signup{" "}
      </button>
    </div>
  );
};
