"use client";

import Grid from "@mui/material/Unstable_Grid2";
import DashboardTable from "../../ui/dashboard/dashboard-table";
import DashboardAreaChart from "../../ui/dashboard/dashboard-area-chart";
import DashboardMonthlyStat from "../../ui/dashboard/dashboard-monthly-stat";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
// import DynammicTableProvider from "../component/dynamic-table";

import Item from "../../ui/styled-paper";

export default function Dashboard() {
  const pathname = usePathname();
  const { replace } = useRouter();

  useEffect(() => {
    if (pathname === "/register") {
      replace(`/dashboard`);
    }
  }, [pathname]);

  return (
    <Grid container spacing={2}>
      <Grid xs={12} md={8} lg={3}>
        <Item sx={{ height: { lg: `calc(100vh - 100px)`, xs: "fit-content" } }}>
          <DashboardMonthlyStat />
        </Item>
      </Grid>
      <Grid lg={9} xs={12} container spacing={2} direction={"column"}>
        {/* <Item>xs=4</Item> */}
        <Grid xs={12}>
          <Item sx={{ p: 2 }}>
            <DashboardTable />
            {/* <DynammicTableProvider /> */}
          </Item>
        </Grid>
        <Grid xs={12}>
          <Item sx={{ p: 2 }}>
            <DashboardAreaChart />
          </Item>
        </Grid>
      </Grid>
    </Grid>
  );
}
