import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import ContactsOutlinedIcon from '@mui/icons-material/ContactsOutlined';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import PieChartOutlineOutlinedIcon from '@mui/icons-material/PieChartOutlineOutlined';
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';

const menuItems = {
  items: [
    {
      title: 'POS',
      category: 'title',
    },
    {
      title: 'POS',
      to: '/pos',
      icon: <HomeOutlinedIcon />,
      category: 'item',
    },
    {
      title: 'Dashboard',
      category: 'title',
    },
    {
      title: 'Dashboard',
      to: '/',
      icon: <HomeOutlinedIcon />,
      category: 'item',
    },
    {
      title: 'Data',
      category: 'title',
    },
    {
      title: 'Manage Team',
      to: '/team',
      icon: <PeopleOutlinedIcon />,
      category: 'item',
    },
    {
      title: 'Contacts Information',
      to: '/contacts',
      icon: <ContactsOutlinedIcon />,
      category: 'item',
    },
    {
      title: 'Invoices Balances',
      to: '/invoices',
      icon: <ReceiptOutlinedIcon />,
      category: 'item',
    },
    {
      title: 'Pages',
      category: 'title',
    },
    {
      title: 'Profile Form',
      to: '/form',
      icon: <PersonOutlinedIcon />,
      category: 'item',
    },
    {
      title: 'Calendar',
      to: '/calendar',
      icon: <CalendarTodayOutlinedIcon />,
      category: 'item',
    },
    {
      title: 'FAQ Page',
      to: '/faq',
      icon: <HelpOutlineOutlinedIcon />,
      category: 'item',
    },
    {
      title: 'Charts',
      category: 'title',
    },
    {
      title: 'Bar Chart',
      to: '/bar',
      icon: <BarChartOutlinedIcon />,
      category: 'item',
    },
    {
      title: 'Pie Chart',
      to: '/pie',
      icon: <PieChartOutlineOutlinedIcon />,
      category: 'item',
    },
    {
      title: 'Line Chart',
      to: '/line',
      icon: <TimelineOutlinedIcon />,
      category: 'item',
    },
    {
      title: 'Geography Chart',
      to: '/geography',
      icon: <MapOutlinedIcon />,
      category: 'item',
    },
  ],
};

export default menuItems;
