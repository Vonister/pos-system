export const dataFilter = (props) => {
  const {
    data = [], // Default to an empty array if data is not provided
    fromDate = null,
    toDate = null,
    searchText = '',
    selectedDateColumn = '',
    selectedFilter = [],
  } = props;
  // Check if data is empty before filtering
  if (data.length > 0) {
    // Filter out selectedFilter objects with empty selectedPurposes array
    const filteredSelectedFilter = selectedFilter.filter(
      (filter) => filter.selectedPurposes.length > 0
    );

    return data.filter(
      (row) =>
        Object.values(row).some((value) =>
          String(value).toLowerCase().includes(searchText.toLowerCase())
        ) &&
        (fromDate
          ? new Date(row[selectedDateColumn]).setHours(0, 0, 0, 0) >=
            new Date(fromDate).setHours(0, 0, 0, 0)
          : true) &&
        (toDate
          ? new Date(row[selectedDateColumn]).setHours(23, 59, 59, 999) <=
            new Date(toDate).setHours(23, 59, 59, 999)
          : true) &&
        (filteredSelectedFilter.length === 0 ||
          filteredSelectedFilter.every(
            (filter) =>
              row[filter.column] &&
              filter.selectedPurposes.includes(row[filter.column])
          ))
    );
  } else {
    return [];
  }
};
