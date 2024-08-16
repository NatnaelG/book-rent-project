"use client";

import DynamicTable from "@/app/component/dynamic-table";
import Item from "../../ui/styled-paper";

export default function Owners() {
    return (
        <Item sx={{ p: 2, 

            "& .MuiPaper-root:has(.MuiTableContainer-root)": {
                boxShadow: "none"
              }
         }}>
            {/* <DashboardTable /> */}
            <DynamicTable />
        </Item>
    );
}
