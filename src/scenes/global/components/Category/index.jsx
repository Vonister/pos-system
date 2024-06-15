import React, { useState } from "react";
import MainCard from "../../../../ui-component/cards/MainCard";
import Table from "../../../../ui-component/datatable/Table";
import {
  Button,
  FormControl,
  Grid,
  TextField,
  IconButton,
  Tooltip,
  Typography,
  Zoom,
} from "@mui/material";
import { saveData } from "../../../../features/saveData";
import { useEffect } from "react";
import { fetchData } from "../../../../features/fetchData";

//MUI Icons
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Swal from "sweetalert2";
import { deleteData } from "../../../../features/deleteData";
import Notification from "../../../../services/Notification";
import { update } from "firebase/database";
import { updateData } from "../../../../features/updateData";

const Category = () => {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    category: "",
  });
  const [formMode, setFormMode] = useState("Add");

  const fetchNeededData = () => {
    fetchData("categories").then((data) => {
      setData(data);
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleDelete = (item) => {
    Swal.fire({
      icon: "warning",
      title: "Are you sure you want to delete this item?",
      html: `This action cannot be undone once completed.`,
      showCancelButton: true,
      confirmButtonText: "Yes",
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
          const result = deleteData(`categories/${item.id}`);

          Notification.notif({
            message: result
              ? "Successfully deleted the data!"
              : "Something went wrong.",
            type: result ? "success" : "error",
            autoClose: 3000,
            theme: "colored",
          });

          fetchNeededData();
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

  const handleSubmit = (event) => {
    event.preventDefault();

    // For example, you can add the new menu item to the data state

    try {
      var result;

      if (formMode === "Add") {
        var result = saveData(formData, "categories");
      } else {
        const { id, ...restData } = formData;
        var result = updateData({ ...restData }, `categories/${id}`);
      }

      fetchNeededData();
      Notification.notif({
        message: result
          ? `Successfully ${
              formMode === "Add" ? `Added new ` : `Updated the `
            } data!`
          : "Something went wrong.",
        type: result ? "success" : "error",
        autoClose: 3000,
        theme: "colored",
      });

      // Reset the form after submission
      setFormData({
        category: "",
      });
    } catch (error) {
      Notification.notif({
        message: error,
        type: "error",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

  useEffect(() => {
    fetchNeededData();
  }, []);

  const columns = [
    {
      name: "Category",
      selector: (row) => row.category,
      sortable: true,
    },
    {
      name: "Actions",
      excluded: true,
      cell: (row) => (
        <>
          <Tooltip TransitionComponent={Zoom} title="Edit Data" arrow>
            <IconButton
              onClick={() => {
                setFormMode("Edit");
                setFormData({ category: row.category, id: row.id });
              }}
            >
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

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <MainCard>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h3">
                  {formMode === "Add"
                    ? "Add New Category"
                    : "Update Existing Data"}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={3}>
                  {formMode !== "Add" && (
                    <Grid item xs={12}>
                      <Button
                        onClick={() => setFormMode("Add")}
                        variant="contained"
                      >
                        Add New Data +
                      </Button>
                    </Grid>
                  )}

                  <Grid item xs={12}>
                    <form onSubmit={handleSubmit}>
                      <Typography variant="h4" sx={{ mb: 2 }}>
                        Category Information
                      </Typography>
                      <FormControl fullWidth sx={{ mb: 1 }}>
                        <TextField
                          variant="outlined"
                          label="Category"
                          type="search"
                          name="category"
                          value={formData.category}
                          onChange={handleChange}
                          required
                        />
                      </FormControl>

                      <Grid
                        item
                        xs={12}
                        sx={{ display: "flex", justifyContent: "end", mt: 5 }}
                      >
                        <Button
                          variant="contained"
                          color={formMode === "Add" ? "primary" : "success"}
                          type="submit"
                          sx={{ mx: 1 }}
                        >
                          {formMode === "Add" ? "Add New Data" : "Update Data"}
                        </Button>
                      </Grid>
                    </form>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </MainCard>
        </Grid>
        <Grid item xs={8}>
          <Table columns={columns} title={"Category List"} data={data} />;
        </Grid>
      </Grid>
    </>
  );
};

export default Category;
