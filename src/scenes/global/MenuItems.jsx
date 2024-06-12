import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
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
