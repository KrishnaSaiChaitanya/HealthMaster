import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

import { useNavigate } from "react-router-dom";
function FruitsSection() {
  return (
    <div>
      <Navbar />
      <Products />
      <Footer />
    </div>
  );
}
const Products = () => {
  const navigate = useNavigate();
  // Fetch data From Products Start
  const [data, setData] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const customerId = window.localStorage.getItem("customerId");
  const [click, setClick] = useState(false);
  const [play, setPlay] = useState(data);

  const SongClicked = (targetIndex) => {
    setClick(true);
    setPlay(data.filter((a, idx) => idx === targetIndex));
  };

  // ------------=================================== Data Fetch =================================================================================
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8081/fetchData"); // Replace with your backend URL
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const responseData = await response.json();
        setData(responseData.data); // Set fetched data to state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  // ========================================================= Saved Function ===================================
  useEffect(() => {
    // On component mount, retrieve cart items from localStorage based on customer ID if available
    const storedCart = JSON.parse(
      window.localStorage.getItem(`cartItems_${customerId}`)
    );
    if (storedCart) {
      setCartItems(storedCart);
    }
  }, [customerId]);

  const updateCartItems = (updatedCart) => {
    setCartItems(updatedCart);
    // Store cart items in localStorage when it changes based on customer ID
    window.localStorage.setItem(
      `cartItems_${customerId}`,
      JSON.stringify(updatedCart)
    );
  };
  // -================================================== Add To Cart Section Start=========================================================
  const AddToCart = async (productdata) => {
    const productId = productdata.productid;

    if (customerId) {
      try {
        const response = await fetch("http://localhost:8081/addToCart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            customerid: customerId,
            productdata: productdata,
          }),
        });
        if (!response.ok) {
          throw new Error("Error adding to cart");
        }
        const updatedCart = [...cartItems, productId]; // Add product ID to cart items
        updateCartItems(updatedCart);
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    } else {
      alert("Please Login to add the items in your cart");
      navigate("/Login");
    }
    console.log(productdata.productid);
  };

  // Fetching Ratings data
  const [ratingdata, setRatingdata] = useState([]);
  useEffect(() => {
    const fetchDataRatings = async () => {
      try {
        const response = await fetch("http://localhost:8081/ratingsdata"); // Replace with your backend URL
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const responseData = await response.json();
        setRatingdata(responseData.data); // Set fetched data to state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchDataRatings();
  }, []);

  return (
    <div>
      <section></section>
      <div class="p-5 text-center">
        <h2 class="mb-3">Food Recipe</h2>
        <p
          className="text-center"
          style={{
            maxWidth: "60%",
            textAlign: "center",
            display: "contents",
            fontSize: "20px",
          }}
        >
          Find healthy and delicious recipes for you and your family, including
          ideas for quick and easy breakfasts and dinners.
        </p>
      </div>
      <section>
        <div className="container py-5">
          {/* Produts Start */}
          <div className="row">
            {data.map((products, idx) => {
              const isProductInCart = cartItems.includes(products.productid);

              const productRatings = ratingdata.filter(
                (item) => item.productid === products.productid
              );
              console.log("Product Ratings: ", productRatings);

              const totalRatings = productRatings.length;
              let averageStars = 0;

              if (totalRatings > 0) {
                const sumRatings = productRatings.reduce(
                  (sum, item) => sum + item.ratingstars,
                  0
                );
                averageStars = Math.round(sumRatings / totalRatings);
                console.log("Average Stars: ", averageStars);
              } else {
                console.log("No ratings found for this product.");
              }

              return (
                <div
                  key={products.productid}
                  className="col-md-12 col-lg-3 mb-4 mb-lg-0 xs:mx-2"
                >
                  <div
                    className="card mb-4"
                    style={{
                      minWidth: "200px",
                      minHeight: "470px",
                      maxHeight: "470px",
                    }}
                  >
                    {click && (
                      <ClickedProduct
                        play={play}
                        AddToCart={AddToCart}
                        cartItems={cartItems}
                        setClick={setClick}
                      />
                    )}
                    <div class="bg-image hover-zoom ripple rounded ripple-surface">
                      <img
                        src={products.recipeimage}
                        alt="Recipe"
                        onError={(e) =>
                          console.error("Error loading image:", e)
                        }
                        className="card-img-top"
                        onClick={() => SongClicked(idx)}
                      />
                    </div>
                    <div className="card-body">
                      <div className="d-flex justify-content-between mb-3">
                        <h5 className="mb-0">{products.recipename}</h5>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <p className="text-muted mb-0">
                          Duration:{" "}
                          <span className="fw-bold">
                            {products.recipeduration}
                          </span>
                          Mins
                        </p>
                        <div className="ms-auto">
                          {Array.from({ length: 5 }, (_, index) => {
                            return (
                              <i
                                key={index}
                                className={
                                  index < averageStars
                                    ? "fa fa-star text-warning"
                                    : "fa fa-star" // Display grey star when no ratings exist
                                }
                              ></i>
                            );
                          })}
                        </div>
                        <p>({totalRatings})</p>
                      </div>
                    </div>

                    <div className="pb-4 w-full">
                      <button
                        disabled={isProductInCart}
                        className="btn btn-primary"
                        style={{ width: "12rem" }}
                        onClick={() => AddToCart(products)}
                      >
                        {isProductInCart ? "Saved" : "Save"}
                      </button>
                    </div>
                  </div>

                  {/* Rating secction */}
                </div>
              );
            })}
          </div>
          {/* Produts End */}
        </div>
      </section>
    </div>
  );
};

const ClickedProduct = (props) => {
  const datas = props.play;
  const [rating, setRating] = useState(0);
  const cartItems = props.cartItems;
  // Function to handle rating selection

  const handleSubmit = (event, productId) => {
    event.preventDefault();
    const reviewText = event.target.reviewtext.value;
    handleRating(productId, rating, reviewText);
    event.target.reset();
  };

  const handleRating = async (productId, value, reviewText) => {
    const customerId = window.localStorage.getItem("customerId");
    try {
      const response = await fetch("http://localhost:8081/addRating", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
          customerId,
          rating: value,
          review: reviewText,
        }),
      });

      if (!response.ok) {
        throw new Error("Error adding rating");
      } else {
        props.setClick(false);
      }

      setRating(value);
    } catch (error) {
      console.error("Error adding rating:", error);
    }
  };

  // Fetching Data From BackEnd (Ratings Data)
  const [ratingdata, setRatingdata] = useState([]);

  useEffect(() => {
    const fetchDataRatings = async () => {
      try {
        const response = await fetch("http://localhost:8081/ratingsdata"); // Replace with your backend URL
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const responseData = await response.json();
        setRatingdata(responseData.data); // Set fetched data to state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchDataRatings();
  }, []);

  const getReviewsForProduct = (productId) => {
    return ratingdata.filter((review) => review.productid === productId);
  };

  return (
    <div>
      {datas.map((products) => {
        const reviewsForProduct = getReviewsForProduct(products.productid);
        const Ingredients = products.recipeingredients.split("#");
        const isProductInCart = cartItems.includes(products.productid);
        const productRatings = ratingdata.filter(
          (item) => item.productid === products.productid
        );
        console.log("Product Ratings: ", productRatings);

        const totalRatings = productRatings.length;
        let averageStars = 0;

        if (totalRatings > 0) {
          const sumRatings = productRatings.reduce(
            (sum, item) => sum + item.ratingstars,
            0
          );
          averageStars = Math.round(sumRatings / totalRatings);
          console.log("Average Stars: ", averageStars);
        } else {
          console.log("No ratings found for this product.");
        }

        return (
          <div key={products.productid}>
            <div className="clickedproduct-main mb-5 d-flex justify-content-center">
              <div className="clicked-product-card mt-3 d-flex justify-content-center mb-5 text-start ">
                <div className="w-50 ">
                  <div>
                    <h1 className="mt-5 fw-bolder">{products.recipename}</h1>
                    <div className="mt-3 fs-5">
                      {" "}
                      Ratings |
                      {Array.from({ length: 5 }, (_, index) => {
                        return (
                          <i
                            key={index}
                            className={
                              index < averageStars
                                ? "fa fa-star text-warning"
                                : "fa fa-star" // Display grey star when no ratings exist
                            }
                          ></i>
                        );
                      })}
                      <span>
                        {" "}
                        {averageStars}.0 | {totalRatings} Review
                      </span>
                    </div>
                    <p className="fs-5 mt-5">{products.recipedescription}</p>
                  </div>
                  <div>
                    <img
                      src={products.recipeimage}
                      className="w-100 mt-4"
                      alt={products.recipename}
                    />
                  </div>
                  <div className="mb-5">
                    <h2 className="fw-bolder mt-5 mb-5 ">Ingredients</h2>
                    {Ingredients.map((ingre) => {
                      return (
                        <p className="fs-5">
                          <span className="dot"> </span> {ingre}
                        </p>
                      );
                    })}
                  </div>
                  <button
                    disabled={isProductInCart}
                    className="btn btn-primary"
                    style={{ width: "12rem" }}
                    onClick={() => props.AddToCart(products)}
                  >
                    {isProductInCart ? "Saved" : "Save"}
                  </button>
                  <div>
                    <button
                      className="button-close"
                      onClick={() => {
                        props.setClick(false);
                      }}
                    >
                      X
                    </button>
                  </div>

                  {/* Rating Tab Start */}
                  <form
                    onSubmit={(event) =>
                      handleSubmit(event, products.productid)
                    }
                  >
                    <div className="m-1 mt-5 border border-5 p-4 border-gray">
                      <h5 className="fw-bold">Title: {products.recipename}</h5>
                      <div className="mb-3">
                        <label className="form-label fw-bolder mt-1">
                          Your Rating: (required)
                        </label>
                        {[...Array(5)].map((_, index) => (
                          <span
                            key={index}
                            onClick={() => setRating(index + 1)}
                            style={{
                              cursor: "pointer",
                              color: index < rating ? "#ffc107" : "gray",
                            }}
                            className="mx-1"
                          >
                            <i className="fa fa-star fs-3"></i>
                          </span>
                        ))}
                      </div>
                      <div className="mb-3">
                        <label
                          for="reviewtext"
                          className="form-label fw-bolder"
                        >
                          Your Review (optional)
                        </label>
                        <textarea
                          style={{
                            backgroundColor: "#F9F6EE",
                          }}
                          className="form-control"
                          id="reviewtext"
                          name="reviewtext"
                          rows="3"
                        />
                      </div>
                      <input
                        type="submit"
                        value="Submit"
                        className="btn btn-success"
                      />
                    </div>
                  </form>
                  {/* Rating Tab End */}
                  {/* Comments Showing Section Start */}
                  {reviewsForProduct.map((data) => {
                    const date = new Date(data.date_added);
                    const formattedDate = date.toISOString().split("T")[0];
                    return (
                      <div key={data.reviewId}>
                        <div className="mt-5">
                          <h5 className="fw-bolder">{data.customername}</h5>
                          <div className="mt-3 fs-4">
                            {[...Array(data.ratingstars)].map((_, index) => (
                              <i
                                key={index}
                                className="fa fa-star"
                                style={{ color: "green" }}
                              ></i>
                            ))}
                            {[...Array(5 - data.ratingstars)].map(
                              (_, index) => (
                                <i
                                  key={index + data.ratingstars}
                                  className="fa fa-star"
                                ></i>
                              )
                            )}
                            <span className="fs-6 fw-bold">
                              {" "}
                              &nbsp; &nbsp; {formattedDate}
                            </span>
                          </div>
                          <p className="fs-5 mt-3">
                            {data.reviewtext}
                            <hr />
                          </p>
                        </div>
                      </div>
                    );
                  })}

                  {/* Comments Showing Section End */}
                  <button
                    disabled
                    style={{
                      height: "100px",
                      backgroundColor: "rgba(0,0,0,0.0)",
                    }}
                  ></button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default FruitsSection;
