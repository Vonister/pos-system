import { Box, IconButton, Tooltip, Typography, Zoom } from '@mui/material';
import 'firebase/storage';
import React, { useEffect, useState } from 'react';
import no_data from '../../../../assets/images/no_data.png';
import DataTableSkeleton from '../../../../ui-component/cards/Skeleton/DataTableSkeleton';
import Table from '../../../../ui-component/datatable/Table';

//MUI Icons
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Swal from 'sweetalert2';
import { deleteData } from '../../../../features/deleteData';
import Notification from '../../../../services/Notification';

const MenuTable = ({ data, isLoadingTable, isSoloMenu, fetchNeededData }) => {
  const handleDelete = (item) => {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure you want to delete this item?',
      html: `This action cannot be undone once completed. 
            ${
              item?.mealsAffected?.length > 0
                ? `</br> Also, there is/are meal/s that are detected connected to this item. Deleting this item will also delete detected meals.</br> </br> 
                <b> Detected Meals: </b></br> <b>${item.mealsAffected
                  .map((meal) => meal.name)
                  .join(', </br>')}</b>`
                : ''
            }`,

      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
      focusCancel: true,
      customClass: {
        container: 'my-swal-container',
        popup: 'my-swal-popup',
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          item?.mealsAffected?.forEach((meal) => {
            deleteData(`menu/meals/${meal.id}`);
          });
          const result = deleteData(
            isSoloMenu ? `menu/foods/${item.id}` : `menu/meals/${item.id}`
          );

          Notification.notif({
            message: result
              ? 'Successfully deleted the data!'
              : 'Something went wrong.',
            type: result ? 'success' : 'error',
            autoClose: 3000,
            theme: 'colored',
          });

          fetchNeededData();
        } catch (error) {
          Notification.notif({
            message: error,
            type: 'error',
            autoClose: 3000,
            theme: 'colored',
          });
        }
      }
    });
  };

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
    {
      name: 'Actions',
      excluded: true,
      cell: (row) => (
        <>
          <Tooltip TransitionComponent={Zoom} title="Edit Data" arrow>
            <IconButton>
              <EditIcon color="primary" />
            </IconButton>
          </Tooltip>
          <Tooltip TransitionComponent={Zoom} title="Delete Data" arrow>
            <IconButton onClick={() => handleDelete(row)}>
              <DeleteIcon color="error" />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  useEffect(() => {
    // if (!isLoadingTable) {
    //   if (isSoloMenu) {
    //   } else {
    //     setMenu(data);
    //   }
    // }
  }, [isLoadingTable, isSoloMenu]);

  return (
    <>
      {isLoadingTable ? (
        <DataTableSkeleton />
      ) : (
        <>
          {data.length === 0 ? (
            <Box
              width={'100%'}
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
            >
              <img src={no_data} alt="" width={'80%'} />
            </Box>
          ) : (
            <Table columns={columns} title={'Menu List'} data={data} />
          )}
        </>
      )}
    </>
  );
};

export default MenuTable;
