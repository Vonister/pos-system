import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Checkbox,
  FormControl,
  Grid,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  Tooltip,
  Typography,
  Zoom,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { fetchData } from "../../../../features/fetchData";
import Table from "../../../../ui-component/datatable/Table";

//MUI Icons
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ReplyAllIcon from "@mui/icons-material/ReplyAll";
import ModalWrapper from "../../../../ui-component/ModalWrapper";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import { format } from "date-fns";
import Capsule from "../../../../ui-component/capsule/Capsule";
import { updateData } from "../../../../features/updateData";
import Notification from "../../../../services/Notification";
import ModalNoForm from "../../../../ui-component/ModalNoForm";

const History = () => {
  const [data, setData] = useState([]);
  const [refundModal, setRefundModal] = useState(false);
  const [clickedItem, setClickedItem] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [reason, setReason] = useState("");
  const [viewModal, setViewModal] = useState(false);

  const fetchNeededData = () => {
    fetchData("transactions").then((data) => {
      const sortedData = data.sort((b, a) => a.date.localeCompare(b.date));
      setData(sortedData);
    });
  };

  const handleToggle = (value) => () => {
    const currentIndex = selectedItems.indexOf(value);
    const newChecked = [...selectedItems];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setSelectedItems(newChecked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    var isError = false;

    selectedItems.forEach((selected) => {
      const result = updateData(
        { ...clickedItem.items[selected], status: "Refunded", reason },
        `transactions/${clickedItem.id}/items/${selected}`
      );
      if (result === false) {
        isError = true;
      }
    });

    Notification.notif({
      message: !isError
        ? "Successfully refunded the transaction!"
        : "Something went wrong.",
      type: !isError ? "success" : "error",
      autoClose: 3000,
      theme: "colored",
    });

    setRefundModal(false);
  };

  useEffect(() => {
    fetchNeededData();
  }, []);

  const columns = [
    {
      name: "Transaction Number",
      selector: (row) => row.transactionNumber,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => format(row.date, "MMM dd, yyyy hh:ii aa"),
      sortable: true,
      isDate: true,
    },

    {
      name: "Net Profit",
      selector: (row) => `P ${row.netProfit.toFixed(2)}`,
      sortable: true,
    },
    {
      name: "Revenue",
      selector: (row) => `P ${row.totalPrices.toFixed(2)}`,
      sortable: true,
    },
    {
      name: "Cost",
      selector: (row) => `P ${row.totalCosts.toFixed(2)}`,
      sortable: true,
    },
    {
      name: "Mode of Payment",
      selector: (row) => row.modeOfPayment,
      sortable: true,
    },
    {
      name: "Actions",
      excluded: true,
      cell: (row) => (
        <>
          <Tooltip TransitionComponent={Zoom} title="Refund Transaction" arrow>
            <IconButton
              onClick={() => {
                setRefundModal(true);
                setClickedItem(row);
                setSelectedItems([]);
              }}
            >
              <ReplyAllIcon color="error" />
            </IconButton>
          </Tooltip>
          <Tooltip TransitionComponent={Zoom} title="View Data" arrow>
            <IconButton
              onClick={() => {
                setViewModal(true);
                setClickedItem(row);
              }}
            >
              <RemoveRedEyeIcon color="primary" />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Table columns={columns} title={"Transaction History"} data={data} />;
        </Grid>

        <ModalWrapper
          open={refundModal}
          handleClose={() => setRefundModal(false)}
          title="Refund Transaction"
          handleSubmit={handleSubmit}
          isButton={selectedItems.length > 0 ? true : false}
        >
          <Typography variant="h4" sx={{ mb: 2 }}>
            Reason of Refund
          </Typography>
          <FormControl fullWidth sx={{ mb: 1 }}>
            <TextField
              variant="outlined"
              label="Reason"
              type="search"
              name="category"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </FormControl>
          <Typography variant="h4" sx={{ my: 2 }}>
            Select Item/s to refund
          </Typography>
          {clickedItem?.items?.map((item, index) => {
            const labelId = `checkbox-list-label-${index}`;

            return (
              <ListItem
                key={item.id}
                secondaryAction={
                  item.status === "Refunded" ? (
                    <Capsule bgcolor={"red"} label={"Refunded"} />
                  ) : (
                    <Typography>P {item.prices}</Typography>
                  )
                }
                disablePadding
              >
                <ListItemButton
                  onClick={handleToggle(index)}
                  dense
                  disabled={item.status === "Refunded" ? true : false}
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={selectedItems.indexOf(index) !== -1}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ "aria-labelledby": labelId }}
                    />
                  </ListItemIcon>
                  <ListItemText id={labelId} primary={`${item.name}`} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </ModalWrapper>

        <ModalNoForm
          open={viewModal}
          handleClose={() => setViewModal(false)}
          title="Transaction Details"
        >
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            mb={1}
            pb={1}
            borderBottom={"1px solid lightgray"}
          >
            <Typography variant="h4">Transaction Number: </Typography>
            <Typography variant="h4" color={"primary"}>
              {clickedItem.transactionNumber}
            </Typography>
          </Box>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            mb={1}
            pb={1}
            borderBottom={"1px solid lightgray"}
          >
            <Typography variant="h4">Date: </Typography>
            <Typography variant="h4" color={"primary"}>
              {clickedItem.date}
            </Typography>
          </Box>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            mb={1}
            pb={1}
            borderBottom={"1px solid lightgray"}
          >
            <Typography variant="h4">Profit: </Typography>
            <Typography variant="h4" color={"primary"}>
              P {clickedItem.netProfit}
            </Typography>
          </Box>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            mb={1}
            pb={1}
            borderBottom={"1px solid lightgray"}
          >
            <Typography variant="h4">Revenue: </Typography>
            <Typography variant="h4" color={"primary"}>
              P {clickedItem.totalPrices}
            </Typography>
          </Box>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            mb={1}
            pb={1}
            borderBottom={"1px solid lightgray"}
          >
            <Typography variant="h4">Cost: </Typography>
            <Typography variant="h4" color={"primary"}>
              P {clickedItem.totalCosts}
            </Typography>
          </Box>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            mb={1}
            pb={1}
            borderBottom={"1px solid lightgray"}
          >
            <Typography variant="h4">Discount (%): </Typography>
            <Typography variant="h4" color={"primary"}>
              {clickedItem.discountPercent}%
            </Typography>
          </Box>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            mb={1}
            pb={1}
            borderBottom={"1px solid lightgray"}
          >
            <Typography variant="h4">Discounted Amount: </Typography>
            <Typography variant="h4" color={"primary"}>
              P {clickedItem.discountAmount}
            </Typography>
          </Box>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            mb={1}
            pb={1}
            borderBottom={"1px solid lightgray"}
          >
            <Typography variant="h4">Type: </Typography>
            <Typography variant="h4" color={"primary"}>
              {clickedItem.isDine}
            </Typography>
          </Box>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            mb={4}
            pb={1}
            borderBottom={"1px solid lightgray"}
          >
            <Typography variant="h4">Mode of Payment: </Typography>
            <Typography variant="h4" color={"primary"}>
              {clickedItem.modeOfPayment}
            </Typography>
          </Box>

          <Box
            display={"flex"}
            justifyContent={"space-between"}
            backgroundColor={"lightgray"}
            p={2}
            borderRadius={2}
          >
            <Typography variant="h3">Items: </Typography>
            <Typography variant="h4" color={"primary"}>
              {clickedItem.totalNumberItems}
            </Typography>
          </Box>
          {clickedItem?.items?.map((item, index) => {
            return (
              <Accordion key={index}>
                <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
                  <Typography variant="h4">{item.name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box
                    display={"flex"}
                    justifyContent={"space-between"}
                    mb={1}
                    pb={1}
                    borderBottom={"1px solid lightgray"}
                  >
                    <Typography variant="h5">Category: </Typography>
                    <Typography variant="h5" color={"primary"}>
                      {item.category}
                    </Typography>
                  </Box>
                  <Box
                    display={"flex"}
                    justifyContent={"space-between"}
                    mb={1}
                    pb={1}
                    borderBottom={"1px solid lightgray"}
                  >
                    <Typography variant="h5">Price: </Typography>
                    <Typography variant="h5" color={"primary"}>
                      {item.prices}
                    </Typography>
                  </Box>

                  <Box
                    display={"flex"}
                    justifyContent={"space-between"}
                    mb={1}
                    pb={1}
                    borderBottom={"1px solid lightgray"}
                  >
                    <Typography variant="h5">Cost: </Typography>
                    <Typography variant="h5" color={"primary"}>
                      {item.costs}
                    </Typography>
                  </Box>

                  <Box
                    display={"flex"}
                    justifyContent={"space-between"}
                    mb={1}
                    pb={1}
                    borderBottom={"1px solid lightgray"}
                  >
                    <Typography variant="h5">Quantity: </Typography>
                    <Typography variant="h5" color={"primary"}>
                      {item.quantity}
                    </Typography>
                  </Box>

                  <Box
                    display={"flex"}
                    justifyContent={"space-between"}
                    mb={1}
                    pb={1}
                    borderBottom={"1px solid lightgray"}
                  >
                    <Typography variant="h5">Size: </Typography>
                    <Typography variant="h5" color={"primary"}>
                      {item?.options || "No Size"}
                    </Typography>
                  </Box>

                  {item.status && (
                    <>
                      <Box
                        display={"flex"}
                        justifyContent={"space-between"}
                        mb={1}
                        pb={1}
                        borderBottom={"1px solid lightgray"}
                      >
                        <Typography variant="h5">Status: </Typography>
                        <Typography variant="h5" color={"primary"}>
                          {item?.status || ""}
                        </Typography>
                      </Box>

                      <Box
                        display={"flex"}
                        justifyContent={"space-between"}
                        mb={1}
                        pb={1}
                        borderBottom={"1px solid lightgray"}
                      >
                        <Typography variant="h5">Reason: </Typography>
                        <Typography variant="h5" color={"primary"}>
                          {item.reason}
                        </Typography>
                      </Box>
                    </>
                  )}
                </AccordionDetails>
              </Accordion>
            );
          })}
        </ModalNoForm>
      </Grid>
    </>
  );
};

export default History;
