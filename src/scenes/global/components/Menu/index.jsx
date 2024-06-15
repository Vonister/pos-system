import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { fetchData } from "../../../../features/fetchData";
import MenuForm from "./MenuForm";
import MenuTable from "./MenuTable";

const Menu = () => {
  const [data, setData] = useState([]);
  const [categoriesOption, setCategoriesOption] = useState([]);
  const [isSoloMenu, setIsSoloMenu] = useState(true);
  const [isLoadingTable, setIsLoadingTable] = useState(true);
  const [formMode, setFormMode] = useState("Add");
  const [inclusionOptions, setInclusionOptions] = useState([]);
  const [isOption, setIsOption] = useState(false);
  const [selectedInclusions, setSelectedInclusions] = useState([]);
  const [optionCount, setOptionCount] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    options: [],
    prices: [],
    costs: [],
    inclusions: [],
    stocks: "",
    image: null,
  });

  const fetchNeededData = () => {
    const dbTable = isSoloMenu ? "menu/foods" : "menu/meals";
    fetchData("categories").then((data) =>
      setCategoriesOption(data ? data : [])
    );

    //Fetch all the menu list and display to table
    //Depends on state isSoloMenu on what data will fetch if Meals or Solo
    fetchData(dbTable).then((data) => {
      if (data) {
        if (isSoloMenu) {
          //FETCH THE DATA IN MEALS WHERE AFFECTED OF THIS FOOD
          fetchData("menu/meals").then((meals) => {
            if (meals) {
              // Create a copy of the current data to avoid mutating the state directly
              let updatedData = data.map((food) => ({
                ...food,
                mealsAffected: [],
              }));

              meals.forEach((meal) => {
                updatedData = updatedData.map((food) => {
                  if (meal.inclusions.includes(food.id)) {
                    // Add the meal to the mealsAffected array if it matches
                    return {
                      ...food,
                      mealsAffected: [...food.mealsAffected, meal],
                    };
                  }
                  return food;
                });
              });
              // Sort the data by category
              const sortedData = updatedData.sort((a, b) =>
                a.category.localeCompare(b.category)
              );

              //FETCH THE FOODS LIST TO SHOW IN AUTO COMPLETE
              setInclusionOptions(
                data.sort((a, b) => a.category.localeCompare(b.category))
              );
              setIsLoadingTable(false);
              setData(sortedData); // Set the updated state once
            } else {
              setIsLoadingTable(false);
              setData([]);
              setInclusionOptions([]);
            }
          });
        } else {
          // Sort the data by category
          const sortedData = data.sort((a, b) =>
            a.category.localeCompare(b.category)
          );
          setData(sortedData);
          setIsLoadingTable(false);
        }
      } else {
        setIsLoadingTable(false);
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
            isLoadingTable={isLoadingTable}
            setIsLoadingTable={setIsLoadingTable}
            formData={formData}
            setFormData={setFormData}
            isOption={isOption}
            setIsOption={setIsOption}
            optionCount={optionCount}
            setOptionCount={setOptionCount}
            formMode={formMode}
            setFormMode={setFormMode}
            inclusionOptions={inclusionOptions}
            setInclusionOptions={setInclusionOptions}
            selectedInclusions={selectedInclusions}
            setSelectedInclusions={setSelectedInclusions}
          />
        </Grid>
        <Grid item xs={8}>
          <MenuTable
            data={data}
            isSoloMenu={isSoloMenu}
            fetchNeededData={fetchNeededData}
            isLoadingTable={isLoadingTable}
            setFormData={setFormData}
            isOption={isOption}
            setIsOption={setIsOption}
            optionCount={optionCount}
            setOptionCount={setOptionCount}
            setFormMode={setFormMode}
            inclusionOptions={inclusionOptions}
            selectedInclusions={selectedInclusions}
            setSelectedInclusions={setSelectedInclusions}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Menu;
