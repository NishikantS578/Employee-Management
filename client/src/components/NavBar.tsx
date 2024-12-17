import { AppBar, Box, Button, CssBaseline, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Toolbar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { ReactElement, useContext, useState } from "react";
import { useNavigate } from "react-router";
import { appContext } from "../context/AppContext";

export default function NavBar(props: { appName: string, navItems: { name: string, route: string, icon: ReactElement }[] }) {
    const navigate = useNavigate();
    const context = useContext(appContext);
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleLogOut = () => {
        context.isLoggedIn = false;
        navigate(0);
    }

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const drawerWidth = 240;
    const container = document.body

    return <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar component="nav" position="static">
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: { sm: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{ display: { xs: 'none', sm: 'block' }, pr: 4 }}
                >
                    {props.appName}
                </Typography>
                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                    {props.navItems.map((item) => (
                        <Button key={item.name} sx={{ color: '#fff' }} onClick={() => navigate(item.route)}>
                            {item.name}
                        </Button>
                    ))}
                </Box>
                <Box sx={{ ml: "auto", px: 1 }}>
                    {
                        context.isLoggedIn ?
                            <Box display={"flex"} gap={4}>
                                <Typography variant="h5" >{context.userName}</Typography>
                                <Button variant="contained" size="small" color="error" onClick={handleLogOut}>
                                    Logout
                                </Button>
                            </Box> :
                            <Button variant="contained" size="small" color="info" sx={{ color: '#fff' }} onClick={() => navigate("/login")}>
                                Login
                            </Button>
                    }
                </Box>
            </Toolbar>
        </AppBar>

        <nav>
            <Drawer
                container={container}
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
            >

                <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" sx={{ my: 2 }}>
                        {props.appName}
                    </Typography>
                    <Divider />
                    <List>
                        {props.navItems.map((item) => (
                            <ListItem key={item.name} disablePadding>
                                <ListItemButton sx={{ textAlign: 'center' }} onClick={() => navigate(item.route)}>
                                    <ListItemText primary={item.name} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
        </nav>
    </Box>
}