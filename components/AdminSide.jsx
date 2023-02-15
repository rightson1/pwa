import React, { useEffect, useRef } from "react";
import { styled, useTheme } from '@mui/material/styles';
import { useGlobalProvider } from "../context/themeContext";
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer'
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { Avatar, Tooltip, useMediaQuery } from '@mui/material';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import MessageOutlined from "@mui/icons-material/MessageOutlined";
import AddIcon from '@mui/icons-material/Add';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { useAuth } from "../context/authContext";
const drawerWidth = 240;





const AdminSide = () => {
    const { admin } = useAuth();
    const { colors, mode, dispatch, actionTypes, open, setOpen, isMobile, isLarge } = useGlobalProvider();
    const theme = useTheme();
    const [selected, setSelected] = React.useState()
    const [active, setActive] = React.useState(false);
    const close = useRef()
    const router = useRouter()

    const handleDrawerClose = () => {
        setOpen(false);
    };



    const openedMixin = (theme) => ({
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        overflowX: 'hidden',
    });

    const closedMixin = (theme) => ({
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: isLarge ? `calc(${theme.spacing(7)} + 1px)` : 0,
        [theme.breakpoints.up('md')]: {
            width: isLarge ? `calc(${theme.spacing(8)} + 1px)` : '0',
        },
    });




    const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
        ({ theme, open }) => ({
            width: drawerWidth,
            flexShrink: 0,
            whiteSpace: 'nowrap',
            boxSizing: 'border-box',
            ...(open && {
                ...openedMixin(theme),
                '& .MuiDrawer-paper': openedMixin(theme),
            }),
            ...(!open && {
                ...closedMixin(theme),
                '& .MuiDrawer-paper': closedMixin(theme),
            }),
        }),
    );

    const ListComponent = ({ items }) => {
        return <Box width={240}>

            {open && (<>  <Box display="flex" justifyContent="space-between" alignItems="center" p="1rem">

                <Typography>
                    ADMINS
                </Typography>
                <IconButton onClick={handleDrawerClose} >
                    {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
            </Box>
                <Box gap={1} display="flex" p="1rem" flexDirection="column" alignItems="center">
                    <Avatar src='/avatar.png' sx={{
                        width: '90px',
                        height: "90px"
                    }} />
                    <Typography variant='h3' fontWeight="bold">
                        {admin?.name}
                    </Typography>
                    <Typography variant='h6' fontWeight="bold" mt="-10px" color={colors.greenAccent[400]}>
                        {admin?.role?.toUpperCase()}
                    </Typography>

                </Box></>)}


            <List>
                {items.map(({ text, icon, link }, index) => {
                    if (!icon) {
                        return (<ListItem disablePadding sx={{ display: 'block' }} key={index}>
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
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Typography key={text} fontWeight="bold" color={colors.greenAccent[400]}>
                                        {text}
                                    </Typography>
                                    {/* {text} */}
                                </ListItemIcon>

                            </ListItemButton>
                        </ListItem>)

                    }
                    const lcText = text.toLowerCase();

                    return (<ListItem disablePadding sx={{ display: 'block' }} onClick={() => {
                        router.push(`/admin/${link}`)

                    }} key={index}>
                        <ListItemButton

                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                        >
                            <Tooltip title={text}>
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >

                                    {icon}
                                </ListItemIcon>
                            </Tooltip>
                            <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                    </ListItem>
                    );
                })}
            </List>


        </Box>

    }
    if (isMobile) {
        return <>
            <MuiDrawer
                open={open}
                anchor="left"
                onClose={() => setOpen(false)}
                sx={{
                    '& .MuiDrawer-paper': {
                        background: colors.primary[400],

                    },
                    flexGrow: 1,

                }}>
                <ListComponent items={navItems} />
            </MuiDrawer>
        </>;
    } else {
        return <Box sx={{
            display: "flex",
            flexGrow: 1,
            height: 'auto',

        }}
        >


            <Drawer
                variant="permanent" open={open}

                sx={{
                    '& .MuiDrawer-paper': {
                        background: colors.primary[400]
                    },

                    height: 'auto'

                }}>
                {
                    !open && <ListItem disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                            onClick={() => setOpen(!open)}
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                        >

                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                <MenuOutlinedIcon />
                            </ListItemIcon>

                        </ListItemButton>
                    </ListItem>
                }


                <ListComponent items={navItems} />

            </Drawer>

        </Box>;
    }
};


const navItems = [
    {
        text: "Dashboard",
        icon: <HomeOutlinedIcon />,
        link: '/'
    },

    {
        text: "Data",
    },

    {
        text: "Admins",
        link: 'admins',
        icon: <AdminPanelSettingsIcon />,
    },
    {
        text: "Voters",
        link: 'voters',
        icon: <HowToRegIcon />,
    },
    {
        text: "candidates",
        link: 'candidates',
        icon: <PeopleOutlinedIcon />,
    },

    {
        text: "Pages",
    },
    {
        text: "Positions",
        link: 'positions',
        icon: <HowToVoteIcon />
    }
    , {

        text: 'FAQ',
        link: 'faqs',
        icon: <HelpOutlineOutlinedIcon />,
    },
    {
        text: 'Events',
        link: 'events',
        icon: <CalendarTodayOutlinedIcon />

    },
    {
        text: "Settings",
        link: 'settings',
        icon: <SettingsOutlinedIcon />

    },
    {
        text: "Notifications",
        link: 'notifications',
        icon: <NotificationsNoneIcon />

    },
    {
        text: "Forms",

    },


    {
        text: "New Position",
        link: "new-position",
        icon: <AddCircleOutlineIcon />,
    },
    {
        text: "New FAQ",
        link: "faq",
        icon: <HelpOutlineOutlinedIcon />,
    },
    {
        text: 'New Notification',
        link: "notification",
        icon: <NotificationsNoneIcon />

    },

    {
        text: 'Results',


    },

    {
        text: 'Results Pie Chart',
        link: 'pie',
        icon: <PieChartOutlineOutlinedIcon />


    }, {
        text: 'Results Bar Chart',
        link: 'bar',
        icon: <BarChartOutlinedIcon />

    }

];

const MenuList = []




export default AdminSide;
