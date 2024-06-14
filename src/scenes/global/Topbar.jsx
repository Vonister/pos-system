import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { Box, IconButton, Typography } from '@mui/material';
import logo from '../../assets/images/logo.png';
import { useState } from 'react';
import ModalNoForm from '../../ui-component/ModalNoForm';
import Sidebar from './Sidebar';
import menuItems from './MenuItems';
import MenuIcon from '@mui/icons-material/Menu';

const Topbar = () => {
  const [settingsModal, setSettingsModal] = useState(false);
  const [selected, setSelected] = useState('Menu Management');
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      backgroundColor={'#fff'}
      p={2}
    >
      <Typography variant="h4" display={'flex'} alignItems={'center'}>
        <img src={logo} alt="" width={50} style={{ marginRight: '10px' }} />{' '}
        WcDonalds
      </Typography>

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={() => setSettingsModal(true)}>
          <MenuIcon />
        </IconButton>
      </Box>

      <ModalNoForm
        open={settingsModal}
        handleClose={() => setSettingsModal(false)}
        size="modal-fullscreen"
        title="Settings"
        sx={{ p: '0 !important', background: 'rgb(238, 242, 246)' }}
      >
        <Box
          display={'flex'}
          sx={{ background: 'rgb(238, 242, 246)', height: '100%' }}
        >
          <Sidebar
            selected={selected}
            setSelected={setSelected}
            isCollapsed={isCollapsed}
            setIsCollapsed={setIsCollapsed}
          />
          {menuItems.items.map((item, idx) => {
            return item.title === selected ? (
              <Box
                key={idx}
                sx={{
                  marginLeft: isCollapsed ? '80px' : '270px',
                  width: '100%',
                  p: 4,
                  transition: 'all 0.3s ease',
                }}
              >
                {item.component}
              </Box>
            ) : (
              ''
            );
          })}
        </Box>
      </ModalNoForm>
    </Box>
  );
};

export default Topbar;
