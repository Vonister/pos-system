import SearchIcon from "@mui/icons-material/Search";
import { Box, Grid, IconButton, InputBase } from "@mui/material";
import Header from "../../ui-component/Header";
import MainCard from "../../ui-component/cards/MainCard";
import Cart from "./Cart";
import FoodMenu from "./FoodMenu";
import { useState } from "react";
import { foods } from "../../data/foodData";

const Pos = () => {
  // State variables to manage cart items, subtotal, discount, payable amount, search query, and the list of foods.
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [payable, setPayable] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [foodsList, setFoodsList] = useState(foods);

  // Function to calculate subtotal and payable amount based on cart items and discount.
  const calculate = () => {
    // Calculate the subtotal of all items in the cart.
    const newSubtotal = cartItems.reduce((acc, item) => {
      return acc + Number(item.price) * Number(item.quantity);
    }, 0);

    // Update the state with the new subtotal.
    setSubtotal(newSubtotal);

    // Calculate the payable amount after applying the discount.
    const newPayable = newSubtotal - (newSubtotal * discount) / 100;
    setPayable(newPayable);
  };

  // Event handler for updating the search query state when the user types in the search input.
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <Box m="20px">
      <Grid container spacing={3} p={3}>
        {/* Main content area for the menu list */}
        <Grid item xs={9}>
          {/* <MainCard
            title="Menu List"
            secondary={
              <Box
                display="flex"
                borderRadius="3px"
                backgroundColor={"#f5f5f5"}
              >
                <InputBase
                  sx={{ ml: 2, flex: 1 }}
                  placeholder="Search"
                  onChange={handleSearchChange}
                />
                <IconButton type="button" sx={{ p: 1 }}>
                  <SearchIcon />
                </IconButton>
              </Box>
            }
          > */}
          <FoodMenu
            foodsList={foodsList}
            cartItems={cartItems}
            setCartItems={setCartItems}
            searchQuery={searchQuery}
            calculate={calculate}
            setFoodsList={setFoodsList}
          />
          {/* </MainCard> */}
        </Grid>

        {/* Sidebar area for the cart */}
        <Grid item xs={3}>
          <Cart
            cartItems={cartItems}
            setCartItems={setCartItems}
            subtotal={subtotal}
            discount={discount}
            setDiscount={setDiscount}
            payable={payable}
            calculate={calculate}
            foodsList={foodsList}
            setFoodsList={setFoodsList}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Pos;
