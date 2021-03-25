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
import { Home, CreditCard, Category, Settings, ShoppingCart, PowerSettingsNew, Store } from '@material-ui/icons';
import { Link } from 'react-router-dom' 
import NavItem from './NavItem'
import HomeFragement from '../view/Home'
import MainCategory from '../view/Category/index'
import PaymentFragment from '../view/Payment/PaymentMethod'
import ProductsFragment from '../view/Products/index'
import OrdersFragment from '../view/Orders'
import SettingsFragement from '../view/Settings/index'
import fire from '../fire'

const drawerWidth = 180;

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
    marginRight: 20,
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
    width: theme.spacing(5) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(5.7) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 0),
    height: theme.spacing(0),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  }
}));

const MiniDrawer = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  // alert(window.location.pathname);
  const [fragment, setfragment] = useState(window.location.pathname)
  const lastRoute = window.location.pathname
  console.log(lastRoute, '======here is last route =====')
  // if (lastRoute == '/categeries') {
  //   console.log('categoeries last route bro')
  //   setfragment('/categories');
  // }
  const loadPageContent = () => {
    switch (fragment) {
      case "Home":
        return <HomeFragement/>;
      case "/categories":
        return <MainCategory/>;
      case "Payments":
        return <PaymentFragment/>;
      case "/products":
        return <ProductsFragment/>;
      case "Orders":
        return <OrdersFragment/>;
      case "Settings":
        return <SettingsFragement/>;
      default:
        return <HomeFragement/>;
    }
  }

  const LogOut = ()=> {
    fire.auth().signOut();
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
          <Typography variant="h6" noWrap>
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
          <NavItem 
            href="/"
            key={1}
            title="Home"
            icon={Home}
            style={{marginLeft: "6px"}}
            onClick={e=>setfragment("Home")}>
          </NavItem>
          <NavItem 
            href="/categories"
            key={2}
            title="Category"
            icon={Category}
            style={{marginLeft: "6px"}}
            onClick={e=>setfragment("/categories")}>
          </NavItem>
          <NavItem 
            href="/products"
            key={3}
            title="Products"
            icon={Store}
            style={{marginLeft: "6px"}}
            onClick={e=>setfragment("/products")}>
          </NavItem>
          <NavItem 
            href="/"
            key={4}
            title="Orders"
            icon={ShoppingCart}
            style={{marginLeft: "6px"}}
            onClick={e=>setfragment("Orders")}>
          </NavItem>
          <NavItem 
            href="/"
            key={5}
            title="Payments"
            icon={CreditCard}
            style={{marginLeft: "6px"}}
            onClick={e=>setfragment("Payments")}>
          </NavItem>
          <NavItem 
            href="/"
            key={6}
            title="Settings"
            icon={Settings}
            style={{marginLeft: "6px"}}
            onClick={e=>setfragment("Settings")}>
          </NavItem>
        </List>
        <Divider/>
        <NavItem 
            href="/"
            title="Logout"
            icon={PowerSettingsNew}
            style={{marginLeft: "6px"}}
            onClick={e=>LogOut()}>
          </NavItem>
        <Divider/>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
          <div>
            {loadPageContent()}
          </div>
      </main>
    </div>
  );
}

export default MiniDrawer