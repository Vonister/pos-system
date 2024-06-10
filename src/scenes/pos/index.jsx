import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  InputBase,
  useTheme,
} from '@mui/material';
import { tokens } from '../../theme';
import FoodMenu from './FoodMenu';
import Cart from './Cart';
import MainCard from '../../ui-component/cards/MainCard';
import Header from '../../ui-component/Header';
import SearchIcon from '@mui/icons-material/Search';

const Pos = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="POS" subtitle="Point of Sales" />
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={9}>
          <MainCard
            title="Menu List"
            secondary={
              <Box
                display="flex"
                borderRadius="3px"
                backgroundColor={'#f5f5f5'}
              >
                <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
                <IconButton type="button" sx={{ p: 1 }}>
                  <SearchIcon />
                </IconButton>
              </Box>
            }
          >
            <FoodMenu />
          </MainCard>
        </Grid>

        <Grid item xs={3}>
          <Cart />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Pos;
