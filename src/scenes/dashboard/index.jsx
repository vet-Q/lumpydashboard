import {Box, Button, IconButton, Stack, Typography, useTheme} from "@mui/material";
import {tokens} from "../../theme";
import {mockTransactions} from "../../data/mockData";
import DownloadOutlineIcon from "@mui/icons-material/DownloadOutlined";
import PointofSaleIcon from "@mui/icons-material/PointOfSale";
import EmailIcon from "@mui/icons-material/Email";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import LineChart from "../../components/Linechart";
import BarChart from "../../components/Barchart";
import GeographyChart from "../../components/Geographychart";
import StatBox from "../../components/StatBox"
import ProgressCircle from "../../components/progressCircle"
import Header from "../../components/header";

const Dashboard = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (<Box m="20px">
        <Box display="flex" justifyContent="space-between" alignment="center">
            <Header title={"DASHBOARD"} subtitle={"Based on WAHIS and Google Scholar Data"}/>
            <Box>
                <Button
                    sx={{
                        backgroundColor: colors.blueAccent[700],
                        color: colors.grey[500],
                        fontSize: "14px",
                        fontweight: "bold",
                        padding: "10px 20px"
                    }}
                >
                    <DownloadOutlineIcon sx={{mr: "10px"}}/>
                    Download Reports
                < /Button>
            </Box>
        </Box>
        {/*  GRID a Chart */}
        <Box
            display="grid"
            gridTemplateColumns="repeat(12,1fr)"
            gridAutoRows="140px"
            gap="20px"
        >
            <Box gridColumn="span 3"
                 backgroundColor={colors.primary[400]}
                 display="flex"
                 alignItems="center"
                 jusfifyContent="center">

                <StatBox
                    title="12361"
                    subtitle="Emails Sent"
                    progress="0.75"
                    increase="+14%"
                    icon={
                        < EmailIcon
                            sx={{color:colors.greenAccent[400], fontSize:"20px"}}
                        />
                    }
                />
            </Box>
            <Box gridColumn="span 3"
                 backgroundColor={colors.primary[400]}
                 display="flex"
                 alignItems="center"
                 jusfifyContent="center">

                <StatBox
                    title="12361"
                    subtitle="Emails Sent"
                    progress="0.75"
                    increase="+14%"
                    icon={
                        < EmailIcon
                            sx={{color:colors.greenAccent[400], fontSize:"20px"}}
                        />
                    }
                />
            </Box>
            <Box gridColumn="span 3"
                 backgroundColor={colors.primary[400]}
                 display="flex"
                 alignItems="center"
                 jusfifyContent="center">

                <StatBox
                    title="12361"
                    subtitle="Emails Sent"
                    progress="0.75"
                    increase="+14%"
                    icon={
                        < EmailIcon
                            sx={{color:colors.greenAccent[400], fontSize:"20px"}}
                        />
                    }
                />
            </Box>
            <Box gridColumn="span 3"
                 backgroundColor={colors.primary[400]}
                 display="flex"
                 alignItems="center"
                 jusfifyContent="center">

                <StatBox
                    title="12361"
                    subtitle="Emails Sent"
                    progress="0.75"
                    increase="+14%"
                    icon={
                        < EmailIcon
                            sx={{color:colors.greenAccent[400], fontSize:"20px"}}
                        />
                    }
                />
            </Box>

        </Box>

    </Box>);
};

export default Dashboard;