import {
  Autocomplete,
  Box,
  Checkbox,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
//MUI Icons
import SearchIcon from '@mui/icons-material/Search';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

import { useState } from 'react';

const DataTableSubHeader = (props) => {
  const {
    hasDate,
    columns,
    selectedDateColumn,
    setSelectedDateColumn,
    searchText,
    setSearchText,
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    filterList,
    selectedFilter,
    setSelectedFilter,
  } = props;

  const [prevLength, setprevLength] = useState(0);
  const [prevPurposes, setPrevPurposes] = useState([]);

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  const handleSelection = (event, selectedOptions) => {
    var value = [...selectedFilter];
    const selectedColumn = event.target.attributes['name']?.value || '';
    const selectedPurposes = selectedOptions.map((option) => option.label);
    if (selectedOptions.length > 0) {
      if (prevLength > selectedOptions.length) {
        let missingValue;

        for (const value of prevPurposes) {
          if (!selectedPurposes.includes(value)) {
            missingValue = value;
            break;
          }
        }

        value = value.map((obj) => ({
          ...obj,
          selectedPurposes: obj.selectedPurposes.filter(
            (item) => item !== missingValue
          ),
        }));

        // value = value.filter((obj) => {
        //   const updatedSelectedPurposes = obj.selectedPurposes.filter(
        //     (item) => item !== missingValue
        //   );
        //   return updatedSelectedPurposes.length > 0;
        // });

        setprevLength(selectedOptions.length);
      } else {
        // Check if an object with the same column exists
        const existingObjectIndex = value.findIndex(
          (obj) => obj.column === selectedColumn
        );

        if (existingObjectIndex === -1) {
          if (value.length > 0) {
            value.push({
              column: selectedColumn,
              selectedPurposes: [selectedPurposes[selectedPurposes.length - 1]],
            });
          } else {
            value.push({ column: selectedColumn, selectedPurposes });
          }
        } else {
          // Update existing object's selectedPurposes
          value[existingObjectIndex].selectedPurposes.push(
            selectedPurposes[selectedPurposes.length - 1]
          );
        }
      }
    } else {
      value = [];
    }

    setPrevPurposes(selectedPurposes);
    setprevLength(selectedOptions.length);
    setSelectedFilter(value);
  };

  const options = filterList.map((option) => ({
    name: option.name,
    ...option,
  }));

  // const names = [...new Set(options.map((option) => option.name))];
  return (
    <Box sx={{ marginBlock: 1, width: '100%' }}>
      <Grid container spacing={1} direction={'row'} justifyContent={'end'}>
        {hasDate && (
          <>
            <Grid item lg={3} md={4} sm={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel htmlFor="date">Date Column</InputLabel>
                <Select
                  id="date"
                  name="date"
                  label="Date Column"
                  value={selectedDateColumn}
                  onChange={(e) => {
                    setSelectedDateColumn(e.target.value);

                    if (!e.target.value) {
                      setFromDate(null);
                      setToDate(null);
                    }
                  }}
                  sx={{ marginInline: '0.5rem' }}
                >
                  <MenuItem value={''}>Choose date column...</MenuItem>
                  {columns
                    .filter((column) => column.isDate)
                    .map((column) => {
                      var string = `${column.selector}`;
                      var value = string.split('.')[1].trim();
                      return (
                        <MenuItem key={column.selector} value={value}>
                          {column.name}
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item lg={3} md={4} sm={6} xs={12}>
              <FormControl fullWidth>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    disabled={selectedDateColumn ? false : true}
                    sx={{ marginInline: '0.5rem' }}
                    label="From Date"
                    value={fromDate}
                    onChange={(date) => {
                      setFromDate(date);
                    }}
                    textField={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </FormControl>
            </Grid>
            <Grid item lg={3} md={4} sm={6} xs={12}>
              <FormControl fullWidth>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    disabled={fromDate && selectedDateColumn ? false : true}
                    sx={{ marginInline: '0.5rem' }}
                    label="To Date"
                    value={toDate}
                    onChange={(date) => {
                      setToDate(date);
                    }}
                    textField={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </FormControl>
            </Grid>
          </>
        )}
      </Grid>
      <Grid
        sx={{ marginBlock: 1 }}
        container
        spacing={1}
        direction={'row'}
        justifyContent={'end'}
      >
        {filterList.length > 0 && (
          <Grid item lg={6} md={4} sm={6} xs={12}>
            <Autocomplete
              multiple
              id="filterSelect"
              name="filterSelect"
              options={options}
              className="autocomplete-parent"
              disableCloseOnSelect
              disablePortal
              sx={{ mb: 2 }}
              groupBy={(option) => option.name}
              getOptionLabel={(option) => option.label}
              // renderGroup={(params) => (
              //   <GroupHeader>{params.group}</GroupHeader>
              // )}
              renderOption={(props, option, { selected }) => (
                <li
                  name={option.column}
                  {...props}
                  style={{
                    backgroundColor: selected ? '#b9e0ff75' : '#fff',
                  }}
                  onMouseEnter={(e) => {
                    if (!selected) {
                      e.target.style.background = '#b9e0ff75';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!selected) {
                      e.target.style.background = '#fff';
                    }
                  }}
                >
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option.label}
                </li>
              )}
              renderInput={(params) => {
                return (
                  <TextField
                    {...params}
                    label={'Filter'}
                    placeholder={'Filter'}
                    required={selectedFilter.length > 0 ? false : true}
                  />
                );
              }}
              onChange={handleSelection}
              value={
                options &&
                options.filter((option) =>
                  selectedFilter.some((filter) =>
                    filter.selectedPurposes.includes(option.label)
                  )
                )
              }
            />
          </Grid>
        )}

        <Grid item lg={3} md={4} sm={6} xs={12}>
          <FormControl fullWidth>
            <TextField
              type="search"
              placeholder="Search..."
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DataTableSubHeader;
