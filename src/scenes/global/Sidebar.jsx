import { useState } from 'react';
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import 'react-pro-sidebar/dist/css/styles.css';
import { tokens } from '../../theme';

import logo from '../../assets/images/logo.png';

import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';

import menuItems from './MenuItems';

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [selected, setSelected] = useState('Dashboard');

  return (
    <Box
      sx={{
        '& .pro-sidebar-inner': {
          background: `${colors.primary[400]} !important`,
        },
        '& .pro-icon-wrapper': {
          backgroundColor: 'transparent !important',
        },
        '& .pro-inner-item': {
          padding: '5px 35px 5px 20px !important',
        },
        '& .pro-inner-item:hover': {
          color: '#868dfb !important',
        },
        '& .pro-menu-item.active': {
          color: '#6870fa !important',
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: '10px 0 20px 0',
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography
                  variant="small"
                  color={colors.grey[100]}
                  sx={{ textAlign: 'center' }}
                >
                  <img src={logo} alt="" width={50} /> <br /> WcDonalds
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          <Box paddingLeft={isCollapsed ? undefined : '10%'}>
            {menuItems.items.map((item, idx) => {
              return item.category === 'item' ? (
                <Item
                  key={idx}
                  title={item.title}
                  to={item.to}
                  icon={item.icon}
                  selected={selected}
                  setSelected={setSelected}
                />
              ) : (
                <Typography
                  key={idx}
                  variant="h6"
                  color={colors.grey[300]}
                  sx={{ m: '15px 0 5px 20px' }}
                  display={isCollapsed ? 'none' : 'block'}
                >
                  {item.title}
                </Typography>
              );
            })}
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;