import GetAppIcon from '@mui/icons-material/GetApp';
import GridOnIcon from '@mui/icons-material/GridOn';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import {
  Button,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Zoom,
} from '@mui/material';
import { useState } from 'react';

import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { Box } from '@mui/system';

const DataTableActions = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { handleExport, resetState } = props;

  return (
    <Box
      sx={{
        paddingBlock: '1rem',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Tooltip TransitionComponent={Zoom} title="Reset Filter" arrow>
        <IconButton sx={{ marginInline: '0.5rem' }} onClick={resetState}>
          <RestartAltIcon color="dark" />
        </IconButton>
      </Tooltip>
      <Tooltip TransitionComponent={Zoom} title="Download" arrow>
        <Button
          sx={{ padding: '6px 10px', minWidth: ' 40px' }}
          variant="contained"
          color="primary"
          aria-controls="export-menu"
          aria-haspopup="true"
          onClick={(event) => {
            setAnchorEl(event.currentTarget);
          }}
        >
          <GetAppIcon />
        </Button>
      </Tooltip>

      <Menu
        id="export-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => {
          setAnchorEl(null);
        }}
      >
        <MenuItem onClick={() => handleExport('print')}>
          <LocalPrintshopIcon sx={{ marginRight: '8px' }} />
          Print
        </MenuItem>{' '}
        <MenuItem onClick={() => handleExport('csv')}>
          <GridOnIcon sx={{ marginRight: '8px' }} />
          CSV
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default DataTableActions;
