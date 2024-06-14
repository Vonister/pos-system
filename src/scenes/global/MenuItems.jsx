import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import Dashboard from './components/Dashboard';
import Menu from './components/Menu';
import Category from './components/Category';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import CategoryIcon from '@mui/icons-material/Category';
import ReceiptIcon from '@mui/icons-material/Receipt';
import TimelineIcon from '@mui/icons-material/Timeline';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ModeOfPayment from './components/ModeOfPayment';
import Reports from './components/Reports';

const menuItems = {
  items: [
    {
      title: 'Management',
      category: 'title',
    },
    {
      title: 'Menu Management',
      to: '/',
      icon: <FastfoodIcon />,
      category: 'item',
      component: <Menu />,
    },
    {
      title: 'Category Management',
      to: '/',
      icon: <CategoryIcon />,
      category: 'item',
      component: <Category />,
    },
    {
      title: 'Mode of Payment',
      to: '/',
      icon: <MonetizationOnIcon />,
      category: 'item',
      component: <ModeOfPayment />,
    },
    {
      title: 'Transactions',
      category: 'title',
    },
    {
      title: 'Reports',
      to: '/',
      icon: <TimelineIcon />,
      category: 'item',
      component: <Reports />,
    },
    {
      title: 'History',
      to: '/',
      icon: <ReceiptIcon />,
      category: 'item',
      component: <Category />,
    },
  ],
};

export default menuItems;
