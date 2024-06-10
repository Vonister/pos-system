import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Grid } from '@mui/material';
import { foods } from '../../data/foodData';

export default function FoodMenu() {
  return (
    <Grid container spacing={3}>
      {foods.map((food) => {
        return (
          <Grid item xs={2} key={food.id}>
            <Card sx={{ maxWidth: 345, boxShadow: 1, height: '100%' }}>
              <CardActionArea sx={{ height: '100%' }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={food.img}
                  alt="HamBurger with Fries and Drinks"
                />
                <CardContent>
                  <Grid
                    item
                    xs={12}
                    display={'flex'}
                    justifyContent={'space-between'}
                  >
                    <Typography gutterBottom variant="small" component="div">
                      {food.category}
                    </Typography>
                    <Typography gutterBottom variant="small" component="div">
                      Stocks: {food.stocks}
                    </Typography>
                  </Grid>

                  {food.options ? (
                    <Typography gutterBottom variant="small" component="div">
                      {food.options.map((option, index) => {
                        return (
                          <div key={index}>
                            PHP {food.options[index]} : {food.price[index]}
                          </div>
                        );
                      })}
                    </Typography>
                  ) : (
                    <Typography gutterBottom variant="small" component="div">
                      PHP {food.price}
                    </Typography>
                  )}

                  <Typography gutterBottom variant="h4" component="div">
                    {food.name}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}
