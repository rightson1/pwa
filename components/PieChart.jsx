import { ResponsivePie } from "@nivo/pie";
import React, { useMemo } from "react";
import { useTheme } from "@mui/material";
import { pie as data } from "../src/data";
import { useGlobalProvider } from "../context/themeContext";
import { Box, Typography } from "@mui/material";
const PieChart = ({ votes, isDashboard }) => {
    const { colors } = useGlobalProvider();
    const [total, setTotal] = React.useState(0);
    const pieColors = [
        "hsl(344, 70%, 50%)",
        "hsl(229, 70%, 50%)",
        "hsl(291, 70%, 50%)",
        "hsl(162, 70%, 50%)",
        "hsl(150,0%, 30%)",
        "hsl(150, 70%, 50%)",
        "hsl(104, 70%, 50%)",
        "hsl(0, 70%, 50%)",
    ]
    const data = useMemo(() => {
        const data = []
        let totalVotes = 0
        votes.map((vote, index) => {
            totalVotes += vote.count
            setTotal(totalVotes)
            data.push({
                id: vote._id,
                label: vote._id,
                value: vote.count,
                color: pieColors[index]
            })
        })
        return data
    }, [votes])

    return (
        <Box height={isDashboard ? "400px" : "100%"}
            width={undefined}
            minHeight={isDashboard ? "325px" : undefined}
            minWidth={isDashboard ? "325px" : undefined}
            position="relative">
            <ResponsivePie
                data={data}
                theme={{
                    axis: {
                        domain: {
                            line: {
                                stroke: colors.grey[100],
                            },
                        },
                        legend: {
                            text: {
                                fill: colors.grey[100],
                            },

                        },
                        ticks: {
                            line: {
                                stroke: colors.grey[100],
                                strokeWidth: 1,
                            },
                            text: {
                                fill: colors.grey[100],
                            },
                        },
                    },
                    legends: {
                        text: {
                            fill: colors.grey[100],
                        },
                    },
                    tooltip: {
                        container: {
                            color: colors.grey[400],
                        },
                    },
                }}
                margin={
                    isDashboard
                        ? { top: 40, right: 80, bottom: 100, left: 50 }
                        : { top: 40, right: 80, bottom: 80, left: 80 }
                }
                sortByValue={true}
                innerRadius={0.45}
                activeOuterRadiusOffset={8}
                borderWidth={1}
                cornerRadius={3}
                borderColor={{
                    from: "color",
                    modifiers: [["darker", 0.2]],
                }}
                enableArcLinkLabels={!isDashboard}
                arcLinkLabelsTextColor={colors.grey[100]}
                arcLinkLabelsThickness={2}
                arcLinkLabelsColor={{ from: "color" }}
                arcLabelsSkipAngle={10}
                arcLabelsTextColor={{
                    from: "color",
                    modifiers: [["darker", 2]],
                }}
                legends={[
                    {
                        anchor: "bottom",
                        direction: "row",
                        justify: false,
                        translateX: isDashboard ? 20 : 0,
                        translateY: isDashboard ? 50 : 56,
                        itemsSpacing: 0,
                        itemWidth: 85,
                        itemHeight: 18,
                        itemTextColor: "#999",
                        itemDirection: "left-to-right",
                        itemOpacity: 1,
                        symbolSize: 18,
                        symbolShape: "circle",
                        effects: [
                            {
                                on: "hover",
                                style: {
                                    itemTextColor: "#000",
                                },
                            },
                        ],
                    },
                ]}

            />
            <Box
                position="absolute"
                top="50%"
                left="50%"
                color={colors.grey[100]}
                textAlign="center"
                pointerEvents="none"
                sx={{
                    transform: isDashboard
                        ? "translate(-75%, -170%)"
                        : "translate(-50%, -130%)",
                }}
            >
                <Typography variant="h6" color={colors.redAccent[200]}>
                    Total: {total}
                </Typography>
            </Box>
        </Box>
    );
};

export default PieChart;