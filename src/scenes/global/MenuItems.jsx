import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import Dashboard from "./components/Dashboard";
import Menu from "./components/Menu";

const menuItems = {
  items: [
    {
      title: "Management",
      category: "title",
    },
    {
      title: "Menu Management",
      to: "/",
      icon: <HomeOutlinedIcon />,
      category: "item",
      component: <Menu />,
    },
    {
      title: "Dashboard",
      to: "/",
      icon: <HomeOutlinedIcon />,
      category: "item",
      component: <Dashboard />,
    },
  ],
};

export default menuItems;
