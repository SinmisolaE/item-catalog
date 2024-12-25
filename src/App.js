import React, { useActionState, useState } from "react";

import productData from './products.json';
import './App.css';

function App() {

  //retrieve the product data
  const products = productData;

  //store the search term inputted by the user
  const [searchTerm, setSearchTerm] = useState("");

  
  const default_price = [0, 1000000]; // default price
  const [priceRange, setPriceRange] = useState(default_price);  // store price range inputted by user


  //stores category selected by user
  const [selectedCategory, setSelectedCategory] = useState("");


  //Filtering products
  const filteredProducts = products.filter((product) => {


    /* Search term would not be considered in the case of no search term
       else, products are filtered by description or keywords of product's name 
    */
    const matchesSearch = (searchTerm === "") ||
                (product.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );



    /* Price range not considered if not inputted,
        else only products are filtered by price range
     */
    const matchesPrice = (isNaN(priceRange[0]) || isNaN(priceRange[1])) ||
        ((product.price >= priceRange[0]) && product.price <= priceRange[1]
    );


    // category not considered if not selected, else products are filtered by selected category
    const matchesCategory = selectedCategory === "" || product.category === selectedCategory;

    // return the combined filtering of search, price range and category
    return matchesSearch && matchesPrice && matchesCategory;
  });

  

  /* function takes in the price range from user and sets it as new priceRange */
  const handlePriceRange = (e) => {
    const value = e.target.value;
    const [minPrice, maxPrice] = value.split('-').map((price) => parseInt(price.trim()));
    setPriceRange([minPrice, maxPrice]);
  }


  return (

    <div class="product-catalog">
        {/* Main container for the entire product catalog */}
        <h1>Product Catalog</h1>

        {/* Search product section */}
        <div class="search-product">

          {/* Input field for searching products by name or description */}
          <input
            type="text"
            placeholder="Search products..." // Placeholder text to guide the user
            value={searchTerm} // Binds the search input value to the `searchTerm` state
            class="searchInput" // CSS class for styling the search input
            onChange={(e) => setSearchTerm(e.target.value)} // Updates `searchTerm` whenever the user types
          />
        </div>


        {/* Price filter section */}
        <div class="price">
           {/* Input field for specifying a price range */}
            <input
              class="priceInput"
              type="text"
              placeholder="Enter price range: 200-5000" // Placeholder text to show the required format
              onChange={handlePriceRange} // Updates the `priceRange` state when the user inputs a range
            />
        </div>


        {/* Category filter section */}
        <div class="category">
          <h3>Select category: </h3> {/* Label for the category dropdown */}

          {/* Dropdown menu for selecting a product category */}
          <select
            value={selectedCategory} // Binds the selected value to the `selectedCategory` state
            onChange={(e) => setSelectedCategory(e.target.value)} // Updates `selectedCategory` when the user selects a category
          >
              {/* Dropdown options for categories */}
              <option value="">All Category</option> {/* Default option to show all categories */}
              <option value="Electronics">Electronics</option>
              <option value="Fashion">Fashion</option>
              <option value="Sports">Sports</option>
              <option value="Books">Books</option>
              <option value="Toys">Toys</option>

          </select>
        </div>


        {/* Products display section */}
        <div class="products">

          {/* Check if there are any products matching the filters */}
          {filteredProducts.length > 0 ? (

            // If there are matching products, display them in a list
            <ul class="product">

              {filteredProducts.map((product) => (
                <li
                  key={product.id} // Unique key for React to efficiently render the list
                  class="product_item" // CSS class for styling each product item
                >

                  {/* Display product details */}
                  <h2>{product.name}</h2> {/* Product name */}
                  <p>{product.description}</p> {/* Product description */}
                  <p>Price: ${product.price}</p> {/* Product price */}

                </li>
              ))}
            </ul>

          ) : (
            
            // If no products match the filters, show a message
            <p>No Results Found!!</p>
          )}
        </div>
    </div>

  );
}

export default App;
