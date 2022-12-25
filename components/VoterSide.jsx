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
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import QuizIcon from '@mui/icons-material/Quiz';
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import { Avatar, Tooltip, useMediaQuery } from '@mui/material';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import MessageOutlined from "@mui/icons-material/MessageOutlined";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useRouter } from "next/router";
import { motion } from "framer-motion";
const drawerWidth = 240;

const AdminSide = () => {

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
    const FramerDrawer = motion(Drawer);

    const { colors, mode, dispatch, actionTypes, open, setOpen, isMobile, isLarge } = useGlobalProvider();
    const theme = useTheme();
    const [selected, setSelected] = React.useState()
    const [active, setActive] = React.useState(false);
    const close = useRef()
    const router = useRouter()

    const handleDrawerClose = () => {
        setOpen(false);
    };




    return <Box sx={{
        display: "flex",
        flexGrow: 1,
    }}
    >


        <FramerDrawer

            variant="permanent" open={open}

            sx={{
                '& .MuiDrawer-paper': {
                    background: colors.primary[400]
                }
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

            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                exit={{ scale: 0, opacity: 0 }}

            >


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
                            RIGHTSON
                        </Typography>
                        <Typography variant='h6' fontWeight="bold" mt="-10px" color={colors.greenAccent[400]}>
                            VOTER
                        </Typography>

                    </Box></>)}


            </motion.div>


            <List>
                {navItems.map(({ text, icon, link }, index) => {
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
                        router.push(`/voter/${link}`)

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



        </FramerDrawer>


    </Box>;
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
        link: 'faq',
        icon: <QuizIcon />,
    },
    {
        text: 'Messages',
        link: 'messages',
        icon: <MessageOutlined />,
    },
    {
        text: 'Events',
        link: 'events',
        icon: <CalendarTodayOutlinedIcon />

    },
    {
        text: "Help",
        link: 'help',
        icon: <HelpOutlineIcon />

    },



    {
        text: 'Results',


    },
    {
        text: 'Results Pie Chart',
        link: 'pie',
        icon: <PieChartOutlineOutlinedIcon />


    }

];

const MenuList = []



export default AdminSide;
