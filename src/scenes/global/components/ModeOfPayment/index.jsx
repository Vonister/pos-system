import React, { useState } from 'react';
import MainCard from '../../../../ui-component/cards/MainCard';
import Table from '../../../../ui-component/datatable/Table';
import {
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { saveData } from '../../../../features/saveData';
import { useEffect } from 'react';
import { fetchData } from '../../../../features/fetchData';
import { Android12Switch } from '../../../../ui-component/StyledSwitch';

const ModeOfPayment = () => {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    category: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // For example, you can add the new menu item to the data state
    const newData = [...data, formData];
    setData(newData);
    // Reset the form after submission
    setFormData({
      category: '',
    });

    saveData(formData, 'categories');
  };

  useEffect(() => {
    fetchData('categories').then((data) => {
      setData(data);
    });
  }, []);

  const columns = [
    {
      name: 'Category',
      selector: (row) => row.category,
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
                <Typography variant="h3">Mode of Payment </Typography>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <form onSubmit={handleSubmit}>
                      <Typography variant="h4" sx={{ mb: 2 }}>
                        Available Mode of Payment
                      </Typography>
                      <FormControl fullWidth sx={{ mb: 1 }}>
                        <FormControlLabel
                          control={<Android12Switch defaultChecked />}
                          label="GCash"
                        />
                      </FormControl>
                      <FormControl fullWidth sx={{ mb: 1 }}>
                        <FormControlLabel
                          control={<Android12Switch defaultChecked />}
                          label="PayMaya"
                        />
                      </FormControl>

                      <FormControl fullWidth sx={{ mb: 1 }}>
                        <FormControlLabel
                          control={<Android12Switch defaultChecked />}
                          label="Debit"
                        />
                      </FormControl>
                      <FormControl fullWidth sx={{ mb: 1 }}>
                        <FormControlLabel
                          control={<Android12Switch defaultChecked />}
                          label="Credit"
                        />
                      </FormControl>
                      <FormControl fullWidth sx={{ mb: 1 }}>
                        <FormControlLabel
                          control={<Android12Switch defaultChecked />}
                          label="Bank Transfer"
                        />
                      </FormControl>

                      <Grid
                        item
                        xs={12}
                        sx={{ display: 'flex', justifyContent: 'end', mt: 5 }}
                      >
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                          sx={{ mx: 1 }}
                        >
                          Apply
                        </Button>
                      </Grid>
                    </form>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </MainCard>
        </Grid>
      </Grid>
    </>
  );
};

export default ModeOfPayment;
