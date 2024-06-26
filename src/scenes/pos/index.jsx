import { Box, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { fetchData } from "../../features/fetchData";
import Cart from "./Cart";
import FoodMenu from "./FoodMenu";

const Pos = () => {
  // State variables to manage cart items, subtotal, discount, payable amount, search query, and the list of foods.
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [payable, setPayable] = useState(0);
  const [foodsList, setFoodsList] = useState([]);
  const [mealsList, setMealsList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [availableModes, setAvailableModes] = useState([]);

  // Function to calculate subtotal and payable amount based on cart items and discount.
  const calculate = () => {
    // Calculate the subtotal of all items in the cart.
    const newSubtotal = cartItems.reduce((acc, item) => {
      return acc + Number(item.prices) * Number(item.quantity);
    }, 0);

    // Update the state with the new subtotal.
    setSubtotal(newSubtotal);

    // Calculate the payable amount after applying the discount.
    const newPayable = newSubtotal - (newSubtotal * discount) / 100;
    setPayable(newPayable);
  };

  const fetchNeededData = () => {
    fetchData("categories").then((data) => {
      if (data) {
        // Sort the data by category
        const sortedData = data.sort((a, b) =>
          a.category.localeCompare(b.category)
        );
        setCategories(sortedData);
      } else {
        setCategories([]);
      }
    });
    fetchData("menu/foods").then((data) => {
      if (data) {
        // Sort the data by category
        const sortedData = data.sort((a, b) =>
          a.category.localeCompare(b.category)
        );

        setFoodsList(sortedData);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setFoodsList([]);
      }
    });
    fetchData("menu/meals").then((data) => {
      if (data) {
        // Sort the data by category
        const sortedData = data.sort((a, b) =>
          a.category.localeCompare(b.category)
        );
        setMealsList(sortedData);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setMealsList([]);
      }
    });
    fetchData("settings").then((data) => {
      if (data) {
        setIsLoading(false);
        setAvailableModes(data);
      } else {
        setIsLoading(false);
        setAvailableModes([]);
      }
    });
  };

  useEffect(() => {
    setIsLoading(true);
    fetchNeededData();
  }, []);

  return (
    <Box m="20px">
      <Grid container spacing={3} p={3}>
        {/* Main content area for the menu list */}
        <Grid item lg={9} md={12}>
          <FoodMenu
            foodsList={foodsList}
            cartItems={cartItems}
            setCartItems={setCartItems}
            calculate={calculate}
            setFoodsList={setFoodsList}
            categories={categories}
            mealsList={mealsList}
            fetchNeededData={fetchNeededData}
            isLoading={isLoading}
          />
        </Grid>

        {/* Sidebar area for the cart */}
        <Grid item lg={3} md={12}>
          <Cart
            cartItems={cartItems}
            setCartItems={setCartItems}
            subtotal={subtotal}
            discount={discount}
            setDiscount={setDiscount}
            payable={payable}
            calculate={calculate}
            foodsList={foodsList}
            fetchNeededData={fetchNeededData}
            availableModes={availableModes}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Pos;
