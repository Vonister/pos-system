import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';

//material UI Imports
import { Box, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';

//Custom Imports
import { tableCustomStyle } from 'themes/tableCustomStyle';
import { dataFilter } from 'ui-component/datatable/DataFilter';
import DataTableActions from 'ui-component/datatable/DataTableActions';
import { exportData } from 'ui-component/datatable/DataTableExport';

//Components
import NoResults from 'views/404/NoResults';

import TableChartIcon from '@mui/icons-material/TableChart';
import DataTableSkeleton from 'ui-component/cards/Skeleton/DataTableSkeleton';
import DataTableSubHeader from './DataTableSubHeader';
import { global } from 'GlobalVariables';

const Table = (props) => {
  const theme = useTheme();
  const styles = tableCustomStyle(theme);
  const [searchText, setSearchText] = useState('');
  const [selectedFilter, setSelectedFilter] = useState([]);
  const [fromDate, setFromDate] = useState(null);
  const [selectedDateColumn, setSelectedDateColumn] = useState('');
  const [toDate, setToDate] = useState(null);
  const [pending, setPending] = useState(true);

  const { title, columns, data, filterList = [] } = props;

  useEffect(() => {
    if (data) {
      setPending(false);
    }
  }, [data]);

  const tableTitle = (
    <Box
      sx={{ fontSize: '18px', fontWeight: '600', paddingBlock: 2 }}
      display={'flex'}
      alignItems={'center'}
    >
      <TableChartIcon
        color="secondary"
        style={{ fontSize: '23px', marginRight: '0.5rem' }}
      />
      {title}
    </Box>
  );
  const resetState = () => {
    setFromDate(null);
    setToDate(null);
    setSearchText('');
    setSelectedDateColumn('');
  };

  const filteredData = dataFilter({
    data,
    fromDate,
    toDate,
    searchText,
    selectedDateColumn,
    selectedFilter,
  });

  const handleExport = (type) => {
    const filteredColumns = columns.filter((column) => !column.excluded);
    exportData({
      type,
      columns: filteredColumns,
      data: filteredData,
      title: tableTitle,
    });
  };

  return (
    <DataTable
      title={tableTitle}
      columns={columns}
      data={filteredData}
      pagination
      subHeader
      progressPending={pending}
      progressComponent={<DataTableSkeleton />}
      subHeaderComponent={
        <DataTableSubHeader
          hasDate={
            columns.filter((column) => column.isDate).length > 0 ? true : false
          }
          searchText={searchText}
          setSearchText={setSearchText}
          columns={columns}
          fromDate={fromDate}
          setFromDate={setFromDate}
          selectedDateColumn={selectedDateColumn}
          setSelectedDateColumn={setSelectedDateColumn}
          toDate={toDate}
          setToDate={setToDate}
          filterList={filterList}
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
        />
      }
      dense
      direction="auto"
      fixedHeader
      fixedHeaderScrollHeight="600px"
      highlightOnHover
      pointerOnHover
      responsive
      subHeaderAlign="right"
      subHeaderWrap
      customStyles={styles}
      noDataComponent={
        <Grid
          container
          spacing={global.appStyle.gridSpacing}
          justifyContent={'center'}
        >
          <NoResults />
        </Grid>
      }
      paginationComponentOptions={{
        rowsPerPageText: 'Rows Per Page',
        rangeSeparatorText: 'of',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'All',
      }}
      paginationRowsPerPageOptions={[10, 20, 30, 50, 100]}
      actions={
        <DataTableActions handleExport={handleExport} resetState={resetState} />
      }
    />
  );
};

export default Table;
