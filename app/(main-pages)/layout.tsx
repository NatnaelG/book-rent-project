"use client"
// import SideNav from "@/app/ui/dashboard/sidenav";
import { Box } from "@mui/material";
import ResponsiveDrawer from "../ui/dashboard/side-drawer";
import Toolbar from "@mui/material/Toolbar";
import { updateAbility } from "../lib/updateAbilities";
import { getUserBySession, User } from "../lib/actions";
import React from "react";

export default  function Layout({ children }: { children: React.ReactNode }) {
  const drawerWidth = 279;

  // const user = fetch(getUserBySession()).then((res) => res)
  // const cookieStore = cookies()
  // const theme = cookieStore.get('session')

  // console.log("hihihihihi", theme)

  // if (user === null) return;
  //   updateAbility(user)

  const [user, setUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const fetchedData = await getUserBySession();
        console.log("Fetched data SERVER ACTION INGRESOS:", typeof fetchedData, JSON.stringify(fetchedData));
        setUser(fetchedData);
        fetchedData !== null && localStorage.setItem("user", JSON.stringify(fetchedData))
      } catch (error) {
        console.error("Error fetching data SERVER ACTION INGRESOS:", error);
      }
    }
    fetchData();
  }, []);

if (user === null) return <></>
localStorage.setItem("user", JSON.stringify(user))
  return (
    <Box sx={{ display: "flex" }}>
      {/* <>{console.log("hihihihihi", theme)}</> */}
      <ResponsiveDrawer drawerWidth={drawerWidth} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          // mt: "10px",
          height: "-webkit-fill-available"
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
