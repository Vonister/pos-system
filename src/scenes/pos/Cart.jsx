import CancelIcon from '@mui/icons-material/Cancel';
import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import ModalNoForm from '../../ui-component/ModalNoForm';
import {
  StyledAccordion,
  StyledAccordionDetails,
  StyledAccordionSummary,
} from '../../ui-component/StyledAccordion';
import ModalWrapper from '../../ui-component/ModalWrapper';
import Swal from 'sweetalert2';
import { saveData } from '../../features/saveData';
import { updateData } from '../../features/updateData';
import GetCurrentDate from '../../services/GetCurrentDate';
import GenerateTransactionNumber from '../../services/GenerateTransactionNumber';

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
    foodsList,
    fetchNeededData,
  } = props;

  // State variables
  const [expanded, setExpanded] = useState('');
  const [modal, setModal] = useState(false);
  const [proceedModal, setProceedModal] = useState(false);
  const [payment, setPayment] = useState(0);
  const [change, setChange] = useState(0);
  const [isDine, setIsDine] = useState('Dine In');
  const [transactionNumber, setTransactionNumber] = useState('');

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

    var totalCosts = 0;
    var totalPrices = 0;
    var netProfit = 0;
    var discountPercent = discount;
    var discountAmount = subtotal - payable;

    // Iterate through cartItems and update stocks in the new foodsList
    cartItems.forEach((item) => {
      //Decrease the stocks in the database
      if (item.inclusions) {
        const filteredCartItems = foodsList.filter((list) =>
          item.inclusions.includes(list.id)
        );
        filteredCartItems.forEach((filterItem) => {
          foodsList.map((food) => {
            if (filterItem.id === food.id) {
              const { id, imageUrl, ...restofData } = food; // Exclude the `id` key and imageUrl before updating the data
              updateData(
                {
                  ...restofData,
                  stocks: food.stocks - item.quantity,
                },
                `menu/foods/${food.id}`
              );
            }
          });
        });
      } else {
        foodsList.map((food) => {
          if (item.id === food.id) {
            const { id, imageUrl, ...restofData } = food; // Exclude the `id` key and imageUrl before updating the data
            updateData(
              {
                ...restofData,
                stocks: food.stocks - item.quantity,
              },
              `menu/foods/${food.id}`
            );
          }
        });
      }

      totalCosts = totalCosts + Number(item.costs);
      totalPrices = totalPrices + Number(item.prices);
    });

    var netProfit =
      Number(totalPrices) - (Number(totalCosts) + Number(discountAmount));

    saveData(
      {
        totalCosts,
        totalPrices,
        netProfit,
        discountPercent,
        discountAmount,
        date: GetCurrentDate(),
        items: cartItems,
        totalNumberItems: cartItems.length,
        isDine,
        transactionNumber,
      },
      'transactions'
    );

    Swal.fire({
      icon: 'success',
      html: `<h3>Successful Transaction</h3>
      <h2>Change: PHP 100.00</h2>
      `,
    });

    //Return the state to initial state
    setProceedModal(false);
    setPayment(0);
    setChange(0);
    setCartItems([]);
    fetchNeededData();
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
          <CardContent sx={{ py: 0, maxHeight: '450px', overflowY: 'auto' }}>
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
                        display={'flex'}
                        flexDirection={'column'}
                        variant="h5"
                        color="text.secondary"
                      >
                        {cartData.name} {cartData?.options}
                        <Typography sx={{ fontWeight: '600', ml: 1 }}>
                          x {cartData.quantity}
                        </Typography>
                      </Typography>
                      <Typography display={'flex'} alignItems={'center'}>
                        PHP {(cartData.prices * cartData.quantity).toFixed(2)}
                        <IconButton
                          onClick={() => {
                            setCartItems(
                              cartItems.filter((item) => item !== cartData)
                            );
                            setExpanded(false);
                          }}
                          sx={{ marginLeft: '5px' }}
                        >
                          <CancelIcon
                            sx={{
                              color: '#9f9f9e',
                              fontSize: '18px',
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
                sx={{ background: 'whitesmoke', color: '#333' }}
              >
                There's no item in the cart
              </Alert>
            )}
          </CardContent>

          {/* Total to pay and discount information */}
          <CardActions>
            <Box display={'flex'} flexDirection={'column'} width={'100%'}>
              <Box display={'flex'} justifyContent={'space-between'}>
                <Typography>Subtotal</Typography>
                <Typography>PHP {subtotal.toFixed(2)}</Typography>
              </Box>
              <Box display={'flex'} justifyContent={'space-between'}>
                <Typography>Discount</Typography>
                <Typography>{discount}%</Typography>
              </Box>
              <Box display={'flex'} justifyContent={'space-between'} mt={2}>
                <Typography variant="h4">Payable Amount</Typography>
                <Typography>PHP {payable.toFixed(2)}</Typography>
              </Box>

              <Box display={'flex'} justifyContent={'space-between'} mt={2}>
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
                  onClick={() => {
                    setTransactionNumber(GenerateTransactionNumber());
                    setProceedModal(true);
                  }}
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
              <Grid container>
                <Grid item xs={12}>
                  <Typography mb={1} variant="h4">
                    Discount
                  </Typography>
                  <Box p={3} pl={0} pt={0} display={'flex'}>
                    {/* Payment buttons */}
                    {[5, 10, 20, 50].map((amount) => (
                      <Button
                        key={amount}
                        sx={{ mx: 1 }}
                        variant={'contained'}
                        onClick={() => setDiscount(amount)}
                      >
                        {amount}%
                      </Button>
                    ))}
                  </Box>
                  <Box p={3} pl={0} pt={0} display={'flex'}>
                    {/* Payment buttons */}
                    {['PWD', 'Senior'].map((amount) => (
                      <Button
                        key={amount}
                        sx={{ mx: 1 }}
                        variant={'contained'}
                        color="success"
                        onClick={() => setDiscount(20)}
                      >
                        {amount}
                      </Button>
                    ))}
                  </Box>
                </Grid>
              </Grid>
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
              <Box
                display={'flex'}
                flexDirection={'column'}
                width={'100%'}
                sx={{ mb: 3 }}
              >
                <Box
                  display={'flex'}
                  justifyContent={'space-between'}
                  sx={{ mb: 2 }}
                >
                  <Typography variant="h4">Transaction Number</Typography>
                  <Typography variant="h4">{transactionNumber}</Typography>
                </Box>
                <Box display={'flex'} justifyContent={'space-between'}>
                  <Typography>Subtotal</Typography>
                  <Typography>PHP {subtotal.toFixed(2)}</Typography>
                </Box>
                <Box display={'flex'} justifyContent={'space-between'}>
                  <Typography>Discount</Typography>
                  <Typography>{discount}%</Typography>
                </Box>
                <Box display={'flex'} justifyContent={'space-between'}>
                  <Typography>Payable Amount</Typography>
                  <Typography variant="h4">PHP {payable.toFixed(2)}</Typography>
                </Box>
              </Box>

              {/* Payment options */}
              <Box display={'flex'} flexDirection={'column'} width={'100%'}>
                <Grid container>
                  <Grid item xs={12}>
                    <Typography mb={1} variant="h4">
                      Payment
                    </Typography>
                    <Box p={3} pl={0} pt={0} display={'flex'}>
                      {/* Payment buttons */}
                      {[20, 50, 100, 500, 1000].map((amount) => (
                        <Button
                          key={amount}
                          sx={{ mx: 1 }}
                          variant={'outlined'}
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
                      variant={'contained'}
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
                        value={payment === 0 ? '' : payment}
                        onChange={(e) => {
                          setPayment(Number(e.target.value));
                          setChange(Number(e.target.value) - payable);
                        }}
                        required
                      />
                    </FormControl>
                  </Grid>
                </Grid>
                <Box display={'flex'} justifyContent={'space-between'} mt={2}>
                  <Typography variant="h4">Change</Typography>
                  <Typography>PHP {change.toFixed(2)}</Typography>
                </Box>
              </Box>
              <Box display={'flex'} justifyContent={'end'}>
                <FormControl>
                  <RadioGroup
                    row
                    id={'dine'}
                    name={'dine'}
                    value={isDine}
                    onChange={(e) => setIsDine(e.target.value)}
                  >
                    <FormControlLabel
                      value="Dine In"
                      control={<Radio />}
                      label="Dine In"
                    />
                    <FormControlLabel
                      value="Take Out"
                      control={<Radio />}
                      label="Take Out"
                    />
                  </RadioGroup>
                </FormControl>
              </Box>
            </ModalWrapper>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
}
