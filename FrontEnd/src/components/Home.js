import React from "react";
import Navbar from "./Navbar";
import ProductSection from "./ProductSection";
import Footer from "./Footer";
import Dropdown from 'react-bootstrap/Dropdown';
import { Link, useNavigate } from 'react-router-dom';



function Home() {


  return (
    <div>
      <Navbar />
      <HomeSection />
      <Footer />
    </div>
  );
}

export default Home;

const HomeSection = () => {
  return (
    <div>
      <img
        src="background.svg"
        style={{
          position: "absolute",
          right: "3%",
          top: "5%",
          height: "80%",
        }}
      />
      <img
        src="background.svg"
        id="background-image"
        style={{
          position: "absolute",
          left: "10%",
          top: "58%",
          height: "80%",
        }}
      />
      <section style={{ marginTop: "8%" }}>
        <h3 className="mx-5" style={{ textAlign: "left" }}>
          Featured news
        </h3>
        <hr
          class="hr hr-blurry mv-3- bg-[#038F19]"
          style={{ color: "#038F19" }}
        />
        <div class="container mb-4">
          <div class="row">
            <div class="col-sm">
              <img id="hero-image" src="hero-1.svg" />
            </div>
            <div class="col-sm row" id="hero-side-div">
              <div className="col-md-12 row my-2 ">
                <div className="col-md-3 col-12">
                  <img id="hero-side-image" src="hero-2.svg" />
                </div>
                <div
                  className="col-md-9 col-12 my-3"
                  style={{ textAlign: "left", paddingLeft: "2rem" }}
                >
                  <h4>Healthy Eating Refresh:</h4>
                  <p style={{ fontSize: "14px" }}>
                    Letter from the Editor At Healthline Nutrition, we want to
                    help you eat food that makes you feel good…
                  </p>
                </div>
              </div>

              <div className="col-12 my-2 row">
                <div className="col-md-3 col-12">
                  <img id="hero-side-image" src="hero-3.svg" />
                </div>
                <div
                  className="col-md-9 col-12 my-3 "
                  style={{ textAlign: "left", paddingLeft: "2rem" }}
                >
                  <h4 style={{ fontWeight: "700" }}>Healthy Eating Refresh:</h4>
                  <p style={{ fontSize: "14px" }}>
                    Letter from the Editor At Healthline Nutrition, we want to
                    help you eat food that makes you feel good…
                  </p>
                </div>
              </div>
              <div className="col-12 row">
                <div className="col-md-3 col-12">
                  <img id="hero-side-image" src="hero-4.svg" />
                </div>
                <div
                  className="col-md-9 col-12 my-3 "
                  style={{ textAlign: "left", paddingLeft: "2rem" }}
                >
                  <h4>Healthy Eating Refresh:</h4>
                  <p style={{ fontSize: "14px" }}>
                    Letter from the Editor At Healthline Nutrition, we want to
                    help you eat food that makes you feel good…
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="d-flex justify-content-left">
          <p id="hero-content">
            Eat It or Leave It? A Comprehensive Ingredient Dictionary to
            Simplify Your Shopping Trip
          </p>
        </div>
      </section>
      <section>
        <div class="container py-5">
          <h3 className="px-4" style={{ textAlign: "left" }}>
            Training
          </h3>
          <hr
            class="hr hr-blurry mv-3- bg-[#038F19]"
            style={{ color: "#038F19" }}
          />
          <div class="row justify-content-center">
            <div class="col-md-8 col-lg-6 col-xl-4 p-4">
              <div
                class="card text-black"
                style={{ backgroundColor: "#d7f3d8" }}
              >
                <div class="card-body">
                  <div class="text-center">
                    <h5 class="card-title">Early years nutrition matters</h5>
                    <p class="text-muted mb-4" style={{ fontSize: "0.8rem" }}>
                      This course will provide you with the basic nutrition
                      knowledge and practical tools needed to sup...
                    </p>
                  </div>
                  <div>
                    <div class="d-flex justify-content-between">
                      <span>Cost</span>
                      <span>£ 30</span>
                    </div>
                    <div class="d-flex justify-content-between">
                      <span>When</span>
                      <span>Your Choice</span>
                    </div>
                    <div class="d-flex justify-content-between">
                      <span>Time</span>
                      <span>your Choice</span>
                    </div>
                  </div>
                  <div class="d-flex justify-content-between total font-weight-bold mt-4">
                    <span>Venue</span>
                    <span
                      className="px-4"
                      style={{
                        backgroundColor: "#08F820",
                        borderRadius: "30px",
                      }}
                    >
                      Online
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-8 col-lg-6 col-xl-4 p-4">
              <div class="card text-black">
                <div class="card-body">
                  <div class="text-center">
                    <h5 class="card-title">Early years nutrition matters</h5>
                    <p class="text-muted mb-4" style={{ fontSize: "0.8rem" }}>
                      This course will provide you with the basic nutrition
                      knowledge and practical tools needed to sup...
                    </p>
                  </div>
                  <div>
                    <div class="d-flex justify-content-between">
                      <span>Cost</span>
                      <span>£ 30</span>
                    </div>
                    <div class="d-flex justify-content-between">
                      <span>When</span>
                      <span>Your Choice</span>
                    </div>
                    <div class="d-flex justify-content-between">
                      <span>Time</span>
                      <span>your Choice</span>
                    </div>
                  </div>
                  <div class="d-flex justify-content-between total font-weight-bold mt-4">
                    <span>Venue</span>
                    <span
                      className="px-4"
                      style={{
                        backgroundColor: "#08F820",
                        borderRadius: "30px",
                      }}
                    >
                      Online
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-8 col-lg-6 col-xl-4 p-4">
              <div class="card text-black">
                <div class="card-body">
                  <div class="text-center">
                    <h5 class="card-title">Early years nutrition matters</h5>
                    <p class="text-muted mb-4" style={{ fontSize: "0.8rem" }}>
                      This course will provide you with the basic nutrition
                      knowledge and practical tools needed to sup...
                    </p>
                  </div>
                  <div>
                    <div class="d-flex justify-content-between">
                      <span>Cost</span>
                      <span>£ 30</span>
                    </div>
                    <div class="d-flex justify-content-between">
                      <span>When</span>
                      <span>Your Choice</span>
                    </div>
                    <div class="d-flex justify-content-between">
                      <span>Time</span>
                      <span>your Choice</span>
                    </div>
                  </div>
                  <div class="d-flex justify-content-between total font-weight-bold mt-4">
                    <span>Venue</span>
                    <span
                      className="px-4"
                      style={{
                        backgroundColor: "#08F820",
                        borderRadius: "30px",
                      }}
                    >
                      Online
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
