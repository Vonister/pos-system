import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {
  Alert,
  Box,
  CardActionArea,
  CardHeader,
  FormControl,
  Grid,
  IconButton,
  TextField,
} from '@mui/material';
import { foods } from '../../data/foodData';
import {
  StyledAccordion,
  StyledAccordionSummary,
  StyledAccordionDetails,
} from '../../ui-component/StyledAccordion';
import { useState } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import { cart } from '../../data/cartData';
import { Key } from '@mui/icons-material';

export default function Cart() {
  const [expanded, setExpanded] = useState('');
  const [cartItems, setCartItems] = useState(cart);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
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

          <CardContent sx={{ py: 0 }}>
            {cartItems.length > 0 ? (
              <>
                {cartItems.map((cartData) => {
                  return (
                    <StyledAccordion
                      key={cartData.id}
                      expanded={expanded === cartData.id}
                      onChange={handleChange(cartData.id)}
                    >
                      <StyledAccordionSummary
                        aria-controls={`${cartData.id}d-content`}
                        id={`${cartData.id}d-header`}
                      >
                        <Typography
                          display={'flex'}
                          flexDirection={'column'}
                          variant="h5"
                          color="text.secondary"
                        >
                          {cartData.name}
                          <Typography sx={{ fontWeight: '600', ml: 1 }}>
                            x {cartData.quantity}
                          </Typography>
                        </Typography>

                        <Typography display={'flex'} alignItems={'center'}>
                          PHP {cartData.price * cartData.quantity}
                          <IconButton
                            onClick={() => {}}
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
                            // inputProps={{ min: 1 }}
                            required
                          />
                        </FormControl>
                      </StyledAccordionDetails>
                    </StyledAccordion>
                  );
                })}
              </>
            ) : (
              <Alert
                variant="filled"
                severity="info"
                sx={{ background: 'whitesmoke', color: '#333' }}
              >
                Theres no item in the cart
              </Alert>
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
