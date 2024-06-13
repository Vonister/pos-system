import SearchIcon from '@mui/icons-material/Search';
import { Box, Grid, IconButton, InputBase } from '@mui/material';
import Header from '../../ui-component/Header';
import MainCard from '../../ui-component/cards/MainCard';
import Cart from './Cart';
import FoodMenu from './FoodMenu';
import { useEffect, useState } from 'react';
import { foods } from '../../data/foodData';
import { fetchData } from '../../features/fetchData';

const Pos = () => {
  // State variables to manage cart items, subtotal, discount, payable amount, search query, and the list of foods.
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [payable, setPayable] = useState(0);
  const [foodsList, setFoodsList] = useState([]);
  const [mealsList, setMealsList] = useState([]);
  const [categories, setCategories] = useState([]);

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
    fetchData('categories').then((data) => {
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
    fetchData('menu/foods').then((data) => {
      if (data) {
        // Sort the data by category
        const sortedData = data.sort((a, b) =>
          a.category.localeCompare(b.category)
        );
        setFoodsList(sortedData);
      } else {
        setFoodsList([]);
      }
    });
    fetchData('menu/meals').then((data) => {
      if (data) {
        // Sort the data by category
        const sortedData = data.sort((a, b) =>
          a.category.localeCompare(b.category)
        );
        setMealsList(sortedData);
      } else {
        setMealsList([]);
      }
    });
  };

  useEffect(() => {
    fetchNeededData();
  }, []);

  return (
    <Box m="20px">
      <Grid container spacing={3} p={3}>
        {/* Main content area for the menu list */}
        <Grid item md={9} xs={12}>
          <FoodMenu
            foodsList={foodsList}
            cartItems={cartItems}
            setCartItems={setCartItems}
            calculate={calculate}
            setFoodsList={setFoodsList}
            categories={categories}
            mealsList={mealsList}
            fetchNeededData={fetchNeededData}
          />
        </Grid>

        {/* Sidebar area for the cart */}
        <Grid item md={3} xs={12}>
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
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Pos;
