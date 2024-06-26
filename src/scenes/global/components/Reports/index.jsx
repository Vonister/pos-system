import CancelIcon from "@mui/icons-material/Cancel";
import EmailIcon from "@mui/icons-material/Email";
import {
  Box,
  Grid,
  IconButton,
  TextField,
  Tooltip,
  Typography,
  Zoom,
} from "@mui/material";
import { PieChart } from "@mui/x-charts";
import { BarChart } from "@mui/x-charts/BarChart";
import { format, subDays } from "date-fns";
import { useEffect, useState } from "react";
import { DateRangePicker } from "react-date-range";
import { fetchData } from "../../../../features/fetchData";
import LineChart from "../../../../ui-component/charts/LineChart";
import StatBox from "../../../../ui-component/charts/StatBox";

import colors from "../../../../themes/colors";

import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import DiscountIcon from "@mui/icons-material/Discount";
import NoFoodIcon from "@mui/icons-material/NoFood";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import DashboardSkeleton from "../../../../ui-component/cards/Skeleton/DashboardSkeleton";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import Capsule from "../../../../ui-component/capsule/Capsule";

const Reports = () => {
  const [data, setData] = useState([]);
  const [openDate, setOpenDate] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dateRange, setDateRange] = useState([
    {
      startDate: subDays(new Date(), 7),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await fetchData("categories");
        const sortedCategories = categories.sort((a, b) =>
          a.category.localeCompare(b.category)
        );
        setCategoryList(sortedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchTransactions = async () => {
      try {
        const transactions = await fetchData("transactions");
        const filteredData = filterAndSummarizeTransactions(transactions);
        setData(filteredData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchCategories();
    fetchTransactions();
  }, [dateRange]);

  const handleDateSelection = (item) => {
    setDateRange([item.selection]);
  };

  const filterAndSummarizeTransactions = (transactions) => {
    let netProfit = 0;
    let amountCharged = 0;
    let totalCost = 0;
    let totalItems = 0;
    let amountDiscounted = 0;
    let totalTransaction = 0;
    let refundedItems = 0;
    let refundedAmount = 0;
    let recentTransactions = [];
    let categoryCounts = {};
    let popularItems = [];
    let lineChartData = [
      {
        id: "Gross Profits",
        color: colors["primaryMain"],
        data: [],
      },
      {
        id: "Net Revenue",
        color: colors["secondaryMain"],
        data: [],
      },
    ];

    const fromDate = new Date(format(dateRange[0].startDate, "yyyy-MM-dd"));
    const toDate = new Date(format(dateRange[0].endDate, "yyyy-MM-dd"));

    transactions.forEach((transaction) => {
      const transactionDate = new Date(format(transaction.date, "yyyy-MM-dd"));
      if (transactionDate >= fromDate && transactionDate <= toDate) {
        transaction.items.forEach((item) => {
          const { category, quantity, name, id } = item;
          const existingItem = popularItems.find(
            (popItem) => popItem.label === name
          );
          if (existingItem) {
            // If item already exists, update its value
            popularItems = popularItems.map((popItem) =>
              popItem.label === name
                ? { ...popItem, value: popItem.value + quantity }
                : popItem
            );
          } else {
            // If item doesn't exist, create a new object
            popularItems.push({
              id,
              value: quantity,
              label: name,
            });
          }
          categoryCounts[category] = (categoryCounts[category] || 0) + quantity;

          //CHECK IF THE ITEM IS REFUNDED
          if (item.status === "Refunded") {
            refundedItems += 1 * item.quantity;
            refundedAmount += Number(item.prices) * Number(item.quantity);
          }

          totalItems += item.quantity;
        });

        netProfit += transaction.netProfit;
        amountCharged += transaction.totalPrices;
        totalCost += transaction.totalCosts;
        amountDiscounted += transaction.discountAmount;
        totalTransaction += 1;
        recentTransactions.push(transaction);
      }
    });

    const currentDate = new Date(fromDate); // Start from the fromDate

    while (currentDate <= toDate) {
      // Format currentDate as "yyyy-MM-dd"
      const formattedDate = format(currentDate, "yyyy-MM-dd");
      transactions.forEach((transaction) => {
        const transactionDate = format(transaction.date, "yyyy-MM-dd");

        if (transactionDate === formattedDate) {
          const existingItem = lineChartData[0].data.find(
            (lineData) => lineData.x === format(transaction.date, "MMM-dd")
          );

          if (existingItem) {
            // If item already exists, update its value

            //GROSS PROFITS
            lineChartData[0].data = lineChartData[0].data.map((lineData) =>
              lineData.x === format(transaction.date, "MMM-dd")
                ? {
                    ...lineData,
                    y:
                      lineData.y +
                      (transaction.totalPrices - transaction.totalCosts),
                  }
                : lineData
            );

            var refunds = 0;

            transaction.items.map((transact) => {
              //CHECK IF THE ITEM IS REFUNDED
              if (transact.status === "Refunded") {
                refunds += Number(transact.prices) * Number(transact.quantity);
              }
              return refunds;
            });

            //NET Revenue
            lineChartData[1].data = lineChartData[1].data.map((lineData) =>
              lineData.x === format(transaction.date, "MMM-dd")
                ? {
                    ...lineData,
                    y:
                      lineData.y +
                      (transaction.totalPrices -
                        (transaction.discountAmount + refunds)),
                  }
                : lineData
            );
          } else {
            // If item doesn't exist, create a new object

            //GROSS PROFITS
            lineChartData[0].data.push({
              x: format(transaction.date, "MMM-dd"),
              y: transaction.totalPrices - transaction.totalCosts,
            });

            var refunds = 0;

            transaction.items.map((transact) => {
              //CHECK IF THE ITEM IS REFUNDED
              if (transact.status === "Refunded") {
                refunds += Number(transact.prices) * Number(transact.quantity);
              }
              return refunds;
            });

            //NET REVENUE
            lineChartData[1].data.push({
              x: format(transaction.date, "MMM-dd"),
              y:
                transaction.totalPrices -
                (transaction.discountAmount + refunds),
            });
          }
        }
      });

      // Move to the next day
      currentDate.setDate(currentDate.getDate() + 1);
    }

    recentTransactions.sort((a, b) => b.date.localeCompare(a.date));
    recentTransactions = recentTransactions.slice(0, 10);
    const sortedPopularItems = popularItems?.sort((a, b) => b.value - a.value);

    return {
      netProfit,
      amountCharged,
      totalCost,
      totalTransaction,
      totalItems,
      amountDiscounted,
      recentTransactions,
      categoryCounts,
      popularItems: sortedPopularItems.slice(0, 5),
      lineChartData,
      refundedAmount,
      refundedItems,
    };
  };

  const createBarChartData = () => {
    if (data.categoryCounts && categoryList.length > 0) {
      const keys = [];
      const values = [];
      categoryList.forEach((category) => {
        const count = data.categoryCounts[category.category] || 0;
        keys.push(category.category);
        values.push(count);
      });
      return { keys, values };
    }
    return { keys: [], values: [] };
  };

  const { keys: barChartKeys, values: barChartValues } = createBarChartData();

  return (
    <>
      {isLoading ? (
        <DashboardSkeleton />
      ) : (
        <Box p={3} pt={0}>
          {/* header section */}
          <Box
            width={"100%"}
            backgroundColor={"#fff"}
            px={3}
            py={2}
            mb={2}
            display={"flex"}
            justifyContent={"space-between"}
            borderRadius={2}
            boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px;"}
          >
            <Typography variant="h3">Reports</Typography>
            <Box>
              {openDate ? (
                <Box>
                  <Box display={"flex"} justifyContent={"end"}>
                    <IconButton onClick={() => setOpenDate(false)}>
                      <CancelIcon color="error" />
                    </IconButton>
                  </Box>
                  <DateRangePicker
                    onChange={handleDateSelection}
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
                    value={format(dateRange[0].startDate, "MMM dd, yyyy")}
                    variant="filled"
                    sx={{ mx: 1 }}
                  />
                  <TextField
                    onClick={() => setOpenDate(true)}
                    label="To Date"
                    type="text"
                    value={format(dateRange[0].endDate, "MMM dd, yyyy")}
                    variant="filled"
                    sx={{ mx: 1 }}
                  />
                </>
              )}
            </Box>
          </Box>

          {/* statbox section */}
          <Grid container spacing={3} mb={3}>
            <Grid item xl={3} lg={4} md={6} xs={12}>
              <StatBox
                title={`₱ ${data?.amountCharged?.toFixed(2)}`}
                tooltip="Total Amount Charged"
                subtitle="Gross Sales"
                color="success"
                icon={
                  <LocalAtmIcon color="success" sx={{ fontSize: "40px" }} />
                }
              />
            </Grid>

            <Grid item xl={3} lg={4} md={6} xs={12}>
              <StatBox
                title={`₱ ${(
                  data?.amountCharged -
                  (data?.amountDiscounted +
                    data?.refundedAmount +
                    data?.totalCost)
                ).toFixed(2)}`}
                subtitle="Net Profit"
                tooltip="Difference between the Gross Sales and Total Expenses"
                color="primary"
                icon={
                  <MonetizationOnIcon
                    color="primary"
                    sx={{ fontSize: "40px" }}
                  />
                }
              />
            </Grid>
            <Grid item xl={3} lg={4} md={6} xs={12}>
              <StatBox
                title={`₱ ${data?.totalCost?.toFixed(2)}`}
                subtitle="Total Cost"
                color="warning"
                icon={
                  <RequestQuoteIcon color="warning" sx={{ fontSize: "40px" }} />
                }
              />
            </Grid>
            <Grid item xl={3} lg={4} md={6} xs={12}>
              <StatBox
                title={data.totalTransaction}
                subtitle="Total Transaction"
                color="orange"
                icon={
                  <PointOfSaleIcon color="orange" sx={{ fontSize: "40px" }} />
                }
              />
            </Grid>
            <Grid item xl={3} lg={4} md={6} xs={12}>
              <StatBox
                title={data.totalItems}
                subtitle="No. of Items"
                color="secondary"
                icon={
                  <FastfoodIcon color="secondary" sx={{ fontSize: "40px" }} />
                }
              />
            </Grid>
            <Grid item xl={3} lg={4} md={6} xs={12}>
              <StatBox
                title={`₱ ${data?.amountDiscounted?.toFixed(2)}`}
                subtitle="Amount Discounted"
                color="error"
                icon={<DiscountIcon color="error" sx={{ fontSize: "40px" }} />}
              />
            </Grid>
            <Grid item xl={3} lg={4} md={6} xs={12}>
              <StatBox
                title={data.refundedItems}
                subtitle="Refunded Items"
                color="secondary"
                icon={<NoFoodIcon color="orange" sx={{ fontSize: "40px" }} />}
              />
            </Grid>
            <Grid item xl={3} lg={4} md={6} xs={12}>
              <StatBox
                title={`₱ ${data.refundedAmount}`}
                subtitle="Refunded Amount"
                color="error"
                icon={<MoneyOffIcon color="error" sx={{ fontSize: "40px" }} />}
              />
            </Grid>
          </Grid>

          {/* line graph and recent transactions */}
          <Grid container spacing={3} mb={3}>
            {/* Line Chart */}
            <Grid item lg={8} md={12}>
              <Box
                gridColumn="span 8"
                gridRow="span 2"
                backgroundColor={"#fff"}
                padding={2}
                borderRadius={2}
                boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px;"}
              >
                <Box
                  mt="25px"
                  p="0 30px"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box>
                    <Typography variant="h5" fontWeight="600">
                      Gross Profit{" "}
                      <Tooltip
                        TransitionComponent={Zoom}
                        title={
                          "Difference between the Gross Sales and Total Cost"
                        }
                        arrow
                      >
                        <IconButton>
                          <ContactSupportIcon color="gray" />
                        </IconButton>
                      </Tooltip>
                    </Typography>
                    <Typography
                      variant="h3"
                      fontWeight="bold"
                      color={"primary"}
                    >
                      ₱ {(data?.amountCharged - data?.totalCost).toFixed(2)}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="h5" fontWeight="600">
                      Net Revenue{" "}
                      <Tooltip
                        TransitionComponent={Zoom}
                        title={
                          "Difference between the Gross Sales and Sum of Refunds and Discount"
                        }
                        arrow
                      >
                        <IconButton>
                          <ContactSupportIcon color="gray" />
                        </IconButton>
                      </Tooltip>
                    </Typography>
                    <Typography
                      variant="h3"
                      fontWeight="bold"
                      color={"primary"}
                    >
                      ₱{" "}
                      {(
                        data?.amountCharged -
                        (data?.amountDiscounted + data?.refundedAmount)
                      ).toFixed(2)}
                    </Typography>
                  </Box>
                </Box>
                <Box height="400px" m="-20px 0 0 0">
                  <LineChart
                    isDashboard={true}
                    data={data?.lineChartData || []}
                  />
                </Box>
              </Box>
            </Grid>

            {/* Recent Transactions */}
            <Grid item lg={4} md={12}>
              <Box
                gridColumn="span 4"
                gridRow="span 2"
                backgroundColor={"#fff"}
                overflow="auto"
                padding={2}
                pt={0}
                borderRadius={2}
                boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px;"}
                maxHeight={"500px"}
              >
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  borderBottom={`2px solid #333`}
                  p="15px"
                >
                  <Typography variant="h5" fontWeight="600">
                    Recent Transactions
                  </Typography>
                </Box>
                {data?.recentTransactions?.map((transaction) => (
                  <Box
                    key={transaction.id}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    borderBottom="1px solid"
                    p="15px"
                  >
                    <Box>
                      <Typography
                        color={
                          transaction?.customerDetails?.customerName
                            ? "primary"
                            : "gray"
                        }
                        variant="h5"
                        fontWeight="600"
                      >
                        {transaction?.customerDetails?.customerName ||
                          "No Customer Details"}
                      </Typography>
                      <Typography>
                        {transaction.modeOfPayment} |{" "}
                        <Capsule
                          bgcolor={"blue"}
                          label={transaction.transactionNumber}
                        />
                      </Typography>
                    </Box>
                    <Box>
                      {format(transaction.date, "MMM dd, yyyy hh:ii aa")}
                    </Box>
                    <Box
                      backgroundColor={colors["primaryMain"]}
                      color={"#fff"}
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

          {/* pie chart and bar graph */}
          <Grid container spacing={3} mb={3}>
            {/* Pie Chart */}
            <Grid item lg={7} md={12}>
              <Box
                gridColumn="span 4"
                gridRow="span 2"
                backgroundColor={"#fff"}
                padding={2}
                borderRadius={2}
                boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px;"}
              >
                <Typography variant="h5" fontWeight="600">
                  Most Popular Items
                </Typography>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  mt="25px"
                >
                  <PieChart
                    series={[
                      {
                        data: data?.popularItems || [],
                        highlightScope: {
                          faded: "global",
                          highlighted: "item",
                        },
                        faded: {
                          innerRadius: 30,
                          additionalRadius: -30,
                          color: "gray",
                        },
                        innerRadius: 30,
                        outerRadius: 139,
                        paddingAngle: 3,
                        cornerRadius: 2,
                        startAngle: -180,
                        endAngle: 180,
                        cx: 150,
                        cy: 150,
                      },
                    ]}
                    width={600}
                    height={400}
                  />
                </Box>
              </Box>
            </Grid>
            {/* bar chart */}
            <Grid item lg={5} md={12}>
              <Box
                gridColumn="span 8"
                gridRow="span 2"
                backgroundColor={"#fff"}
                padding={2}
                borderRadius={2}
                boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px;"}
              >
                <Typography
                  variant="h5"
                  fontWeight="600"
                  sx={{ padding: "30px 30px 0 30px", mb: 2 }}
                >
                  Most Popular Category
                </Typography>
                <Box>
                  <BarChart
                    series={[{ data: barChartValues }]}
                    height={400}
                    xAxis={[
                      {
                        data: barChartKeys,
                        scaleType: "band",
                      },
                    ]}
                    margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
};

export default Reports;
