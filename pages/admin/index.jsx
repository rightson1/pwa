import React from "react";
import {
    Box, Button, IconButton, Typography, useTheme, List,
    ListItem,
    ListItemText,
} from "@mui/material";
import Header from "../../components/Title"
import { useGlobalProvider } from "../../context/themeContext";
import StatBox from "../../components/StatBox";
import HowToRegIcon from '@mui/icons-material/HowToReg';
import Voterbox from "../../components/Voterbox";
import { admins as data } from "../../src/data"
import PersonAdd from "@mui/icons-material/PersonAdd";
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import Clock from "../../components/Clock";
import { formatDate } from "fullcalendar";

const Admin = () => {
    const { colors, events } = useGlobalProvider()
    return <Box m="1rem">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
        <Box
            display="grid"
            gridTemplateColumns="repeat(12, 1fr)"
            gap="20px"
            gridAutoRows="120px"
            my={3}
        >


            <Voterbox
                title="400"
                subtitle="Registered Voters"
                progress="0.75"
                increase="50%"
                icon={
                    <HowToRegIcon
                        sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                    />
                }
            />
            <Voterbox
                title="6"
                subtitle="Electrol Positions"
                progress="0.3"
                increase="50%"
                icon={
                    <HowToVoteIcon
                        sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                    />
                }
            />
            <Box
                gridColumn={{ xs: 'span 12', sm: 'span 12', md: 'span 6' }}
                gridRow="span 2"
                backgroundColor={colors.primary[400]}
                overflow="auto"

            >

                <Box display="flex" justifyContent="space-between"
                    alignItems="center" borderBottom={`4px solid  ${colors.primary[500]}`}
                    colors={colors.grey[100]}
                    p="15px"
                >
                    <Typography variant="h5" fontWeight="600" colors={colors.grey[100]}>All Administrators</Typography>
                </Box>
                {data.map((admin, index) => (
                    <Box key={index}
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        borderBottom={`4px solid  ${colors.primary[500]}`}

                        p="15px"
                    >
                        <Box>
                            <Typography
                                color={colors.greenAccent[500]}
                                variant="h5"
                                fontWeight="600"
                            >
                                {admin.id}
                            </Typography>
                            <Typography color={colors.grey[100]}>
                                {admin.name}
                            </Typography>
                        </Box>
                        <Box color={colors.grey[100]}>{admin.email}</Box>
                        <Box
                            backgroundColor={colors.greenAccent[500]}
                            p="5px 10px"
                            borderRadius="4px"
                        >
                            {admin.access}
                        </Box>
                    </Box>
                ))}
            </Box>

            <StatBox
                title="Candidates"
                value={20}
                increase="5.avg"
                description="Per position"
                icon={
                    <PersonAdd
                        sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                    />
                }
            />
            <Box
                gridColumn={{ xs: 'span 12', sm: "span 12", md: "span 6" }}
                gridRow="span 2"
                backgroundColor={colors.primary[400]}
                p="30px"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                }}
            >
                <Typography variant="h5" fontWeight="600">
                    Days To Elections
                </Typography>
                <Box sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    m: 1,
                    flex: "1 1 100%",
                }}>
                    <Clock />
                </Box>
                <Typography
                    variant="h5"
                    color={colors.greenAccent[500]}
                    sx={{ mt: "15px" }}
                >
                    You can change the date in the settings
                </Typography>
            </Box>
            <Box
                gridColumn={{ xs: 'span 12', sm: "span 12", md: "span 6" }}
                gridRow="span 2"
                backgroundColor={colors.primary[400]}
                p="30px"
                sx={{
                    overflow: 'auto',
                    p: "1rem",


                    flex: {
                        sm: undefined,
                        md: "1 1 30%",
                    }

                }}  >
                <Typography>Events</Typography>
                <List
                >
                    {
                        events.map((event) => (
                            <ListItem key={event.id} sx={
                                {
                                    backgroundColor: colors.greenAccent[500],
                                    margin: "10px 0",
                                    borderRadius: "2px",
                                }
                            }>

                                <ListItemText primary={event.title}
                                    secondary={
                                        <Typography>
                                            {formatDate(event.start,
                                                {
                                                    year: "numeric",
                                                    month: "short",
                                                    day: "numeric",
                                                })}
                                        </Typography>
                                    }
                                />
                            </ListItem>
                        )
                        )
                    }

                </List>
            </Box>

        </Box>

    </Box>
};

export default Admin;
