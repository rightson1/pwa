import React from "react";
import { Box, Typography, useTheme } from "@mui/material"
import Flex from "./Flex"
import { useGlobalProvider } from "../context/themeContext";
const StatBox = ({ title, value, increase, icon, description }) => {
    const { colors } = useGlobalProvider()

    return (
        <Box
            gridColumn={{ xs: 'span 12', sm: "span 12", md: "span 6" }}
            backgroundColor={colors.primary[400]}
            gridRow="span 1"
            display="flex"
            flexDirection="column"
            borderRadius="0.55rem"
            justifyContent="space-between"
            p="1.25rem 1rem"
            flex="1 1 100%"

        >
            <Flex>
                <Typography variant="h6" sx={{ color: colors.grey[100] }}>
                    {title}
                </Typography>
                {icon}
            </Flex>

            <Typography
                variant="h3"
                fontWeight="600"
                sx={{ color: colors.grey[100] }}
            >
                {value}
            </Typography>
            <Flex gap="1rem">
                <Typography
                    variant="h5"
                    fontStyle="italic"
                    sx={{ color: colors.greenAccent[500] }}
                >
                    {increase}
                </Typography>
                <Typography sx={{ color: colors.greenAccent[600] }}>{description}</Typography>
            </Flex>
        </Box>
    )
};

export default StatBox;
