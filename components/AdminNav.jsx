import React, { useState } from "react";
import { useGlobalProvider } from "../context/themeContext";
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { InputBase } from '@mui/material';
import { Search } from '@mui/icons-material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Flex from "./Flex"
import { useTheme } from "@mui/material";
import { useAuth } from "../context/authContext";
const AdminNav = () => {
    const { colors, mode, dispatch, actionTypes, isMobile, open, setOpen, isLarge } = useGlobalProvider();
    const [anchorEl, setAnchorEl] = useState(null);
    const isOpen = Boolean(anchorEl);
    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);
    const theme = useTheme()
    const { logout } = useAuth();


    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{
                background: 'transparent',

            }}>
                <Toolbar sx={{
                    justifyContent: "space-between",

                }}>
                    <Flex>

                        {!isLarge && (
                            <IconButton
                                onClick={() => setOpen(!open)}
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{
                                    mr: 2,
                                    color: colors.grey[100]
                                }}

                            >
                                <MenuIcon />
                            </IconButton>
                        )}


                        <Flex sx={{
                            background: colors.primary[400],
                            p: ".2rem .5rem"
                        }} >
                            <InputBase placeholder='Search...' />
                            <Search sx={{
                                fontSize: "1.5rem",
                            }} />
                        </Flex>


                    </Flex>
                    <Flex>

                        <IconButton onClick={() => dispatch({ type: actionTypes.CHANGE_THEME })}>
                            {mode === "dark" ? (
                                <DarkModeOutlinedIcon />
                            ) : (
                                <LightModeOutlinedIcon />
                            )}
                        </IconButton>
                        <IconButton>
                            <NotificationsOutlinedIcon />
                        </IconButton>
                        <IconButton onClick={handleClick}>
                            <PersonOutlinedIcon />
                        </IconButton>

                    </Flex>
                    <Menu
                        anchorEl={anchorEl}
                        open={isOpen}
                        onClose={handleClose}
                        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                    >
                        <MenuItem onClick={logout}>Log Out</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
        </Box>

    );
};

export default AdminNav;
