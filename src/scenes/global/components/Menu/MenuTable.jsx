import {
  Box,
  CardMedia,
  FormControl,
  IconButton,
  TextField,
  Tooltip,
  Typography,
  Zoom,
} from "@mui/material";
import "firebase/storage";
import React, { useRef, useState } from "react";
import no_data from "../../../../assets/images/no_data.png";
import DataTableSkeleton from "../../../../ui-component/cards/Skeleton/DataTableSkeleton";
import Table from "../../../../ui-component/datatable/Table";

//MUI Icons
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";

import Swal from "sweetalert2";
import { deleteData } from "../../../../features/deleteData";
import Notification from "../../../../services/Notification";
import ModalWrapper from "../../../../ui-component/ModalWrapper";

import nofoodimage from "../../../../assets/images/nofoodimage.png";
import { updateImage } from "../../../../features/updateImage";

const MenuTable = ({
  data,
  isLoadingTable,
  isSoloMenu,
  fetchNeededData,
  setFormData,
  setIsOption,
  setOptionCount,
  setFormMode,
  inclusionOptions,
  setSelectedInclusions,
}) => {
  const fileInputRef = useRef(null);
  const [imageModal, setImageModal] = useState(false);
  const [clickedItem, setClickedItem] = useState([]);
  const [tempImage, setTempImage] = useState();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setTempImage(file);
    }
  };

  const handleImageClick = () => {
    const fileInput = document.getElementById("fileInput");
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleDelete = (item) => {
    Swal.fire({
      icon: "warning",
      title: "Are you sure you want to delete this item?",
      html: `This action cannot be undone once completed. 
            ${
              item?.mealsAffected?.length > 0
                ? `</br> Also, there is/are meal/s that are detected connected to this item. Deleting this item will also delete detected meals.</br> </br> 
                <b> Detected Meals: </b></br> <b>${item.mealsAffected
                  .map((meal) => meal.name)
                  .join(", </br>")}</b>`
                : ""
            }`,

      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      reverseButtons: true,
      focusCancel: true,
      customClass: {
        container: "my-swal-container",
        popup: "my-swal-popup",
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
              ? "Successfully deleted the data!"
              : "Something went wrong.",
            type: result ? "success" : "error",
            autoClose: 3000,
            theme: "colored",
          });

          setTimeout(() => {
            fetchNeededData();
          }, 500);
        } catch (error) {
          Notification.notif({
            message: error,
            type: "error",
            autoClose: 3000,
            theme: "colored",
          });
        }
      }
    });
  };

  const handleEdit = (data) => {
    setFormMode("Edit");
    if (data.options) {
      setIsOption(true);
      setOptionCount(data.options.length);
    } else {
      setIsOption(false);
      setOptionCount(0);
    }

    if (data.inclusions) {
      const newSelectedItems = inclusionOptions.filter((inclusion) =>
        data.inclusions.some((included) => inclusion.id === included)
      );

      setSelectedInclusions(newSelectedItems);
    }

    setFormData({
      name: data.name,
      category: data.category,
      options: data.options,
      prices: data.prices,
      costs: data.costs,
      inclusions: [],
      stocks: data.stocks,
      image: data.image,
      id: data.id,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { id, imageUrl, mealsAffected, ...restData } = clickedItem;
    const dbtable = isSoloMenu ? `menu/foods/${id}` : `menu/meals/${id}`;
    updateImage({ ...restData, image: tempImage }, dbtable, "menuImages").then(
      (result) => {
        Notification.notif({
          message: result
            ? `Successfully Updated the data!`
            : "Something went wrong.",
          type: result ? "success" : "error",
          autoClose: 3000,
          theme: "colored",
        });
        setTimeout(() => {
          fetchNeededData();
        }, 500);

        setImageModal(false);
        setClickedItem([]);
        setTempImage();
      }
    );
  };

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
            <Box sx={{ display: "flex", flexDirection: "column" }}>
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
      name: "Cost",
      selector: (row) => row.costs,
      sortable: true,
      cell: (row) => {
        // Check if arrayValue is an array
        if (Array.isArray(row.costs)) {
          return (
            <Box sx={{ display: "flex", flexDirection: "column" }}>
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
      name: "Stocks",
      selector: (row) => row.stocks,
      sortable: true,
    },
    {
      name: "Actions",
      excluded: true,
      cell: (row) => (
        <>
          <Tooltip TransitionComponent={Zoom} title="Edit Data" arrow>
            <IconButton onClick={() => handleEdit(row)}>
              <EditIcon color="primary" />
            </IconButton>
          </Tooltip>

          <Tooltip TransitionComponent={Zoom} title="View/Edit Image" arrow>
            <IconButton
              onClick={() => {
                setClickedItem(row);
                setImageModal(true);
              }}
            >
              <InsertPhotoIcon color="success" />
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

  return (
    <>
      {isLoadingTable ? (
        <DataTableSkeleton />
      ) : (
        <>
          {data.length === 0 ? (
            <Box
              width={"100%"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <img src={no_data} alt="" width={"80%"} />
            </Box>
          ) : (
            <>
              <Table columns={columns} title={"Menu List"} data={data} />
              <ModalWrapper
                open={imageModal}
                handleClose={() => {
                  setImageModal(false);
                  setClickedItem([]);
                  setTempImage();
                }}
                title="View Image"
                handleSubmit={handleSubmit}
              >
                <Typography variant="h3" mb={3} textAlign={"center"}>
                  {clickedItem?.name}
                </Typography>
                <CardMedia
                  component="img"
                  width="100%"
                  image={
                    tempImage
                      ? URL?.createObjectURL(tempImage)
                      : clickedItem?.imageUrl || nofoodimage
                  }
                  alt="Food"
                  sx={{
                    cursor: "pointer",
                    border: "3px solid #333",
                    borderRadius: 2,
                  }}
                  onClick={handleImageClick}
                />
                <Typography
                  variant="h3"
                  my={3}
                  mt={5}
                  textAlign={"center"}
                  sx={{ color: "gray" }}
                >
                  <i>Click the image to edit</i>
                </Typography>

                <Typography variant="small" sx={{ color: "gray", mt: 5 }}>
                  <i>
                    Click submit button without selecting image to remove the
                    image of menu
                  </i>
                </Typography>

                <FormControl fullWidth sx={{ mb: 1 }}>
                  <TextField
                    ref={fileInputRef}
                    variant="outlined"
                    type="file"
                    id="fileInput"
                    name="image"
                    sx={{ display: "none" }}
                    inputProps={{
                      accept: "image/*", // Accept only image files
                    }}
                    onChange={handleFileChange}
                  />
                </FormControl>
              </ModalWrapper>
            </>
          )}
        </>
      )}
    </>
  );
};

export default MenuTable;
