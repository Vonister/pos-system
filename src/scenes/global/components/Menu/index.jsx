import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { fetchData } from "../../../../features/fetchData";
import MenuForm from "./MenuForm";
import MenuTable from "./MenuTable";

const Menu = () => {
  const [data, setData] = useState([]);
  const [categoriesOption, setCategoriesOption] = useState([]);

  useEffect(() => {
    fetchData("categories").then((data) =>
      setCategoriesOption(data ? data : [])
    );
    fetchData("menu/foods").then((data) => {
      return setData(data ? data : []);
    });
  }, []);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <MenuForm
            data={data}
            setData={setData}
            categoriesOption={categoriesOption}
            setCategoriesOption={setCategoriesOption}
          />
        </Grid>
        <Grid item xs={8}>
          <MenuTable data={data} />
        </Grid>
      </Grid>
    </>
  );
};

export default Menu;
