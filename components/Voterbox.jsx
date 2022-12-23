import React from "react";
import { Box, Typography, useTheme } from "@mui/material"
import Flex from "./Flex"
import { useGlobalProvider } from "../context/themeContext";
import ProgressCircle from "./ProgressCircle";
const StatBox = ({ title, subtitle, icon, progress, increase }) => {
    const { colors } = useGlobalProvider()
    return <Box gridColumn={{ xs: 'span 12', sm: "span 6", md: "span 3" }}
        backgroundColor={colors.primary[400]}
        display="flex"
        alignItems="center"
        justifyContent="center"
    >
        <Box width="100%" m="0 30px">
            <Box display="flex" justifyContent="space-between">
                <Box>
                    {icon}
                    <Typography
                        variant="h4"
                        fontWeight="bold"
                        sx={{ color: colors.grey[100] }}
                    >
                        {title}
                    </Typography>
                </Box>
                <Box>
                    <ProgressCircle progress={progress} />
                </Box>
            </Box>
            <Box display="flex" justifyContent="space-between" mt="2px">
                <Typography variant="h5" sx={{ color: colors.greenAccent[500] }}>
                    {subtitle}
                </Typography>
                <Typography
                    variant="h5"
                    fontStyle="italic"
                    sx={{ color: colors.greenAccent[600] }}
                >
                    {increase}
                </Typography>
            </Box>
        </Box>

    </Box>
}
export default StatBox