import {
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { fetchData } from "../../../../features/fetchData";
import { updateData } from "../../../../features/updateData";
import Notification from "../../../../services/Notification";
import MainCard from "../../../../ui-component/cards/MainCard";
import DataTableSkeleton from "../../../../ui-component/cards/Skeleton/DataTableSkeleton";
import { Android12Switch } from "../../../../ui-component/StyledSwitch";

const ModeOfPayment = () => {
  const [modes, setModes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleChange = (event) => {
    const { checked, value } = event.target;

    if (checked) {
      if (!modes.includes(value)) {
        setModes([...modes, value]);
      }
    } else {
      const newModes = modes.filter((mode) => mode !== value);

      setModes(newModes);
    }
  };

  const fetchNeededData = () => {
    fetchData(`settings`).then((data) => {
      setModes(data ? data[0].modes : []);
      setIsLoading(false);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const result = updateData({ modes }, `settings/payment_mode`);
    Notification.notif({
      message: result
        ? "Successfully updated the mode of payment!"
        : "Something went wrong.",
      type: result ? "success" : "error",
      autoClose: 3000,
      theme: "colored",
    });
  };

  useEffect(() => {
    fetchNeededData();
  }, []);

  return (
    <>
      <Grid container spacing={3}>
        {isLoading ? (
          <Grid item xs={4}>
            <DataTableSkeleton />
          </Grid>
        ) : (
          <Grid item xs={4}>
            <MainCard>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="h3">Mode of Payment </Typography>
                </Grid>
                <Grid item xs={12}>
                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <Typography variant="h4" sx={{ mb: 2 }}>
                          Available Mode of Payment
                        </Typography>
                        <FormControl fullWidth sx={{ mb: 1 }}>
                          <FormControlLabel
                            control={
                              <Android12Switch
                                onChange={handleChange}
                                value="GCash"
                                checked={modes.includes("GCash") ? true : false}
                              />
                            }
                            label="GCash"
                          />
                        </FormControl>
                        <FormControl fullWidth sx={{ mb: 1 }}>
                          <FormControlLabel
                            control={
                              <Android12Switch
                                onChange={handleChange}
                                value="PayMaya"
                                checked={
                                  modes.includes("PayMaya") ? true : false
                                }
                              />
                            }
                            label="PayMaya"
                          />
                        </FormControl>

                        <FormControl fullWidth sx={{ mb: 1 }}>
                          <FormControlLabel
                            control={
                              <Android12Switch
                                onChange={handleChange}
                                value="Debit"
                                checked={modes.includes("Debit") ? true : false}
                              />
                            }
                            label="Debit"
                          />
                        </FormControl>
                        <FormControl fullWidth sx={{ mb: 1 }}>
                          <FormControlLabel
                            control={
                              <Android12Switch
                                onChange={handleChange}
                                value="Credit"
                                checked={
                                  modes.includes("Credit") ? true : false
                                }
                              />
                            }
                            label="Credit"
                          />
                        </FormControl>
                        <FormControl fullWidth sx={{ mb: 1 }}>
                          <FormControlLabel
                            control={
                              <Android12Switch
                                onChange={handleChange}
                                value="Bank Transfer"
                                checked={
                                  modes.includes("Bank Transfer") ? true : false
                                }
                              />
                            }
                            label="Bank Transfer"
                          />
                        </FormControl>
                      </Grid>
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
                          Apply
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </Grid>
              </Grid>
            </MainCard>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default ModeOfPayment;
