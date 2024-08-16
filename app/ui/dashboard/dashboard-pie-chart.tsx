import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { Box, Stack, Typography } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";

const data: {
    id: number;
    value: number;
    label: string;
    color: "green" | "blue" | "red";
}[] = [
    { id: 1, value: 20, label: "Self Help", color: "green" },
    { id: 0, value: 54, label: "Fiction", color: "blue" },
    { id: 2, value: 26, label: "Business", color: "red" },
];

const palette = ["green", "blue", "red"];

export default function DashboardPieChart() {
    return (
        <>
            <Box
                // minWidth={260}
                // ref={ref}
                sx={{
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                    ">div >svg": {
                        width: "150px",
                        height: "150px",
                    },
                }}
            >
                <PieChart
                    colors={palette}
                    sx={{
                        "& .MuiPieArc-root": {
                            strokeWidth: "0",
                        },
                    }}
                    series={[
                        {
                            data,
                            // highlightScope: { faded: 'global', highlighted: 'item' },
                            // faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                            innerRadius: 53,
                            outerRadius: 73,
                            // startAngle: 70,
                            cx: 70,
                            //     ((width > 260 ? width : 260) - (width > 260 ? 190 : 146)) /
                            //     (width > 260 ? 1.08 : 1.2),
                            // cy: 120,
                            startAngle: -400,
                            endAngle: 360,
                        },
                    ]}
                    slotProps={{
                        legend: {
                            // direction: 'column',
                            // position: { vertical: 'bottom', horizontal: 'left' },
                            // padding: 0,
                            hidden: true,
                        },
                    }}
                    height={150}
                    width={150}
                />
            </Box>

            <Box mt={3}>
                {[...data]
                    .sort(function (a, b) {
                        return a.id - b.id;
                    })
                    .map((tempData) => {
                        return (
                            <Stack
                                key={tempData.id}
                                direction={"row"}
                                spacing={2}
                                alignItems={"center"}
                                justifyContent={"space-between"}
                            >
                                <Stack
                                    direction={"row"}
                                    spacing={2}
                                    alignItems={"center"}
                                >
                                    <CircleIcon
                                        fontSize="inherit"
                                        sx={{
                                            color: tempData.color,
                                        }}
                                    />{" "}
                                    <Typography
                                        sx={{ textTransform: "capitalize" }}
                                    >
                                        {tempData.label.toLowerCase()}
                                    </Typography>
                                </Stack>

                                <Typography>{tempData.value}</Typography>
                            </Stack>
                        );
                    })}
            </Box>
        </>
    );
}
