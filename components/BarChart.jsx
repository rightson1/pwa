import { useEffect, useMemo } from "react";
import { ResponsiveBar } from "@nivo/bar";
import { useGlobalProvider } from "../context/themeContext";

const BarChart = ({ votes, position, isDashboard = false }) => {
    const { isMobile } = useGlobalProvider()

    const data = useMemo(() => {
        let data = { position }
        votes.map((item) => {
            const name = item._id
            data[name] = item.count;
        })
        return [data]
    }, [votes])

    const keys = useMemo(() => {

        return votes.map((item) => item._id)
    }, [votes])



    // const data = [{
    //     position: "President",
    //     "hot dog": 137,
    //     // "hot dogColor": "hsl(229, 70%, 50%)",
    //     burger: 96,
    //     // burgerColor: "hsl(296, 70%, 50%)",
    //     kebab: 72,
    //     // kebabColor: "hsl(97, 70%, 50%)",
    //     donut: 140,
    //     // donutColor: "hsl(340, 70%, 50%)",
    // },
    // ];


    const { colors } = useGlobalProvider()
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
    // const data = useMemo(() => {

    //     const data = []
    //     let totalVotes = 0
    //     votes.map((vote, index) => {
    //         totalVotes += vote.count
    //         setTotal(totalVotes)
    //         data.push({
    //             id: vote._id,
    //             label: vote._id,
    //             value: vote.count,
    //             color: pieColors[index]
    //         })
    //     })
    //     return data
    // }, [votes])

    return (
        <ResponsiveBar
            data={data}
            theme={{
                // added
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
                        color: colors.blueAccent[700],
                    },
                },
            }}
            keys={
                keys
            }
            indexBy="position"
            margin={{ top: 50, right: isMobile ? 70 : 130, bottom: 50, left: isMobile ? 50 : 70 }}
            padding={0.3}
            groupMode="grouped"
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'band', round: true }}
            colors={{ scheme: 'nivo' }}
            defs={[
                {
                    id: 'dots',
                    type: 'patternDots',
                    background: 'inherit',
                    color: '#38bcb2',
                    size: 4,
                    padding: 1,
                    stagger: true
                },
                {
                    id: 'lines',
                    type: 'patternLines',
                    background: 'inherit',
                    color: '#eed312',
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10
                }
            ]}
            fill={[
                {
                    match: {
                        id: 'fries'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: 'sandwich'
                    },
                    id: 'lines'
                }
            ]}
            borderColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        1.6
                    ]
                ]
            }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'position',
                legendPosition: 'middle',
                legendOffset: 32
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'food',
                legendPosition: 'middle',
                legendOffset: -40
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        1.6
                    ]
                ]
            }}
            legends={[
                {
                    dataFrom: 'keys',
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 120,
                    translateY: 0,
                    itemsSpacing: 2,
                    itemWidth: 100,
                    itemHeight: 20,
                    itemDirection: 'left-to-right',
                    itemOpacity: 0.85,
                    symbolSize: 20,
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemOpacity: 1
                            }
                        }
                    ]
                }
            ]}
            role="application"
            ariaLabel="Nivo bar chart demo"
            barAriaLabel={function (e) { return e.id + ": " + e.formattedValue + " in position: " + e.indexValue }}
        />
    );
};

export default BarChart;