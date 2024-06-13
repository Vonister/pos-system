import 'firebase/storage';
import React from 'react';
import Table from '../../../../ui-component/datatable/Table';
import { Box, Typography } from '@mui/material';

const MenuTable = ({ data }) => {
  const columns = [
    {
      name: 'Name',
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: 'Category',
      selector: (row) => row.category,
      sortable: true,
    },
    {
      name: 'Price',
      selector: (row) => row.prices,
      sortable: true,
      cell: (row) => {
        // Check if arrayValue is an array
        if (Array.isArray(row.prices)) {
          return (
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              {row.prices.map((price, index) => {
                return (
                  <Typography key={index}>
                    PHP {Number(price).toFixed(2)}
                  </Typography>
                );
              })}
            </Box>
          );
        } else {
          return <Typography>PHP {Number(row.prices).toFixed(2)}</Typography>;
        }
      },
    },
    {
      name: 'Cost',
      selector: (row) => row.costs,
      sortable: true,
      cell: (row) => {
        // Check if arrayValue is an array
        if (Array.isArray(row.costs)) {
          return (
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              {row.costs.map((cost, index) => {
                return (
                  <Typography key={index}>
                    PHP {Number(cost).toFixed(2)}
                  </Typography>
                );
              })}
            </Box>
          );
        } else {
          return <Typography>PHP {Number(row.costs).toFixed(2)}</Typography>;
        }
      },
    },
    {
      name: 'Stocks',
      selector: (row) => row.stocks,
      sortable: true,
    },
  ];

  return <Table columns={columns} title={'Menu List'} data={data} />;
};

export default MenuTable;
