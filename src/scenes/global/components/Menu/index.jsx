import React from "react";
import MainCard from "../../../../ui-component/cards/MainCard";
import Table from "../../../../ui-component/datatable/Table";
import { useState } from "react";
import { foods } from "../../../../data/foodData";
import {
  Button,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

const Menu = () => {
  const [data, setData] = useState(foods);

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: false,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
  ];

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <MainCard>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h3">Add New Menu </Typography>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <form>
                      <Typography variant="h4" sx={{ mb: 2 }}>
                        Menu Information
                      </Typography>
                      <FormControl fullWidth sx={{ mb: 1 }}>
                        <TextField
                          variant="outlined"
                          label="Name"
                          type="search"
                          name="name"
                          required
                        />
                      </FormControl>
                      <FormControl fullWidth sx={{ mb: 1 }}>
                        <TextField
                          variant="outlined"
                          label="Category"
                          type="search"
                          name="category"
                          required
                        />
                      </FormControl>
                      <FormControl fullWidth sx={{ mb: 1 }}>
                        <TextField
                          variant="outlined"
                          label="Price"
                          type="number"
                          name="category"
                          required
                        />
                      </FormControl>
                      <FormControl fullWidth sx={{ mb: 1 }}>
                        <TextField
                          variant="outlined"
                          label="Cost"
                          type="number"
                          name="category"
                          required
                        />
                      </FormControl>
                      <FormControl fullWidth sx={{ mb: 1 }}>
                        <TextField
                          variant="outlined"
                          label="Stocks"
                          type="number"
                          name="category"
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
                          color="primary"
                          type="submit"
                          sx={{ mx: 1 }}
                        >
                          Add Office
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
          <Table columns={columns} title={"title"} data={data} />;
        </Grid>
      </Grid>
    </>
  );
};

export default Menu;
