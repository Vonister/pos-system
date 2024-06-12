import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import Dashboard from "./components/Dashboard";
import Menu from "./components/Menu";
import Category from "./components/Category";

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
    {
      title: "Category Management",
      to: "/",
      icon: <HomeOutlinedIcon />,
      category: "item",
      component: <Category />,
    },
  ],
};

export default menuItems;
