import React, { useState } from "react";
import MainCard from "../../../../ui-component/cards/MainCard";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { saveData } from "../../../../features/saveData";
import CancelIcon from "@mui/icons-material/Cancel";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const MenuForm = ({ data, setData, categoriesOption, setCategoriesOption }) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    options: [],
    prices: [],
    costs: [],
    stocks: "",
    image: null,
  });
  const [isOption, setIsOption] = useState(false);
  const [optionCount, setOptionCount] = useState(1);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: name === "image" ? event.target.files[0] : value,
    }));
  };

  const handleOptionChange = (index, field, value) => {
    const updatedData = { ...formData };
    updatedData[field][index] = value;
    setFormData(updatedData);
  };

  const handleRemoveOption = (index) => {
    const updatedOptions = [...formData.options];
    updatedOptions.splice(index, 1);
    const updatedPrices = [...formData.prices];
    updatedPrices.splice(index, 1);
    const updatedCosts = [...formData.costs];
    updatedCosts.splice(index, 1);

    setFormData({
      ...formData,
      options: updatedOptions,
      prices: updatedPrices,
      costs: updatedCosts,
    });

    if (optionCount !== 1) {
      setOptionCount(optionCount - 1);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // For example, you can add the new menu item to the data state
    const newData = [...data, formData];
    setData(newData);
    // Reset the form after submission
    setFormData({
      name: "",
      category: "",
      options: [],
      prices: [],
      costs: [],
      stocks: "",
      image: null,
    });

    //TODO: Saving the data of formData to the database
    //Third argument is a table for the image if function detects that it has an object of image
    saveData(formData, "menu/foods", "menuImages");
  };

  return (
    <MainCard>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h3">Add New Menu </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <form onSubmit={handleSubmit}>
                <Typography variant="h4" sx={{ mb: 2 }}>
                  Menu Information
                </Typography>
                <FormControl fullWidth sx={{ mb: 1 }}>
                  <TextField
                    variant="outlined"
                    label="Name"
                    type="search"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </FormControl>
                <FormControl fullWidth sx={{ mb: 1 }}>
                  <InputLabel id="demo-simple-select-label">
                    Category
                  </InputLabel>
                  <Select
                    id="category"
                    name="category"
                    value={formData.category}
                    label="Category"
                    onChange={handleChange}
                  >
                    {categoriesOption.map((option, index) => {
                      return (
                        <MenuItem key={index} value={option.category}>
                          {option.category}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
                <Grid container spacing={3}>
                  <Grid item xs={10}>
                    <FormControlLabel
                      control={
                        <Checkbox onClick={() => setIsOption(!isOption)} />
                      }
                      label="Options?"
                    />
                  </Grid>
                  {isOption && (
                    <Grid item xs={2}>
                      <IconButton
                        onClick={() => setOptionCount(optionCount + 1)}
                      >
                        <AddCircleOutlineIcon color="success" />
                      </IconButton>
                    </Grid>
                  )}
                </Grid>

                {!isOption && (
                  <>
                    <FormControl fullWidth sx={{ mb: 1 }}>
                      <TextField
                        variant="outlined"
                        label="Price"
                        type="number"
                        name="prices"
                        value={formData.prices}
                        onChange={handleChange}
                        required
                      />
                    </FormControl>
                    <FormControl fullWidth sx={{ mb: 1 }}>
                      <TextField
                        variant="outlined"
                        label="Cost"
                        type="number"
                        name="costs"
                        value={formData.costs}
                        onChange={handleChange}
                        required
                      />
                    </FormControl>
                  </>
                )}

                {isOption &&
                  [...Array(optionCount)].map((_, index) => (
                    <Grid container spacing={3} key={index}>
                      <Grid item xs={10}>
                        <Grid container spacing={3}>
                          <Grid item xs={4}>
                            <FormControl fullWidth sx={{ mb: 1 }}>
                              <TextField
                                variant="outlined"
                                label="Option"
                                type="text"
                                name={`option${index}`}
                                value={formData.options[index] || ""}
                                onChange={(event) =>
                                  handleOptionChange(
                                    index,
                                    "options",
                                    event.target.value
                                  )
                                }
                                required
                              />
                            </FormControl>
                          </Grid>
                          <Grid item xs={4}>
                            <FormControl fullWidth sx={{ mb: 1 }}>
                              <TextField
                                variant="outlined"
                                label="Price"
                                type="number"
                                name={`price${index}`}
                                value={formData.prices[index] || ""}
                                onChange={(event) =>
                                  handleOptionChange(
                                    index,
                                    "prices",
                                    event.target.value
                                  )
                                }
                                required
                              />
                            </FormControl>
                          </Grid>
                          <Grid item xs={4}>
                            <FormControl fullWidth sx={{ mb: 1 }}>
                              <TextField
                                variant="outlined"
                                label="Cost"
                                type="number"
                                name={`cost${index}`}
                                value={formData.costs[index] || ""}
                                onChange={(event) =>
                                  handleOptionChange(
                                    index,
                                    "costs",
                                    event.target.value
                                  )
                                }
                                required
                              />
                            </FormControl>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={2}>
                        <IconButton onClick={() => handleRemoveOption(index)}>
                          <CancelIcon color="secondary" />
                        </IconButton>
                      </Grid>
                    </Grid>
                  ))}

                <FormControl fullWidth sx={{ mb: 1 }}>
                  <TextField
                    variant="outlined"
                    label="Stocks"
                    type="number"
                    name="stocks"
                    value={formData.stocks}
                    onChange={handleChange}
                    required
                  />
                </FormControl>
                <Typography variant="h4" sx={{ mb: 1 }}>
                  Upload an Image{" "}
                </Typography>
                <FormControl fullWidth sx={{ mb: 1 }}>
                  <TextField
                    variant="outlined"
                    type="file"
                    name="image"
                    onChange={handleChange}
                    required
                    inputProps={{
                      accept: "image/*", // Accept only image files
                    }}
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
                    Add Menu
                  </Button>
                </Grid>
              </form>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default MenuForm;
