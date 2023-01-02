import React, { useState, useEffect } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { useGlobalProvider } from "../context/themeContext";
import useClock from "./useClock";
import { useTimeQuery } from "../util/useTime";
function ClockParent() {
    const { data } = useTimeQuery()


    const { timerDays, timerHours, timerMinutes, timerSeconds } = useClock({ data });
    const { colors } = useGlobalProvider();
    return (
        <Box display="flex" sx={{
            justifyContent: "center",
            alignItems: "center",
            textShadow: "1px 1px 7px",
            color: "#06f1f6",
            width: "100%",
            height: "100%",
            borderRadius: "15px",

        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                p: "1rem",
            }}>
                <Typography variant="h3" fontWeight="600">{timerDays ? timerDays : 0}</Typography>
                <Typography variant="h6" fontWeight="400" color={colors.primary[100]}>Days</Typography>
            </Box>
            <Typography variant="h3" fontWeight="500" color={colors.primary[100]}>:</Typography>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                p: "1rem",


            }}>
                <Typography variant="h3" fontWeight="600">{timerHours ? timerHours : 0}</Typography>
                <Typography variant="h6" fontWeight="400" color={colors.primary[100]}>Hours</Typography>
            </Box>
            <Typography variant="h3" fontWeight="500" color={colors.primary[100]}>:</Typography>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                p: "1rem",


            }}>
                <Typography variant="h3" fontWeight="600">{timerMinutes ? timerMinutes : 0}</Typography>
                <Typography variant="h6" fontWeight="400" color={colors.primary[100]}>Minutes</Typography>
            </Box>
            <Typography variant="h3" fontWeight="500" color={colors.primary[100]}>:</Typography>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                p: "1rem",


            }}>
                <Typography variant="h3" fontWeight="600">{timerSeconds ? timerSeconds : 0}</Typography>
                <Typography variant="h6" fontWeight="400" color={colors.primary[100]}>Minutes</Typography>
            </Box>

        </Box>
    );
}

export default ClockParent;