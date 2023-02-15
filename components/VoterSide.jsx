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
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import QuizIcon from '@mui/icons-material/Quiz';
import PersonIcon from '@mui/icons-material/Person';
import { Avatar, Tooltip, useMediaQuery } from '@mui/material';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import MessageOutlined from "@mui/icons-material/MessageOutlined";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { useAuth } from "../context/authContext";
import { useCandidatesQuery } from "../util/useCandidate";


const AdminSide = () => {
    const { voter } = useAuth();
    const { colors, mode, dispatch, actionTypes, open, setOpen, isMobile, isLarge, isMobileSmall } = useGlobalProvider();
    const drawerWidth = 240;
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

            flexShrink: 0,
            width: {
                xs: '100vw',
                sm: drawerWidth,
                md: drawerWidth,
            },
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


    const theme = useTheme();
    const [selected, setSelected] = React.useState()
    const [active, setActive] = React.useState(false);
    const { data: candidates } = useCandidatesQuery();

    const close = useRef()
    const router = useRouter()

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const ListComponent = ({ items }) => {
        return (

            <Box
                width={240}
            >

                {open && (<>  <Box display="flex" justifyContent="space-between" alignItems="center" p="1rem">

                    <Typography>
                        VOTERS
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
                            {voter && voter.name}
                        </Typography>
                        <Typography variant='h6' fontWeight="bold" mt="-10px" color={colors.greenAccent[400]}>
                            VOTER
                        </Typography>

                    </Box></>)}
                <List >
                    {navItems.filter((item) => candidates?.some((candidate) => candidate.reg === voter?.reg) || item.text !== "Candidate").map(({ text, icon, link }, index) => {
                        if (!icon) {
                            return (
                                <>
                                    <ListItem disablePadding sx={{ display: 'block' }} key={index}>
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
                                    </ListItem>

                                </>

                            )


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

            </Box>
        )
    }



    if (isMobile) {
        return <>
            <MuiDrawer
                variant="persistent" open={open}
                anchor="left"
                onClose={() => setClose(false)}
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
        }}
        >
            <Drawer
                variant="permanent" open={open}
                sx={{
                    '& .MuiDrawer-paper': {
                        background: colors.primary[400],
                    },

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
        text: "Candidates",
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
        text: "Help",
        link: 'help',
        icon: <HelpOutlineIcon />

    },
    {
        text: "Notifications",
        link: 'notifications',
        icon: <NotificationsNoneIcon />

    },
    {
        text: "Vote",
        link: 'vote',
        icon: <HowToRegIcon />

    },
    {
        text: "Candidate",
        link: 'candidate',
        icon: <PersonIcon />

    },


];

const MenuList = []



export default AdminSide;
