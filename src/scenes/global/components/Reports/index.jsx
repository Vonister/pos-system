import {
  Box,
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { tokens } from '../../../../theme';
import { mockTransactions } from '../../../../data/mockData';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import EmailIcon from '@mui/icons-material/Email';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import TrafficIcon from '@mui/icons-material/Traffic';
import LineChart from '../../../../ui-component/charts/LineChart';
// import BarChart from '../../../../ui-component/charts/BarChart';
import StatBox from '../../../../ui-component/charts/StatBox';
import ProgressCircle from '../../../../ui-component/charts/ProgressCircle';
import { useEffect, useState } from 'react';
import { fetchData } from '../../../../features/fetchData';
import { addDays, subDays } from 'date-fns';
import { format } from 'date-fns/format';
import { DateRangePicker } from 'react-date-range';
import { BarChart } from '@mui/x-charts/BarChart';

import CancelIcon from '@mui/icons-material/Cancel';

const Reports = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);
  const [openDate, setOpenDate] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [dateRange, setDateRange] = useState([
    {
      startDate: subDays(new Date(), 7),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  const handleDateSelection = (item) => {
    setDateRange([item.selection]);
  };

  // Create the final object with all categories
  const createCategorySummary = (categories, categoryCounts) => {
    const categorySummary = {};

    categories.forEach((category) => {
      if (categoryCounts[category]) {
        categorySummary[category] = categoryCounts[category];
      } else {
        categorySummary[category] = 0;
      }
    });

    return categorySummary;
  };

  useEffect(() => {
    fetchData('categories').then((categories) => {
      const sortedData = categories.sort((a, b) =>
        a.category.localeCompare(b.category)
      );
      setCategoryList(sortedData);
    });
    fetchData('transactions').then((transactions) => {
      var netProfit = 0;
      var amountCharged = 0;
      var totalCost = 0;
      var totalItems = 0;
      var amountDiscounted = 0;
      var totalTransaction = 0;
      var tempData = [];
      var categoryNumbers = {};
      // Check if the date is between the from and to dates

      transactions.map((transaction) => {
        // Parse the dates
        const from = new Date(format(dateRange[0].startDate, 'yyyy-MM-dd'));
        const to = new Date(format(dateRange[0].endDate, 'yyyy-MM-dd'));
        const date = new Date(format(transaction.date, 'yyyy-MM-dd'));
        if (date >= from && date <= to) {
          transaction.items.forEach((transact) => {
            const { category, quantity } = transact;

            // If the category is already in the object, add the quantity
            // Otherwise, initialize it with the current quantity
            if (categoryNumbers[category]) {
              categoryNumbers[category] += quantity;
            } else {
              categoryNumbers[category] = quantity;
            }
          });
          tempData.push({ ...transaction });
          netProfit += transaction.netProfit;
          amountCharged += transaction.totalPrices;
          totalCost += transaction.totalCosts;
          totalItems += transaction.items.length;
          amountDiscounted += transaction.discountAmount;
          totalTransaction += 1;
        }
      });

      // Sort the data by date
      const sortedData = tempData.sort((b, a) => a.date.localeCompare(b.date));

      // Limit the sorted data to 10 transactions
      const recentTransactions = sortedData.slice(0, 10);

      setData({
        netProfit,
        amountCharged,
        totalCost,
        totalTransaction,
        totalItems,
        amountDiscounted,
        recentTransactions,
        categoryNumbers,
      });
    });
  }, [dateRange]);

  return (
    <Box p={3} pt={0}>
      <Box
        width={'100%'}
        backgroundColor={'#fff'}
        px={3}
        py={2}
        mb={2}
        display={'flex'}
        justifyContent={'space-between'}
        borderRadius={2}
        boxShadow={'rgba(0, 0, 0, 0.24) 0px 3px 8px;'}
      >
        <Typography variant="h3">Reports</Typography>
        <Box>
          {openDate ? (
            <Box>
              <Box display={'flex'} justifyContent={'end'}>
                <IconButton onClick={() => setOpenDate(false)}>
                  <CancelIcon color="error" />
                </IconButton>
              </Box>
              <DateRangePicker
                onChange={(item) => {
                  handleDateSelection(item);
                }}
                showSelectionPreview={true}
                moveRangeOnFirstSelection={false}
                months={2}
                ranges={dateRange}
                direction="horizontal"
                calendarFocus="backwards"
              />
            </Box>
          ) : (
            <>
              <TextField
                onClick={() => setOpenDate(true)}
                label="From Date"
                type="text"
                value={format(dateRange[0].startDate, 'MMM dd, yyyy')}
                variant="filled"
                sx={{ mx: 1 }}
              />
              <TextField
                onClick={() => setOpenDate(true)}
                label="To Date"
                type="text"
                value={format(dateRange[0].endDate, 'MMM dd, yyyy')}
                variant="filled"
                sx={{ mx: 1 }}
              />
            </>
          )}
        </Box>
      </Box>
      <Grid container spacing={3} mb={3}>
        <Grid item xl={2} lg={4} md={6} xs={12}>
          <StatBox
            title={`₱ ${data.netProfit}`}
            subtitle="Net Profit"
            color="primary"
            icon={<EmailIcon color="primary" sx={{ fontSize: '40px' }} />}
          />
        </Grid>
        <Grid item xl={2} lg={4} md={6} xs={12}>
          <StatBox
            title={`₱ ${data.amountCharged}`}
            subtitle="Amount Charged"
            color="success"
            icon={<EmailIcon color="success" sx={{ fontSize: '40px' }} />}
          />
        </Grid>
        <Grid item xl={2} lg={4} md={6} xs={12}>
          <StatBox
            title={`₱ ${data.totalCost}`}
            subtitle="Total Cost"
            color="warning"
            icon={<EmailIcon color="warning" sx={{ fontSize: '40px' }} />}
          />
        </Grid>
        <Grid item xl={2} lg={4} md={6} xs={12}>
          <StatBox
            title={data.totalTransaction}
            subtitle="Total Transaction"
            color="orange"
            icon={<EmailIcon color="orange" sx={{ fontSize: '40px' }} />}
          />
        </Grid>
        <Grid item xl={2} lg={4} md={6} xs={12}>
          <StatBox
            title={data.totalItems}
            subtitle="No. of Items"
            color="secondary"
            icon={<EmailIcon color="secondary" sx={{ fontSize: '40px' }} />}
          />
        </Grid>

        <Grid item xl={2} lg={4} md={6} xs={12}>
          <StatBox
            title={`₱ ${data.amountDiscounted}`}
            subtitle="Amount Discounted"
            color="error"
            icon={<EmailIcon color="error" sx={{ fontSize: '40px' }} />}
          />
        </Grid>
      </Grid>
      <Grid container spacing={3} mb={3}>
        <Grid item lg={8} md={12}>
          <Box
            gridColumn="span 8"
            gridRow="span 2"
            backgroundColor={'#fff'}
            padding={2}
            borderRadius={2}
            boxShadow={'rgba(0, 0, 0, 0.24) 0px 3px 8px;'}
          >
            <Box
              mt="25px"
              p="0 30px"
              display="flex "
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Typography
                  variant="h5"
                  fontWeight="600"
                  color={colors.grey[100]}
                >
                  Revenue Generated
                </Typography>
                <Typography
                  variant="h3"
                  fontWeight="bold"
                  color={colors.greenAccent[500]}
                >
                  $59,342.32
                </Typography>
              </Box>
              <Box>
                <IconButton>
                  <DownloadOutlinedIcon
                    sx={{ fontSize: '26px', color: colors.greenAccent[500] }}
                  />
                </IconButton>
              </Box>
            </Box>
            <Box height="250px" m="-20px 0 0 0">
              <LineChart isDashboard={true} />
            </Box>
          </Box>
        </Grid>
        <Grid item lg={4} md={12}>
          <Box
            gridColumn="span 4"
            gridRow="span 2"
            backgroundColor={'#fff'}
            overflow="auto"
            padding={2}
            pt={0}
            borderRadius={2}
            boxShadow={'rgba(0, 0, 0, 0.24) 0px 3px 8px;'}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`2px solid ${colors.primary[500]}`}
              colors={colors.grey[100]}
              p="15px"
            >
              <Typography
                color={colors.grey[100]}
                variant="h5"
                fontWeight="600"
              >
                Recent Transactions
              </Typography>
            </Box>
            {data?.recentTransactions?.map((transaction, i) => (
              <Box
                key={transaction.id}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`1px solid `}
                p="15px"
              >
                <Box>
                  <Typography
                    color={colors.greenAccent[500]}
                    variant="h5"
                    fontWeight="600"
                  >
                    {transaction.transactionNumber}
                  </Typography>
                  <Typography color={colors.grey[100]}>
                    {transaction.totalNumberItems} item/s
                  </Typography>
                </Box>
                <Box color={colors.grey[100]}>
                  {format(transaction.date, 'MMM dd, yyyy HH:ii aa')}
                </Box>
                <Box
                  backgroundColor={colors.greenAccent[500]}
                  p="5px 10px"
                  borderRadius="4px"
                >
                  ₱{transaction.totalPrices}
                </Box>
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={3} mb={3}>
        <Grid item lg={8} md={12}>
          <Box
            gridColumn="span 8"
            gridRow="span 2"
            backgroundColor={'#fff'}
            padding={2}
            borderRadius={2}
            boxShadow={'rgba(0, 0, 0, 0.24) 0px 3px 8px;'}
          >
            <Typography
              variant="h5"
              fontWeight="600"
              sx={{ padding: '30px 30px 0 30px' }}
            >
              Most Popular Category
            </Typography>
            <Box>
              <BarChart
                series={[{ data: [100, 44, 24, 34] }]}
                height={290}
                xAxis={[
                  {
                    data: categoryList.map((category) => category.category),
                    scaleType: 'band',
                  },
                ]}
                margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
            Campaign
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle size="125" />
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: '15px' }}
            >
              $48,352 revenue generated
            </Typography>
            <Typography>Includes extra misc expenditures and costs</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Reports;
