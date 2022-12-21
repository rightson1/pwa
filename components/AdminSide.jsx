import React from "react";
import { styled, useTheme } from '@mui/material/styles';
import { useGlobalProvider } from "../context/themeContext";
import Box from '@mui/material/Box';
import Button from "@mui/material";
import MuiDrawer from '@mui/material/Drawer'
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListIcon from '@mui/icons-material/List';
import ListItemText from '@mui/material/ListItemText';
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { Avatar, Tooltip, useMediaQuery } from '@mui/material';
import profile from '../public/avatar.png'
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import MessageOutlined from "@mui/icons-material/MessageOutlined";
import AddIcon from '@mui/icons-material/Add';
import ChevronRight from "@mui/icons-material/ChevronRightOutlined";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { useRouter } from "next/router";
const drawerWidth = 240;





const AdminSide = () => {

    const { colors, mode, dispatch, actionTypes, open, setOpen, isMobile } = useGlobalProvider();
    const theme = useTheme();
    const [selected, setSelected] = React.useState()
    const [active, setActive] = React.useState(false)
    const [openDrawer, setOpenDrawer] = React.useState(false);
    const router = useRouter()
    React.useEffect(() => {
        if (open) {
            setOpenDrawer(true)

        }
        else if (!isMobile) {
            setOpenDrawer(true)

        } else if (isMobile) {
            setOpenDrawer(false)
        }
    }, [isMobile, open])

    const handleDrawerClose = () => {
        setOpen(false);
    };




    return <Box sx={{
        display: "flex",
        flexGrow: 1,
    }}>

        {
            openDrawer && (
                <Drawer
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
                    {open &&
                        (<>



                            <Box display="flex" justifyContent="space-between" alignItems="center" p="1rem">

                                <Typography>
                                    ADMINS
                                </Typography>
                                <IconButton onClick={handleDrawerClose}>
                                    {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                                </IconButton>
                            </Box>
                            <Box gap={1} display="flex" p="1rem" flexDirection="column" alignItems="center">
                                <Avatar src='/avatar.png' sx={{
                                    width: '90px',
                                    height: "90px"
                                }} />
                                <Typography variant='h3' fontWeight="bold">
                                    ED ROH
                                </Typography>
                                <Typography variant='h6' fontWeight="bold" mt="-10px" color={colors.greenAccent[400]}>
                                    VP FANCE ADMIN
                                </Typography>

                            </Box>

                        </>)

                    }
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
                                router.push(`/admin/${link}`)
                                isMobile && setTimeout(() => {
                                    setOpen(false)
                                }, 1000)
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



                </Drawer>
            )
        }

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
        link: 'faq',
        icon: <HelpOutlineOutlinedIcon />,
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
        text: "Forms",

    },


    {
        text: "New Position",
        link: "new-position",
        icon: <AddCircleOutlineIcon />,
    },
    {
        text: "New Candidate",
        link: "new-candidate",
        icon: <AddIcon />,
    },
    {
        text: "New FAQ",
        link: "new-faq",
        icon: <HelpOutlineOutlinedIcon />,
    },
    {
        text: 'New Notification',
        link: "new-notification",
        icon: <NotificationsNoneIcon />

    },

    {
        text: 'Results',


    }, {
        text: 'Results Bar Chart',
        link: 'bar-chart',
        icon: <BarChartOutlinedIcon />

    }, {
        text: 'Results Pie Chart',
        link: 'pie-chart',
        icon: <PieChartOutlineOutlinedIcon />


    }

];

const MenuList = []



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
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
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

export default AdminSide;
