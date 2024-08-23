"use client";

import Grid from "@mui/material/Unstable_Grid2";
import DashboardTable from "../../ui/dashboard/dashboard-table";
import DashboardAreaChart from "../../ui/dashboard/dashboard-area-chart";
import DashboardMonthlyStat from "../../ui/dashboard/dashboard-monthly-stat";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
// import DynammicTableProvider from "../component/dynamic-table";

import Item from "../../ui/styled-paper";
import { Can } from "@/app/lib/can";

import { cookies } from 'next/headers'
import { getUserBySession, User } from "@/app/lib/actions";
import defineAbilityFor from "@/app/lib/ability";

export default function Dashboard() {
  const pathname = usePathname();
  const { replace } = useRouter();

  // const cookieStore = cookies()
  // const theme = cookieStore.get('session')

  const user: User = JSON.parse(localStorage.getItem("user") || "{}");
  if (user !== null) {
  }
  
  
      const ability = defineAbilityFor(user)
      console.log("CASL CHECK", ability.can("upload", "Book"), user, ability)

// console.log("hihihihihihihi", document.cookie)
  useEffect(() => {
    if (pathname === "/register") {
      replace(`/dashboard`);
    }
  }, [pathname]);

  return (
    // <Can I="create" a="Owner">
      
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
    // {/* </Can> */}
  );
}
