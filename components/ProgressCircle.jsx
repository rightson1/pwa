import React from "react";
import { Box, Typography, useTheme } from "@mui/material"
import Flex from "./Flex"
import { useGlobalProvider } from "../context/themeContext";
const ProgressCircle = ({ progress = ".75", size = "40" }) => {
    const { colors } = useGlobalProvider()
    const angle = 360 * progress;

    return <Box
        sx={{
            background: `radial-gradient(${colors.primary[400]} 55%, transparent 56%),
            conic-gradient(transparent 0deg ${angle}deg, ${colors.blueAccent[500]} ${angle}deg 360deg),
            ${colors.greenAccent[500]}`,
            borderRadius: "50%",
            width: `${size}px`,
            height: `${size}px`,
        }}

    />
};

export default ProgressCircle;
