import { styled } from "@mui/material/styles";
//import AppBar from '@mui/material/AppBar';
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
// import InputBase from '@mui/material/InputBase';
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
// import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import Drawer from "@mui/material/Drawer";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import { useNavigate } from "react-router-dom";

import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import Link from "@mui/material/Link";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
//import CssBaseline from '@mui/material/CssBaseline';
import BusinessIcon from "@mui/icons-material/Business";
import UserIcon from "@mui/icons-material/AccountCircle";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

import { Fade } from "@mui/material";

import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import StoreIcon from "@mui/icons-material/Store";
import { useState } from "react";

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
}));

// drawer width
const drawerWidth = 240;

export default function NavBar(props) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

    const navigate = useNavigate();

    const { window } = props;
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleDrawerToggle = () => {
        console.log(drawerOpen);
        setDrawerOpen(!drawerOpen);
    };

    const [openSubMenu, setOpenSubMenu] = useState(false);
    const [openUserSubMenu, setOpenUserSubMenu] = useState(false);

    const handleSubMenuOpen = () => {
        console.log(openSubMenu, drawerOpen);
        setOpenSubMenu(true);
        setDrawerOpen(true);
    };

    const handleUserSubMenuOpen = () => {
        console.log(openUserSubMenu, drawerOpen);
        setOpenUserSubMenu(true);
        setDrawerOpen(true);
    };

    const handleSubMenuClose = () => {
        setOpenSubMenu(false);
        setOpenSubMenu(false);
        setDrawerOpen(false);
    };

    const handleNavigation = (index) => {
        const navList = [
            "/",
            "/attendance",
            "/addcompany",
            "/viewcompany",
            "/adduser",
            "/viewusers",
        ];
        navigate(navList[index]);
        setDrawerOpen(false);
    };
    const iconList = [<DashboardCustomizeIcon />, <EventAvailableIcon />];

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = "primary-search-account-menu";
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    );

    const mobileMenuId = "primary-search-account-menu-mobile";
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton
                    size="large"
                    aria-label="show 4 new mails"
                    color="inherit"
                >
                    <Badge badgeContent={4} color="error">
                        <MailIcon />
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                    <Badge badgeContent={17} color="error">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    const container =
        window !== undefined ? () => window().document.body : undefined;

    return (
        <>
            <AppBar position="fixed" sx={{ backgroundColor: "white" }}>
                <Toolbar>
                    <IconButton
                        color="black"
                        aria-label="open drawer"
                        onClick={handleDrawerToggle}
                        edge="start"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: "block", sm: "block" } }}
                    >
                        <Link href="/" underline="none">
                            <img
                                src="bcglogo.png"
                                alt="logo"
                                style={{
                                    marginTop: "5px",
                                    marginLeft: "10px",
                                    width: "50%",
                                }}
                            />
                        </Link>
                    </Typography>

                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: "none", md: "flex" } }}>
                        <IconButton
                            size="large"
                            aria-label="show 4 new mails"
                            color="black"
                        >
                            <Badge badgeContent={4} color="error">
                                <MailIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            size="large"
                            aria-label="show 17 new notifications"
                            color="black"
                        >
                            <Badge badgeContent={17} color="error">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="black"
                        >
                            <AccountCircle />
                        </IconButton>
                    </Box>
                    <Box sx={{ display: { xs: "flex", md: "none" } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="black"
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                container={container}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    width: drawerWidth - 160,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: drawerWidth - 160,
                        boxSizing: "border-box",
                    },
                }}
                anchor="left"
            >
                <List sx={{ mt: 8 }}>
                    {["Dashboard", "Attendance"].map((text, index) => (
                        <ListItem
                            key={text}
                            disablePadding
                            sx={{ display: "block" }}
                            onClick={() => handleNavigation(index)}
                        >
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: "initial",
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: 3,
                                        justifyContent: "center",
                                    }}
                                >
                                    {iconList[index]}
                                </ListItemIcon>
                            </ListItemButton>
                        </ListItem>
                    ))}

                    <Divider />
                    <ListItem
                        disablePadding
                        sx={{ display: "block" }}
                        onClick={handleSubMenuOpen}
                    >
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: "initial",
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: "auto",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <BusinessIcon />
                            </ListItemIcon>
                            {openSubMenu ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                    </ListItem>

                    <Divider />

                    <ListItem
                        disablePadding
                        sx={{ display: "block" }}
                        onClick={handleUserSubMenuOpen}
                    >
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: "initial",
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: "auto",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <UserIcon />
                            </ListItemIcon>
                            {openUserSubMenu ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                    </ListItem>
                    <Divider />
                </List>
            </Drawer>
            <Drawer
                container={container}
                variant="temporary"
                open={drawerOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    "& .MuiDrawer-paper": {
                        boxSizing: "border-box",
                        width: drawerWidth,
                    },
                }}
            >
                <List sx={{ mt: 8 }}>
                    {["Dashboard", "Attendance"].map((text, index) => (
                        <ListItem
                            key={text}
                            disablePadding
                            sx={{ display: "block" }}
                            onClick={() => handleNavigation(index)}
                        >
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: "center",
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: 3,
                                        justifyContent: "center",
                                    }}
                                >
                                    {iconList[index]}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                    <Divider> Admin Features </Divider>
                    <ListItem
                        disablePadding
                        sx={{ display: "block" }}
                        onClick={() => setOpenSubMenu(!openSubMenu)}
                    >
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: "center",
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: 3,
                                    justifyContent: "initial",
                                    alignItems: "center",
                                }}
                            >
                                <BusinessIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Company Managment"} />
                            {openSubMenu ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Divider />
                        {openSubMenu ? (
                            <>
                                <Fade in={openSubMenu}>
                                    <List>
                                        <ListItem
                                            disablePadding
                                            sx={{ display: "block" }}
                                            onClick={() => handleNavigation(2)}
                                        >
                                            <ListItemButton
                                                sx={{
                                                    minHeight: 48,
                                                    justifyContent: "center",
                                                    px: 2.5,
                                                }}
                                            >
                                                <ListItemIcon
                                                    sx={{
                                                        minWidth: 0,
                                                        mr: 3,
                                                        ml: 3,
                                                        justifyContent:
                                                            "center",
                                                        alignItems: "center",
                                                    }}
                                                >
                                                    <AddBusinessIcon />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={"Add Company "}
                                                />
                                            </ListItemButton>
                                        </ListItem>

                                        <ListItem
                                            disablePadding
                                            sx={{ display: "block" }}
                                            onClick={() => handleNavigation(3)}
                                        >
                                            <ListItemButton
                                                sx={{
                                                    minHeight: 48,
                                                    justifyContent: "center",
                                                    px: 2.5,
                                                }}
                                            >
                                                <ListItemIcon
                                                    sx={{
                                                        minWidth: 0,
                                                        mr: 3,
                                                        ml: 3,
                                                        justifyContent:
                                                            "center",
                                                        alignItems: "center",
                                                    }}
                                                >
                                                    <StoreIcon />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={"View Company "}
                                                />
                                            </ListItemButton>
                                        </ListItem>
                                        <Divider />
                                    </List>
                                </Fade>
                            </>
                        ) : null}
                    </ListItem>

                    {/*------------------------------*/}

                    {/* <ListItem disablePadding sx={{ display: 'block' }} onClick={() => setOpenSubMenu(!openSubMenu)} >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: 3,
                  justifyContent: 'initial',
                  alignItems: 'center'
                }}

              >
                <BusinessIcon />
              </ListItemIcon>
              <ListItemText primary={'Company Managment'} />
              {openSubMenu ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Divider />
            {openSubMenu ? <>
            <Fade in={openSubMenu} >
              
              <List>
                
                <ListItem disablePadding sx={{ display: 'block' }} onClick={()=>handleNavigation(2)}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: 'center',
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: 3,
                        ml:3,
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}

                    >
                      <AddBusinessIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Add Company '} />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding sx={{ display: 'block'}} onClick={handleSubMenuClose}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: 'center',
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: 3,
                        ml: 3,
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}

                    >
                      <StoreIcon />
                    </ListItemIcon>
                    <ListItemText primary={'View Company '}  />
                  </ListItemButton>
                </ListItem>
                <Divider />
              </List>
             
            </Fade>
            </>:null}

          </ListItem> */}

                    <ListItem
                        disablePadding
                        sx={{ display: "block" }}
                        onClick={() => setOpenUserSubMenu(!openUserSubMenu)}
                    >
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: "center",
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: 3,
                                    justifyContent: "initial",
                                    alignItems: "center",
                                }}
                            >
                                <UserIcon />
                            </ListItemIcon>
                            <ListItemText primary={"User Management"} />
                            {openUserSubMenu ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Divider />
                        {openUserSubMenu ? (
                            <>
                                <Fade in={openUserSubMenu}>
                                    <List>
                                        <ListItem
                                            disablePadding
                                            sx={{ display: "block" }}
                                            onClick={() => handleNavigation(4)}
                                        >
                                            <ListItemButton
                                                sx={{
                                                    minHeight: 48,
                                                    justifyContent: "center",
                                                    px: 2.5,
                                                }}
                                            >
                                                <ListItemIcon
                                                    sx={{
                                                        minWidth: 0,
                                                        mr: 3,
                                                        ml: 3,
                                                        justifyContent:
                                                            "center",
                                                        alignItems: "center",
                                                    }}
                                                >
                                                    <AddBusinessIcon />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={"Add User "}
                                                />
                                            </ListItemButton>
                                        </ListItem>
                                        <ListItem
                                            disablePadding
                                            sx={{ display: "block" }}
                                            onClick={() => handleNavigation(5)}
                                        >
                                            <ListItemButton
                                                sx={{
                                                    minHeight: 48,
                                                    justifyContent: "center",
                                                    px: 2.5,
                                                }}
                                            >
                                                <ListItemIcon
                                                    sx={{
                                                        minWidth: 0,
                                                        mr: 3,
                                                        ml: 3,
                                                        justifyContent:
                                                            "center",
                                                        alignItems: "center",
                                                    }}
                                                >
                                                    <StoreIcon />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={"View Users "}
                                                />
                                            </ListItemButton>
                                        </ListItem>

                                        {/* <ListItem disablePadding sx={{ display: 'block'}} onClick={handleSubMenuClose}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: 'center',
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: 3,
                        ml: 3,
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}

                    >
                      <StoreIcon />
                    </ListItemIcon>
                    <ListItemText primary={'View Users '}  />
                  </ListItemButton>
                </ListItem> */}
                                        <Divider />
                                    </List>
                                </Fade>
                            </>
                        ) : null}
                    </ListItem>
                </List>
            </Drawer>
            {renderMobileMenu}
            {renderMenu}
        </>
    );
}
