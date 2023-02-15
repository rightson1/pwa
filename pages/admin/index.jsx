import React, { useEffect } from "react";
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
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { useAdminQuery } from "../../util/useAdmin";
import { useEventsQuery } from "../../util/useEvents";
import { useTimeQuery } from "../../util/useTime";
import { useAuth } from "../../context/authContext";
import { useRouter } from "next/router";
import { useVotersQuery } from "../../util/useVoter";
import { useCandidatesQuery } from "../../util/useCandidate"
import { usePositionsQuery } from "../../util/usePositions";
import Link from "next/link";
import CopyRight from "../../components/CopyRight";
const Admin = () => {
    const { colors, isMobile } = useGlobalProvider()
    const { data: positions } = usePositionsQuery();
    const { admin } = useAuth()
    const { data: admins, isLoading } = useAdminQuery();
    const { data: events, isLoading: loading } = useEventsQuery()
    const { data: time } = useTimeQuery()
    const { data: voters } = useVotersQuery()
    const { data: candidates } = useCandidatesQuery()
    const router = useRouter();
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
                title={voters ? voters?.length : 'loading..'}
                subtitle="Registered Voters"
                progress={voters ? `${(voters?.length / 600)}` : '.2'}
                increase={voters ? `${Math.floor((voters?.length / 600) * 100)}%` : '50%'}
                icon={
                    <HowToRegIcon
                        sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                    />
                }
            />
            <Voterbox
                title={positions ? positions?.length : '3'}
                subtitle="Electrol Positions"
                progress="0.3"
                increase={positions ? `${Math.floor((positions?.length / 15) * 100)}%` : '50%'}
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
                {admins?.length > 0 ? admins?.map((admin, index) => {
                    return (


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
                                    {index + 1}
                                </Typography>
                                <Typography color={colors.grey[100]}>
                                    {isMobile ? admin?.name.split(' ')[0] : admin?.name}
                                </Typography>
                            </Box>
                            <Box sx={{

                            }} color={colors.grey[100]}>

                                {isMobile ? admin?.email.slice(0, 15) + '..' : admin?.email}
                            </Box>

                            <Box
                                backgroundColor={colors.greenAccent[500]}
                                p="5px 10px"
                                borderRadius="4px"
                            >
                                {admin?.role}
                            </Box>
                        </Box>
                    )
                }) : (
                    <>
                        <Skeleton variant="rectangular" width="100%" height={10} />
                        {
                            [1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => (
                                <Stack spacing={.5} key={index} mb="2rem">

                                    <Skeleton variant="rectangular" width="100%" height={10} />
                                    <Skeleton variant="rounded" width="100%" height={60} />
                                </Stack>
                            ))
                        }
                    </>
                )
                }
            </Box>

            <StatBox
                title="Candidates"
                value={candidates ? candidates?.length : 'loading..'}
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
                    <Link href={'/admin/settings'}>   You can change the date in the settings</Link>
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
                    {events?.length > 0 ?
                        events?.map((event) => (
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
                        ) : loading ? <>
                            {
                                [1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => (
                                    <Stack spacing={.5} key={index} mb="2rem">
                                        <Skeleton variant="rounded" width="100%" height={60} />
                                    </Stack>
                                ))
                            }
                        </> : <Typography color={colors.grey[100]}>No Events Added</Typography>
                    }

                </List>
            </Box>

        </Box>
        <CopyRight dashboard={true} />
    </Box>
};
Admin.getLayout = (page) => {
    return <>
        {page}
    </>
}
Admin.admin = true


export default Admin;