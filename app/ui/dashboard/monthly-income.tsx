import { Box, Chip, Divider, Stack, Typography } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

export default function MonthlyIncome() {
    return (
        <Box p={1} pt={0}>
            <Stack direction={"row"} justifyContent={"space-between"} pb={2}>
                <Typography>Income</Typography>
                <Chip label="This Month" />
            </Stack>

            <Divider variant="middle" />

            <Stack direction={"row"} spacing={2} alignItems={"center"} py={2}>
                <Typography variant="h6" fontWeight={800} color={"#000"}>
                    ETB 9460.00
                </Typography>
                <Typography variant="subtitle2" color={"error"} display={"inline-flex"}>
                    <ArrowDownwardIcon fontSize="small" />
                    <span>  1.5%</span>
                </Typography>
            </Stack>

            <Typography>Compared to ETB 9940 last month</Typography>

            <Stack direction={"row"} py={2} justifyContent={"space-between"}>
                <Typography variant="body1" fontWeight={400}>
                    Last Month Income
                </Typography>
                <Typography variant="body1" fontWeight={400}>
                    ETB 25658.00
                </Typography>
            </Stack>
        </Box>
    );
}
