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
        sx={{ p: '0 !important' }}
      >
        <Box display={'flex'} sx={{ background: 'rgb(238, 242, 246)' }}>
          <Sidebar selected={selected} setSelected={setSelected} />
          {menuItems.items.map((item, idx) => {
            return item.title === selected ? (
              <Box key={idx} sx={{ width: '100%', p: 4 }}>
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
