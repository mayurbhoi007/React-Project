import React, { useEffect, useState } from "react";
import { FaPhone, FaMapMarkerAlt, FaInfoCircle } from "react-icons/fa";
import logo from "./assets/pic.png";
import addCart from "./assets/addcart.png";

const App = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchFoodAPI = async () => {
      try {
        const response = await fetch(
          "https://www.foodchow.com/api/FoodChowWD/GetRestaurantMenuWDWidget_multi?ShopId=3161&locale_id=null"
        );

        const result = await response.json();

        if (!result.data) {
          throw new Error("No data found!");
        }

        const parsedData = JSON.parse(result.data);

        const categoryList = parsedData.CategoryList || [];
        console.log(categoryList);
        setCategories(categoryList);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchFoodAPI();
  }, []);

  return (
    <div className="container">
      {/* Header */}
      <header className="header">
        <div className="logo-section">
          <img src={logo} alt="Master Chef Logo" className="logo" />
          <div>
            <h1 className="restaurant-name">FoodChow Demo India</h1>
            <p className="location">
              <FaMapMarkerAlt className="icon" /> Valsad, Gujarat, India
            </p>
          </div>
        </div>
        <div className="status">Restaurant Is Open</div>
        <div className="timing">
          Timing 07:00 AM - 11:00 PM <FaInfoCircle className="icon" />
        </div>
        <div className="buttons">
          <button className="button">Choose Service</button>
          <button className="button">Book Now</button>
          <button className="phone-button">
            <FaPhone className="icon" /> 7016997342
          </button>
        </div>
      </header>

      {/* Main Section */}
      <div className="main-content">
        {/* Sidebar */}
        <aside className="sidebar">
          <h2 className="sidebar-title">CATEGORIES</h2>
          <ul>
            {categories.map((category) => (
              <li key={category.CategryId}>{category.CategryName}</li>
            ))}
          </ul>
        </aside>

        {/* Menu Section */}
        <div className="menu-section">
          <div className="menu-bar">
            <input
              type="text"
              className="search-bar"
              placeholder="Search for dishes"
            />
          </div>
          {categories.length > 0 ? (
            categories.map((category) => (
              <div key={category.CategryId}>
                <h3 className="category-title">{category.CategryName}</h3>

                {/* Check if category has food items */}
                {category.ItemListWidget &&
                category.ItemListWidget.length > 0 ? (
                  category.ItemListWidget.map((item) => (
                    <div key={item.ItemId} className="menu-item">
                      <div className="food-details">
                        <h3>{item.ItemName}</h3>
                        <div className="food-description-image">
                          <p className="food-description">
                            {item.Description || "Delicious meal available!"}
                          </p>
                        </div>
                        <div className="food-bottom">
                          <span className="price">
                            {item.Price
                              ? `Rs.${item.Price}.00`
                              : "Price varies"}
                          </span>
                          <button className="add-button">ADD</button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No items available in this category.</p>
                )}
              </div>
            ))
          ) : (
            <p>Loading menu...</p>
          )}
        </div>

        {/* Cart Section  */}
        <aside className="cart-section">
          <h2 style={{ color: "blue", fontSize: "18px" }}>Your Cart</h2>
          <div className="cart-empty">
            <img src={addCart} alt="Empty Cart" />
            <p>Your Cart Is Empty! Add Some Delicious Food Items.</p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default App;
