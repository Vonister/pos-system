import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  FormControl,
  FormControlLabel,
  Grid,
  Pagination,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { categories } from "../../data/foodData";
import { meals } from "../../data/mealData";
import Capsule from "../../ui-component/capsule/Capsule";
import ModalNoForm from "../../ui-component/ModalNoForm";

export default function FoodMenu({
  cartItems,
  setCartItems,
  calculate,
  searchQuery,
  foodsList,
  setFoodsList,
}) {
  // State variables
  const [modal, setModal] = useState(false);
  const [foodDetails, setFoodDetails] = useState();
  const [menuList, setMenuList] = useState([]);
  const [activeCategory, setActiveCategory] = useState("Burger");
  const [type, setType] = useState("Meal");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Function to add an item to the cart
  const addToCart = (food) => {
    setCartItems((prevCartItems) => {
      const existingItemIndex = prevCartItems.findIndex(
        (item) => item.name === food.name
      );
      if (existingItemIndex >= 0) {
        return prevCartItems.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : { ...item }
        );
      } else {
        return [
          ...prevCartItems,
          {
            name: food.name,
            quantity: 1,
            cost: food.cost,
            price: food.price,
            option: food?.option || null,
            inclusion: food?.inclusion || null,
          },
        ];
      }
    });
  };

  // Calculate and update the menu list based on selected category and type
  useEffect(() => {
    calculate();
    setMenuList(
      (type === "Meal" ? meals : foodsList).filter(
        (obj) => obj.category === activeCategory
      )
    );
    setFoodsList(foodsList);
  }, [cartItems, activeCategory, type, foodsList]);

  // Filter data based on search query
  const filteredData = (
    searchQuery ? [...foodsList, ...meals] : menuList
  ).filter((item) => {
    const foodValues = Object.values(item).join(" ").toLowerCase();
    return foodValues.includes(searchQuery.toLowerCase());
  });

  // Pagination variables
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  // Handle page change in pagination
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <>
      {/* Category and Type selection */}
      {!searchQuery && (
        <Grid
          container
          p={3}
          py={2}
          mb={3}
          sx={{ background: "#fff", borderRadius: 2 }}
        >
          <Grid item xs={9}>
            <Typography mb={1} variant="h4">
              Category
            </Typography>
            <Box display={"flex"}>
              {categories.map((category, index) => (
                <Button
                  className={`category-button
                   ${activeCategory === category ? "active" : ""}`}
                  key={index}
                  variant={activeCategory === category ? "outlined" : "text"}
                  onClick={() => {
                    setActiveCategory(category);
                    setCurrentPage(1);
                  }}
                >
                  {category}
                </Button>
              ))}
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box display={"flex"}>
              <FormControl>
                <Typography mb={1} variant="h4">
                  Type
                </Typography>
                <RadioGroup
                  row
                  id={"type"}
                  name={"type"}
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <FormControlLabel
                    value="Meal"
                    control={<Radio />}
                    label="Meal"
                  />
                  <FormControlLabel
                    value="Solo"
                    control={<Radio />}
                    label="Solo"
                  />
                </RadioGroup>
              </FormControl>
            </Box>
          </Grid>
        </Grid>
      )}

      {/* Food menu */}
      <Grid container spacing={3}>
        {currentData.map((food, index) => {
          let foodStocks = food.stocks;

          // Adjust stocks if inclusion is defined
          if (food.inclusion) {
            const stocks = foodsList
              .filter((list) => food.inclusion.includes(list.id))
              .map((stock) => stock.stocks);
            foodStocks = Math.min(...stocks);
          }

          return (
            <Grid item xs={2} key={index}>
              <Card
                sx={{
                  maxWidth: 345,
                  boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px;",
                  height: "100%",
                }}
                onClick={() => {
                  if (foodStocks > 0) {
                    if (food.options) {
                      setModal(true);
                      setFoodDetails({ ...food });
                    } else {
                      addToCart(food);
                    }
                  } else {
                    toast.error("Out of Stock", {
                      position: "top-left",
                      autoClose: true,
                      hideProgressBar: false,
                      closeOnClick: true,
                      draggable: false,
                      progress: undefined,
                      theme: "colored",
                    });
                  }
                }}
              >
                <CardActionArea sx={{ height: "100%" }}>
                  {/* Display out of stock message */}
                  <Box
                    sx={{
                      position: "absolute",
                      background: "red",
                      padding: "5px",
                      color: "white",
                      borderRadius: "5px",
                    }}
                    display={foodStocks > 0 ? "none" : "block"}
                  >
                    Out of Stock
                  </Box>
                  <Box padding={1}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={food.img}
                      alt="Food"
                    />
                  </Box>

                  <CardContent>
                    {/* Food category and stocks */}
                    <Grid
                      item
                      xs={12}
                      display={"flex"}
                      justifyContent={"space-between"}
                    >
                      <Typography gutterBottom variant="small" component="div">
                        <Capsule label={food.category} bgcolor={"blue"} />
                      </Typography>
                      <Typography gutterBottom variant="small" component="div">
                        Stocks: {foodStocks}
                      </Typography>
                    </Grid>

                    {/* Food price or options */}
                    {food.options ? (
                      <Typography gutterBottom variant="small" component="div">
                        {food.options.map((option, index) => (
                          <div key={index}>
                            {option} : PHP {food.price[index]}
                          </div>
                        ))}
                      </Typography>
                    ) : (
                      <Typography gutterBottom variant="small" component="div">
                        PHP {food.price}
                      </Typography>
                    )}

                    {/* Food name */}
                    <Typography gutterBottom variant="h4" component="div">
                      {food.name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>

              {/* Modal for selecting options */}
              <ModalNoForm
                open={modal}
                handleClose={() => setModal(false)}
                title={"Choose Size"}
              >
                <Box
                  width={"100%"}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  flexDirection={"column"}
                >
                  {/* Food image and name */}
                  <CardMedia
                    component="img"
                    width="100%"
                    image={foodDetails?.img}
                    alt="Food"
                  />
                  <Typography variant="h3">{foodDetails?.name}</Typography>

                  {/* Display included items */}
                  {foodDetails?.inclusion?.map((item) => {
                    const matchingItem = foodsList.find(
                      (list) => list.id === item
                    );

                    return matchingItem ? (
                      <Box
                        key={item}
                        my={1}
                        width={"100%"}
                        display={"flex"}
                        justifyContent={"space-between"}
                      >
                        <Typography variant="h5">
                          {matchingItem.name}
                        </Typography>
                        <Typography variant="h5">
                          Stocks: {matchingItem.stocks}
                        </Typography>
                      </Box>
                    ) : null;
                  })}

                  {/* Buttons for selecting options */}
                  <Grid container spacing={2}>
                    {foodDetails?.options.map((option, index) => (
                      <Grid item xs={4} key={index}>
                        <Button
                          sx={{ mx: 1 }}
                          variant="contained"
                          color="success"
                          onClick={() => {
                            addToCart({
                              name: foodDetails.name,
                              option,
                              price: foodDetails.price[index],
                              cost: foodDetails.cost[index],
                              inclusion: foodDetails?.inclusion,
                            });
                            setModal(false);
                            setFoodDetails();
                          }}
                        >
                          {option} <br /> PHP {foodDetails.price[index]}
                        </Button>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </ModalNoForm>
            </Grid>
          );
        })}
      </Grid>

      {/* Pagination */}
      <Grid item xs={12}>
        <Box display="flex" justifyContent="center" mt={3}>
          {totalPages > 1 && (
            <Box>
              <Pagination
                count={totalPages}
                page={currentPage}
                color="primary"
                shape="circular"
                onChange={handlePageChange}
              />
            </Box>
          )}
        </Box>
      </Grid>
    </>
  );
}
