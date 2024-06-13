import { Box, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { fetchData } from '../../../../features/fetchData';
import MenuForm from './MenuForm';
import MenuTable from './MenuTable';
import no_data from '../../../../assets/images/no_data.png';

const Menu = () => {
  const [data, setData] = useState([]);
  const [categoriesOption, setCategoriesOption] = useState([]);
  const [isSoloMenu, setIsSoloMenu] = useState(true);

  const fetchNeededData = () => {
    const dbTable = isSoloMenu ? 'menu/foods' : 'menu/meals';
    fetchData('categories').then((data) =>
      setCategoriesOption(data ? data : [])
    );
    fetchData(dbTable).then((data) => {
      if (data) {
        // Sort the data by category
        const sortedData = data.sort((a, b) =>
          a.category.localeCompare(b.category)
        );
        setData(sortedData);
      } else {
        setData([]);
      }
    });
  };

  useEffect(() => {
    fetchNeededData();
  }, [isSoloMenu]);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <MenuForm
            data={data}
            setData={setData}
            categoriesOption={categoriesOption}
            setCategoriesOption={setCategoriesOption}
            fetchNeededData={fetchNeededData}
            isSoloMenu={isSoloMenu}
            setIsSoloMenu={setIsSoloMenu}
          />
        </Grid>
        <Grid item xs={8}>
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
            <MenuTable data={data} />
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default Menu;
