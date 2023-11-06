import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import { AiFillHome, AiFillVideoCamera } from "react-icons/ai";
import { SiSimpleanalytics } from "react-icons/si";
import { Link, Route, Router, Routes, useParams } from "react-router-dom";
import AdminForm from "./components/AdminForm";
import CreateByAdmin from "./components/CreateByAdmin";
import UserForm from "./components/UserForm";
import SuccessForm from "./components/SuccessForm";
import UserFormDetails from "./components/UserFormDetails";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Sidenav() {
  const [open, setOpen] = useState(true);
  const { menuData } = useParams();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const styles = {
    header: {
      display: 'flex',
      alignItems: 'center',
    },
    title: {
      flex: 1, 
      textAlign: 'center', 
      fontSize: '24px', 
      fontWeight: 'bold', 
      color: '#2f2f2f', 
      marginLeft: '500px', 
    },
  };

  return (
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" elevation={4} sx={{ backgroundColor: "#ffffff", color: "#2f2f2f" }}>
      <Toolbar>
        <IconButton color="inherit" aria-label="open drawer" onClick={() => setOpen(!open)} edge="start">
          <MenuIcon />
        </IconButton>
        <div style={styles.header}>
          <h1 style={styles.title}>Custom Google Form</h1>
        </div>
      </Toolbar>
    </AppBar>
        <Drawer variant="permanent" open={open}>
          <Divider />
          <List sx={{marginTop:"4rem"}}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <AiFillHome />
                </ListItemIcon>
                <Link to="/" style={{ color: 'black', textDecoration: 'none' }}>Create Form</Link>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <AiFillVideoCamera />
                </ListItemIcon>
                <Link to="/FormList" style={{ color: 'black', textDecoration: 'none' }}>FormList</Link>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <AiFillHome />
                </ListItemIcon>
                <Link to="/userForm" style={{ color: 'black', textDecoration: 'none' }}>User Form</Link>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <AiFillHome />
                </ListItemIcon>
                <Link to="/userFormDetails" style={{ color: 'black', textDecoration: 'none' }}>User Form Details</Link>
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Routes>
            <Route path="/" element={<AdminForm />} />
            <Route path="/userForm/:formId" element={<UserForm />} />
            <Route path="/userFormDetails" element={<UserFormDetails />} />
            <Route path="/FormList" element={<CreateByAdmin />} />
            <Route path="/SuccessfullyCreate" element={<SuccessForm />} />
          </Routes>
        </Box>
      </Box>
  );
}
