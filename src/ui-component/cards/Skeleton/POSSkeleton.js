import { Grid, Skeleton } from '@mui/material';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import ItemCard from './ItemCard';

const POSSkeleton = () => {
  const cardCount = 20;
  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <LinearProgress />
      <Grid container spacing={3} mt={1}>
        {[...Array(cardCount)].map((_, index) => (
          <Grid key={index} item xl={2} lg={3} md={4} xs={6}>
            <ItemCard />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default POSSkeleton;
