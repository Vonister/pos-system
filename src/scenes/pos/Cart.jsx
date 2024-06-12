import CancelIcon from "@mui/icons-material/Cancel";
import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import ModalNoForm from "../../ui-component/ModalNoForm";
import {
  StyledAccordion,
  StyledAccordionDetails,
  StyledAccordionSummary,
} from "../../ui-component/StyledAccordion";
import ModalWrapper from "../../ui-component/ModalWrapper";
import { foods } from "../../data/foodData";
import Swal from "sweetalert2";

export default function Cart(props) {
  // Destructuring props
  const {
    cartItems,
    setCartItems,
    subtotal,
    discount,
    setDiscount,
    calculate,
    payable,
    setFoodsList,
    foodsList,
  } = props;

  // State variables
  const [expanded, setExpanded] = useState("");
  const [modal, setModal] = useState(false);
  const [proceedModal, setProceedModal] = useState(false);
  const [payment, setPayment] = useState(0);
  const [change, setChange] = useState(0);

  // Function to handle accordion panel changes
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  // Calculate totals on component mount and whenever relevant state changes
  useEffect(() => {
    calculate();
  }, [cartItems, subtotal, discount]);

  // Handle payment amount changes
  const handlePayment = (amount) => {
    const newAmount = payment + amount;
    const newChange = newAmount - payable;
    setPayment(newAmount);
    setChange(newChange);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new foodsList based on the current state
    let updatedFoodsList = foodsList.map((food) => ({ ...food }));

    // Iterate through cartItems and update stocks in the new foodsList
    cartItems.forEach((item) => {
      if (item.inclusion) {
        const filteredCartItems = updatedFoodsList.filter((list) =>
          item.inclusion.includes(list.id)
        );
        filteredCartItems.forEach((filterItem) => {
          updatedFoodsList = updatedFoodsList.map((food) => {
            return filterItem.id === food.id
              ? {
                  ...food,
                  stocks: food.stocks - item.quantity,
                }
              : food;
          });
        });
        // Update the state with the new foodsList
        setFoodsList(updatedFoodsList);
      } else {
        updatedFoodsList = updatedFoodsList.map((food) => {
          return item.name === food.name
            ? {
                ...food,
                stocks: food.stocks - item.quantity,
              }
            : food;
        });
      }
    });

    Swal.fire({
      icon: "success",
      html: `<h3>Successful Transaction</h3>
      <h2>Change: PHP 100.00</h2>
      `,
    });

    // Update the state with the new foodsList
    setFoodsList(updatedFoodsList);

    //Return the state to initial state
    setProceedModal(false);
    setPayment(0);
    setChange(0);
    setCartItems([]);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card>
          <CardHeader
            title={
              <Typography
                gutterBottom
                variant="h3"
                sx={{ fontWeight: 700 }}
                component="div"
              >
                Cart
              </Typography>
            }
          />

          {/* Orders in the cart */}
          <CardContent sx={{ py: 0, maxHeight: "450px", overflowY: "scroll" }}>
            {cartItems.length > 0 ? (
              <>
                {cartItems.map((cartData, index) => (
                  <StyledAccordion
                    key={index}
                    expanded={expanded === index}
                    onChange={handleChange(index)}
                  >
                    <StyledAccordionSummary
                      aria-controls={`${index}d-content`}
                      id={`${index}d-header`}
                    >
                      <Typography
                        display={"flex"}
                        flexDirection={"column"}
                        variant="h5"
                        color="text.secondary"
                      >
                        {cartData.name} {cartData?.option}
                        <Typography sx={{ fontWeight: "600", ml: 1 }}>
                          x {cartData.quantity}
                        </Typography>
                      </Typography>
                      <Typography display={"flex"} alignItems={"center"}>
                        PHP {(cartData.price * cartData.quantity).toFixed(2)}
                        <IconButton
                          onClick={() => {
                            setCartItems(
                              cartItems.filter((item) => item !== cartData)
                            );
                            setExpanded(false);
                          }}
                          sx={{ marginLeft: "5px" }}
                        >
                          <CancelIcon
                            sx={{
                              color: "#9f9f9e",
                              fontSize: "18px",
                            }}
                          />
                        </IconButton>
                      </Typography>
                    </StyledAccordionSummary>
                    <StyledAccordionDetails>
                      <FormControl fullWidth>
                        <TextField
                          id="quantity"
                          type="number"
                          name="quantity"
                          value={cartData.quantity}
                          onChange={(e) => {
                            const newValue = parseInt(e.target.value, 10);
                            if (newValue === 0) {
                              setCartItems(
                                cartItems.filter((item) => item !== cartData)
                              );
                            } else {
                              setCartItems(
                                cartItems.map((item) =>
                                  item === cartData
                                    ? { ...item, quantity: newValue }
                                    : item
                                )
                              );
                            }
                          }}
                          label="Quantity"
                          variant="outlined"
                          required
                        />
                      </FormControl>
                    </StyledAccordionDetails>
                  </StyledAccordion>
                ))}
              </>
            ) : (
              <Alert
                variant="filled"
                severity="info"
                sx={{ background: "whitesmoke", color: "#333" }}
              >
                There's no item in the cart
              </Alert>
            )}
          </CardContent>

          {/* Total to pay and discount information */}
          <CardActions>
            <Box display={"flex"} flexDirection={"column"} width={"100%"}>
              <Box display={"flex"} justifyContent={"space-between"}>
                <Typography>Subtotal</Typography>
                <Typography>PHP {subtotal.toFixed(2)}</Typography>
              </Box>
              <Box display={"flex"} justifyContent={"space-between"}>
                <Typography>Discount</Typography>
                <Typography>{discount}%</Typography>
              </Box>
              <Box display={"flex"} justifyContent={"space-between"} mt={2}>
                <Typography variant="h4">Payable Amount</Typography>
                <Typography>PHP {payable.toFixed(2)}</Typography>
              </Box>

              <Box display={"flex"} justifyContent={"space-between"} mt={2}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setModal(true)}
                >
                  Add Discount
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => setProceedModal(true)}
                  disabled={payable ? false : true}
                >
                  Proceed
                </Button>
              </Box>
            </Box>

            {/* Modal for adding discount */}
            <ModalNoForm
              open={modal}
              handleClose={() => setModal(false)}
              title="Add Discount"
            >
              <FormControl fullWidth>
                <TextField
                  id="discount"
                  type="search"
                  name="discount"
                  value={discount}
                  onChange={(e) => {
                    setDiscount(e.target.value);
                  }}
                  label="Discount"
                  variant="outlined"
                  required
                />
              </FormControl>
            </ModalNoForm>

            {/* Modal for payment */}
            <ModalWrapper
              open={proceedModal}
              handleClose={() => setProceedModal(false)}
              title="Payment"
              handleSubmit={handleSubmit}
              isButton={payment >= payable ? true : false}
            >
              {/* Payment form */}
              <Box display={"flex"} flexDirection={"column"} width={"100%"}>
                <Box display={"flex"} justifyContent={"space-between"}>
                  <Typography>Subtotal</Typography>
                  <Typography>PHP {subtotal.toFixed(2)}</Typography>
                </Box>
                <Box display={"flex"} justifyContent={"space-between"}>
                  <Typography>Discount</Typography>
                  <Typography>{discount}%</Typography>
                </Box>
                <Box display={"flex"} justifyContent={"space-between"}>
                  <Typography>Payable Amount</Typography>
                  <Typography variant="h4">PHP {payable.toFixed(2)}</Typography>
                </Box>
              </Box>

              {/* Payment options */}
              <Box display={"flex"} flexDirection={"column"} width={"100%"}>
                <Grid container>
                  <Grid item xs={12}>
                    <Typography mb={1} variant="h4">
                      Payment
                    </Typography>
                    <Box p={3} pl={0} pt={0} display={"flex"}>
                      {/* Payment buttons */}
                      {[20, 50, 100, 500, 1000].map((amount) => (
                        <Button
                          key={amount}
                          sx={{ mx: 1 }}
                          variant={"outlined"}
                          onClick={() => handlePayment(amount)}
                        >
                          +{amount}
                        </Button>
                      ))}
                    </Box>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={6}>
                    {/* Button for exact payment */}
                    <Button
                      sx={{ mx: 1 }}
                      variant={"contained"}
                      onClick={() => {
                        setPayment(payable);
                        setChange(0);
                      }}
                    >
                      Exact Amount
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    {/* Input for custom payment */}
                    <FormControl width={50}>
                      <TextField
                        id="payment"
                        type="number"
                        name="payment"
                        label="Payment"
                        variant="outlined"
                        value={payment === 0 ? "" : payment}
                        onChange={(e) => {
                          setPayment(Number(e.target.value));
                          setChange(Number(e.target.value) - payable);
                        }}
                        required
                      />
                    </FormControl>
                  </Grid>
                </Grid>
                <Box display={"flex"} justifyContent={"space-between"} mt={2}>
                  <Typography variant="h4">Change</Typography>
                  <Typography>PHP {change.toFixed(2)}</Typography>
                </Box>
              </Box>
            </ModalWrapper>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
}
