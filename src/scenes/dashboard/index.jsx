import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlineIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import LineChart from "../../components/Linechart";
import StatBox from "../../components/StatBox";
import Header from "../../components/header";
import BumpChart from "../../components/Bumpchart";
import GeographyChart from "../../components/Geographychart";

const Dashboard = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title={"DASHBOARD"} subtitle={"Based on WAHIS and Google Scholar Data"} />
                <Box>
                    <Button
                        sx={{
                            backgroundColor: colors.blueAccent[700],
                            color: colors.grey[500],
                            fontSize: "14px",
                            fontWeight: "bold",
                            padding: "10px 20px"
                        }}
                    >
                        <DownloadOutlineIcon sx={{ mr: "10px" }} />
                        Download Reports
                    </Button>
                </Box>
            </Box>

            {/* Row 1 */}
            <Box mb="20px">
                <Box
                    display="grid"
                    gridTemplateColumns="repeat(12, 1fr)"
                    gridAutoRows="140px"
                    gap="20px"
                >
                    <Box
                        gridColumn="span 3"
                        backgroundColor={colors.primary[400]}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <StatBox
                            title="12361"
                            subtitle="Emails Sent"
                            progress="0.75"
                            increase="+14%"
                            icon={<EmailIcon sx={{ color: colors.greenAccent[400], fontSize: "20px" }} />}
                        />
                    </Box>
                    <Box
                        gridColumn="span 3"
                        backgroundColor={colors.primary[400]}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <StatBox
                            title="12361"
                            subtitle="Emails Sent"
                            progress="0.75"
                            increase="+14%"
                            icon={<EmailIcon sx={{ color: colors.greenAccent[400], fontSize: "20px" }} />}
                        />
                    </Box>
                    <Box
                        gridColumn="span 3"
                        backgroundColor={colors.primary[400]}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <StatBox
                            title="12361"
                            subtitle="Emails Sent"
                            progress="0.75"
                            increase="+14%"
                            icon={<EmailIcon sx={{ color: colors.greenAccent[400], fontSize: "20px" }} />}
                        />
                    </Box>
                    <Box
                        gridColumn="span 3"
                        backgroundColor={colors.primary[400]}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <StatBox
                            title="12361"
                            subtitle="Emails Sent"
                            progress="0.75"
                            increase="+14%"
                            icon={<EmailIcon sx={{ color: colors.greenAccent[400], fontSize: "20px" }} />}
                        />
                    </Box>
                </Box>
            </Box>

            {/* Row 2 */}
            <Box mb="20px">
                <Box
                    display="grid"
                    gridTemplateColumns="repeat(12, 1fr)"
                    gap="20px"
                >
                    <Box
                        gridColumn="span 8"
                        gridRow="span 2"
                        backgroundColor={colors.primary[400]}
                    >
                        <Box
                            mt="25px"
                            p="0 30px"
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Box>
                                <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
                                    Revenue Generated
                                </Typography>
                                <Typography variant="h3" fontWeight="500" color={colors.grey[500]}>
                                    $59,342,32
                                </Typography>
                            </Box>
                            <Box>
                                <IconButton>
                                    <DownloadOutlineIcon
                                        sx={{ fontSize: "26px", color: colors.grey[400] }}
                                    />
                                </IconButton>
                            </Box>
                        </Box>
                        <Box height="250px" ml="-20px">
                            <LineChart isDashBoard={true} />
                        </Box>
                    </Box>
                    <Box
                        gridColumn="span 4"
                        gridRow="span 2"
                        backgroundColor={colors.primary[400]}
                    >
                        <Box
                            mt="25px"
                            p="0 30px"
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Box>
                                <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
                                    Rank of LSD outbreak
                                </Typography>
                                <Typography variant="h3" fontWeight="500" color={colors.grey[500]}>
                                    $59,342,32
                                </Typography>
                            </Box>
                            <Box>
                                <IconButton>
                                    <DownloadOutlineIcon
                                        sx={{ fontSize: "26px", color: colors.grey[400] }}
                                    />
                                </IconButton>
                            </Box>
                        </Box>
                        <Box height="250px" ml="-20px">
                            <BumpChart isDashBoard={true} />
                        </Box>
                    </Box>
                </Box>
            </Box>

            {/* Row 3 */}
            <Box mt="20px">
                <Box
                    display="grid"
                    gridTemplateColumns="repeat(12, 1fr)"
                    gap="20px"
                >
                    <Box
                        gridColumn="span 8"
                        gridRow="span 2"
                        backgroundColor={colors.primary[400]}
                    >
                        <Box
                            mt="25px"
                            p="0 30px"
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Box>
                                <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
                                    Revenue Generated
                                </Typography>
                                <Typography variant="h3" fontWeight="500" color={colors.grey[500]}>
                                    $59,342,32
                                </Typography>
                            </Box>
                            <Box>
                                <IconButton>
                                    <DownloadOutlineIcon
                                        sx={{ fontSize: "26px", color: colors.grey[400] }}
                                    />
                                </IconButton>
                            </Box>
                        </Box>
                        <Box height="250px" ml="-20px">
                            <LineChart isDashBoard={true} />
                        </Box>
                    </Box>
                    <Box
                        gridColumn="span 4"
                        gridRow="span 2"
                        backgroundColor={colors.primary[400]}
                        overflow="hidden" //지도가 삐져나가지 않도록 하는 기능
                    >
                        <Box
                            mt="25px"
                            p="0 30px"
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"

                        >
                            <Box>
                                <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
                                    Rank of LSD outbreak
                                </Typography>
                                <Typography variant="h3" fontWeight="500" color={colors.grey[500]}>
                                    $59,342,32
                                </Typography>
                            </Box>
                            <Box>
                                <IconButton>
                                    <DownloadOutlineIcon
                                        sx={{ fontSize: "26px", color: colors.grey[400] }}
                                    />
                                </IconButton>
                            </Box>
                        </Box>
                        <Box height="250px" ml="-20px">
                            <GeographyChart isDashBoard={true} />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Dashboard;
