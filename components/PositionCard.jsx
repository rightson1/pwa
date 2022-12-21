import React, { useState } from "react";
import { useGlobalProvider } from "../context/themeContext";
import AdminPanelSettings from "@mui/icons-material/AdminPanelSettings";
import {
    Box,
    Card,
    CardActions,
    CardContent,
    Collapse,
    Button,
    Typography,
    Rating,
    IconButton,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import Flex from "./Flex"
const PositionCard = ({ id, adminName, desc, position }) => {
    const { colors, mode, dispatch, actionTypes, isMobile, open, setOpen } = useGlobalProvider();
    const [isExpanded, setIsExpanded] = useState(false);
    return (
        <Card
            sx={{
                backgroundImage: "none",
                backgroundColor: colors.primary[400],
                borderRadius: ".55rem",

            }}
        >
            <CardContent
            >
                <Box display="flex" justifyContent="space-between" >
                    <Box>
                        <AdminPanelSettings sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />

                    </Box>
                    <Box>
                        <Typography
                            variant="h6"
                            sx={{ color: colors.grey[100] }}
                        >
                            {adminName}
                        </Typography>
                    </Box>
                </Box>
                <Box display="flex" justifyContent="start" mt={2}>

                    <Typography
                        variant="h4"
                        fontWeight="bold"
                        sx={{ color: colors.grey[100] }}
                    >
                        {position}
                    </Typography>
                </Box>


            </CardContent>
            <CardActions display="flex" sx={{
                flexDirection: "column",
                alignItems: "flex-start",
            }} >
                <Flex >
                    <Button
                        variant="primary"
                        size="small"
                        onClick={() => setIsExpanded(!isExpanded)}
                    >See More</Button>
                    <Button
                        variant="primary"
                        size="small"
                        onClick={() => setIsExpanded(!isExpanded)}
                    >View Position</Button>
                </Flex>
                <Collapse
                    in={isExpanded}
                    timeout="auto"
                    unmountOnExit
                    sx={{

                    }}
                >
                    <CardContent>

                        <Typography>Description :{desc}</Typography>

                    </CardContent>

                </Collapse>
            </CardActions>
        </Card>
    )
};

export default PositionCard;
