import React, { useState, useEffect } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { useGlobalProvider } from "../context/themeContext";
import useClock from "./useClock";
import { useTimeQuery } from "../util/useTime";
function ClockParent() {
    const { data } = useTimeQuery()


    const { timerDays, timerHours, timerMinutes, timerSeconds } = useClock({ data });
    const { colors, isMobileSmall } = useGlobalProvider();
    const handleSlice = (str) => {
        if (isMobileSmall) {
            return str.slice(0, 5)
        }
        return str
    }
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
                <Typography variant="h3" fontWeight="600">{timerDays > 0 ? timerDays : 0}</Typography>
                <Typography variant="h6" fontWeight="400" color={colors.primary[100]}>{handleSlice('Days')}</Typography>
            </Box>
            <Typography variant="h3" fontWeight="500" color={colors.primary[100]}>:</Typography>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                p: "1rem",


            }}>
                <Typography variant="h3" fontWeight="600">{timerHours > 0 ? timerHours : 0}</Typography>
                <Typography variant="h6" fontWeight="400" color={colors.primary[100]}>{handleSlice('Hours')}</Typography>
            </Box>
            <Typography variant="h3" fontWeight="500" color={colors.primary[100]}>:</Typography>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                p: "1rem",


            }}>
                <Typography variant="h3" fontWeight="600">{timerMinutes > 0 ? timerMinutes : 0}</Typography>
                <Typography variant="h6" fontWeight="400" color={colors.primary[100]}>{isMobileSmall ? 'Mins' : 'Minutes'}</Typography>
            </Box>
            <Typography variant="h3" fontWeight="500" color={colors.primary[100]}>:</Typography>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                p: "1rem",


            }}>
                <Typography variant="h3" fontWeight="600">{timerSeconds > 0 ? timerSeconds : 0}</Typography>
                <Typography variant="h6" fontWeight="400" color={colors.primary[100]}>{isMobileSmall ? 'Sec' : 'Seconds'}</Typography>
            </Box>

        </Box>
    );
}

export default ClockParent;