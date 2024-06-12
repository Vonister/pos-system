import "firebase/storage";
import React from "react";
import Table from "../../../../ui-component/datatable/Table";
import { Typography } from "@mui/material";

const MenuTable = ({ data }) => {
  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Category",
      selector: (row) => row.category,
      sortable: true,
    },
    {
      name: "Price",
      selector: (row) => row.prices,
      sortable: true,
      cell: (row) => {
        // Check if arrayValue is an array
        if (Array.isArray(row.prices)) {
          return (
            <Typography sx={{ display: "flex", flexDirection: "column" }}>
              {row.prices.map((price) => {
                return <Typography>PHP {Number(price).toFixed(2)}</Typography>;
              })}
            </Typography>
          );
        } else {
          return <Typography>PHP {Number(row.prices).toFixed(2)}</Typography>;
        }
      },
    },
    {
      name: "Cost",
      selector: (row) => row.costs,
      sortable: true,
      cell: (row) => {
        // Check if arrayValue is an array
        if (Array.isArray(row.costs)) {
          return (
            <Typography sx={{ display: "flex", flexDirection: "column" }}>
              {row.costs.map((cost) => {
                return <Typography>PHP {Number(cost).toFixed(2)}</Typography>;
              })}
            </Typography>
          );
        } else {
          return <Typography>PHP {Number(row.costs).toFixed(2)}</Typography>;
        }
      },
    },
    {
      name: "Stocks",
      selector: (row) => row.stocks,
      sortable: true,
    },
  ];

  return <Table columns={columns} title={"Menu List"} data={data} />;
};

export default MenuTable;
