import { Box, IconButton, Typography } from "@mui/material";
import { Menu, MenuItem, ProSidebar } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";

import logo from "../../assets/images/logo.png";

import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

import menuItems from "./MenuItems";

const Item = ({ title, to, icon, selected, setSelected }) => {
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: "#141414",
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
    </MenuItem>
  );
};

const Sidebar = ({ selected, setSelected, isCollapsed, setIsCollapsed }) => {
  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `#fff !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
        height: "100vh",
        position: "absolute",
      }}
    >
      <ProSidebar collapsed={isCollapsed} sx={{}}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: "#141414",
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
                  color={"#141414"}
                  sx={{ textAlign: "center" }}
                >
                  <img src={logo} alt="" width={50} /> <br /> WcDonalds
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            {menuItems.items.map((item, idx) => {
              return item.category === "item" ? (
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
                  color={"#3d3d3d"}
                  sx={{ m: "15px 0 5px 20px" }}
                  display={isCollapsed ? "none" : "block"}
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
