import * as React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Item from "../styled-paper";
import DashboardPieChart from "./dashboard-pie-chart";
import { Button, Stack, Typography } from "@mui/material";
import MonthlyIncome from "./monthly-income";

export default function DashboardMonthlyStat() {
    // const ref: any = React.useRef(null);
    // const [width, setWidth] = React.useState(0);

    // React.useEffect(() => {
    //     // when the component gets mounted
    //     console.log("refef", ref);
    //     setWidth(ref.current?.offsetWidth);
    //     // to handle page resize
    //     const getwidth = () => {
    //         setWidth(ref.current?.offsetWidth);
    //     };
    //     window.addEventListener("resize", getwidth);
    //     // remove the event listener before the component gets unmounted
    //     return () => window.removeEventListener("resize", getwidth);
    // }, []);

    // console.log("width", width);

    return (
        <Grid
            xs={12}
            container
            spacing={2}
            direction={"column"}
            p={1}
            sx={{ width: "-webkit-fill-available" }}
            rowSpacing={3}
        >
            <Grid xs={12} pt={4}>
                <Typography variant="h6" fontWeight={400}>
                    This Month Statistics
                </Typography>
                <Typography variant="caption">
                    Tue, 14 Nov, 2024, 11.30 AM
                </Typography>
            </Grid>
            <Grid xs={12}>
                <Item>
                    <MonthlyIncome />
                </Item>
            </Grid>
            <Grid xs={12}>
                <Item sx={{p:2}}>
                    <Stack direction={"row"} justifyContent={"space-between"} mb={3}>
                        <Typography variant="h6" fontWeight={500}>
                            Available Books
                        </Typography>
                        <Button variant="outlined" disabled size="small">
                            Today
                        </Button>
                    </Stack>
                    <DashboardPieChart />
                </Item>
            </Grid>
        </Grid>
    );
}
