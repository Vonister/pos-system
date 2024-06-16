import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import {
  Autocomplete,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useRef } from "react";
import { saveData } from "../../../../features/saveData";
import { updateData } from "../../../../features/updateData";
import Notification from "../../../../services/Notification";
import MainCard from "../../../../ui-component/cards/MainCard";
import DataTableSkeleton from "../../../../ui-component/cards/Skeleton/DataTableSkeleton";
import { AntSwitch } from "../../../../ui-component/StyledSwitch";

const MenuForm = ({
  categoriesOption,
  fetchNeededData,
  isSoloMenu,
  setIsSoloMenu,
  isLoadingTable,
  setIsLoadingTable,
  inclusionOptions,
  formData,
  setFormData,
  isOption,
  setIsOption,
  optionCount,
  setOptionCount,
  formMode,
  setFormMode,
  selectedInclusions,
  setSelectedInclusions,
}) => {
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  const fileInputRef = useRef(null);

  const handleSelection = (event, selectedOptions) => {
    const selected = selectedOptions.map((option) => option);
    setSelectedInclusions(selected);
  };

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

    try {
      var result;

      if (formMode === "Add") {
        //TODO: Saving the data of formData to the database
        //Third argument is a table for the image if function detects that it has an object of image
        const dbTable = isSoloMenu ? "menu/foods" : "menu/meals";
        const inclusionId = selectedInclusions.map((item) => item.id);
        const newFormdata = isSoloMenu
          ? formData
          : { ...formData, inclusions: inclusionId };

        var result = saveData(newFormdata, dbTable, "menuImages");
      } else {
        const { id, inclusions, options, ...restData } = formData;
        const inclusionId = selectedInclusions.map((item) => item.id);
        var dbtable = isSoloMenu ? `menu/foods/${id}` : `menu/meals/${id}`;
        var data = isSoloMenu
          ? { ...restData, ...(options && { options }) }
          : {
              ...restData,
              inclusions: inclusionId,
              ...(options && { options }),
            };
        var result = updateData(data, dbtable);
      }

      setTimeout(() => {
        fetchNeededData();
      }, 500);
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
        name: "",
        category: "",
        options: [],
        prices: [],
        costs: [],
        inclusions: [],
        stocks: "",
        image: null,
      });
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setIsOption(false);
      setOptionCount(1);
      setSelectedInclusions([]);
    } catch (error) {
      Notification.notif({
        message: error,
        type: "error",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

  return (
    <>
      {isLoadingTable ? (
        <DataTableSkeleton />
      ) : (
        <MainCard>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h3">
                {formMode === "Add" ? "Add New" : "Edit Existing"} Menu{" "}
              </Typography>
            </Grid>
            {formMode !== "Add" && (
              <Grid item xs={12}>
                <Button
                  onClick={() => {
                    setFormMode("Add");
                    setFormData({
                      name: "",
                      category: "",
                      options: [],
                      prices: [],
                      costs: [],
                      inclusions: [],
                      stocks: "",
                      image: null,
                    });
                  }}
                  variant="contained"
                >
                  Add New Data +
                </Button>
              </Grid>
            )}
            <Grid item xs={12}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography>Meal</Typography>
                <AntSwitch
                  onClick={() => {
                    setIsSoloMenu(!isSoloMenu);
                    setIsLoadingTable(!isLoadingTable);
                  }}
                  checked={isSoloMenu}
                  inputProps={{ "aria-label": "ant design" }}
                />
                <Typography>Solo</Typography>
              </Stack>
            </Grid>

            {/* IF SOLO MENU IS BEING MADE, THIS FIELD WILL SHOW */}
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

                    {!isSoloMenu && (
                      <Autocomplete
                        multiple
                        id="mealSelect"
                        name="mealSelect"
                        options={inclusionOptions ? inclusionOptions : []}
                        disableCloseOnSelect
                        disablePortal
                        sx={{ mb: 2 }}
                        groupBy={(option) => option.category}
                        getOptionLabel={(option) => option.name}
                        renderOption={(props, option, { selected }) => (
                          <li
                            {...props}
                            style={{
                              backgroundColor: selected ? "#b9e0ff75" : "#fff",
                            }}
                            onMouseEnter={(e) => {
                              if (!selected) {
                                e.target.style.background = "#b9e0ff75";
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (!selected) {
                                e.target.style.background = "#fff";
                              }
                            }}
                          >
                            <Checkbox
                              icon={icon}
                              checkedIcon={checkedIcon}
                              style={{ marginRight: 8 }}
                              checked={selected}
                            />
                            {option.name}
                          </li>
                        )}
                        renderInput={(params) => {
                          return (
                            <TextField
                              {...params}
                              label={"Select Inclusions"}
                              placeholder={"Select Inclusions"}
                              required={
                                selectedInclusions.length > 0 ? false : true
                              }
                            />
                          );
                        }}
                        onChange={handleSelection}
                        value={inclusionOptions?.filter((option) =>
                          selectedInclusions.some(
                            (filter) => filter.name === option.name
                          )
                        )}
                      />
                    )}

                    <Grid container spacing={3}>
                      <Grid item xs={10}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={isOption ? true : false}
                              onClick={() => setIsOption(!isOption)}
                            />
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
                            <IconButton
                              onClick={() => handleRemoveOption(index)}
                            >
                              <CancelIcon color="error" />
                            </IconButton>
                          </Grid>
                        </Grid>
                      ))}

                    {isSoloMenu && (
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
                    )}

                    {formMode === "Add" ? (
                      <>
                        <Typography variant="h4" sx={{ mb: 1 }}>
                          Upload an Image{" "}
                        </Typography>
                        <FormControl fullWidth sx={{ mb: 1 }}>
                          <TextField
                            inputRef={fileInputRef}
                            variant="outlined"
                            type="file"
                            name="image"
                            onChange={handleChange}
                            inputProps={{
                              accept: "image/*", // Accept only image files
                            }}
                          />
                        </FormControl>
                      </>
                    ) : (
                      ""
                    )}

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
                        {formMode === "Add" ? "Add Menu" : "Update Data"}
                      </Button>
                    </Grid>
                  </form>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </MainCard>
      )}
    </>
  );
};

export default MenuForm;
