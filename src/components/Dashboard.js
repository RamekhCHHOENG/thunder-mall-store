import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Home, CreditCard, Category, Settings, ShoppingCart, PowerSettingsNew } from '@material-ui/icons';

import HomeFragement from '../view/Home'
import CategoryFragement from '../view/Categery'
import PaymentFragment from '../view/Payment/PaymentMethod'
import ProductsFragment from '../view/Products'
import OrdersFragment from '../view/Orders'
import SettingsFragement from '../view/Settings/index'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: "#ff5722"
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  }
}));

export default function MiniDrawer() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [fragment, setfragment] = useState("HOME")

  const loadPageContent = () => {
    console.log(fragment, 'this is fragment===========');
    switch (fragment) {
      case "HOME":
        return <HomeFragement/>;
      case "CATEGORY":
        return <CategoryFragement/>;
      case "Payment":
        return <PaymentFragment/>;
      case "Products":
        return <ProductsFragment/>;
      case "Orders":
        return <OrdersFragment/>;
      case "Settings":
        return <SettingsFragement/>;
      default:
        break;
    }
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" noWrap>
            Product Management
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button onClick={e=>setfragment("HOME")}>
            <ListItemIcon>
              <Home/>
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button onClick={e=>setfragment("CATEGORY")}>
            <ListItemIcon>
              <Category/>
            </ListItemIcon>
            <ListItemText primary="Category" />
          </ListItem>
          <ListItem button onClick={e=>setfragment("Products")}>
            <ListItemIcon>
              <Home/>
            </ListItemIcon>
            <ListItemText primary="Products" />
          </ListItem>
          <ListItem button onClick={e=>setfragment("Orders")}>
            <ListItemIcon>
              <ShoppingCart/>
            </ListItemIcon>
            <ListItemText primary="Orders" />
          </ListItem>
          <ListItem button onClick={e=>setfragment("Payment")}>
            <ListItemIcon>
              <CreditCard/>
            </ListItemIcon>
            <ListItemText primary="Payments" />
          </ListItem>
          <ListItem button onClick={e=>setfragment("Settings")}>
            <ListItemIcon>
              <Settings/>
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
        </List>
        <Divider/>
        <List>
          <ListItem button onClick={e=>setfragment("CATEGORY")}>
              <ListItemIcon>
                <PowerSettingsNew/>
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
        </List>
        <Divider/>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
            {loadPageContent()}
      </main>
    </div>
  );
}