import React, { useRef } from 'react';
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlineIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import LineChart from "../../components/Linechart";
import StatBox from "../../components/StatBox";
import BumpChart from "../../components/Bumpchart";
import GeographyChart from "../../components/Geographychart";
import { downloadImage } from '../../utils/downloadImage';  // 경로를 실제 파일 위치에 맞게 수정하세요
import Topbar from "../global/Topbar";

const Dashboard = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    // Ref 생성 (Create refs)
    const statBoxRef1 = useRef(null);
    const statBoxRef2 = useRef(null);
    const statBoxRef3 = useRef(null);
    const statBoxRef4 = useRef(null);
    const lineChartRef = useRef(null);
    const bumpChartRef = useRef(null);
    const geographyChartRef = useRef(null);

    return (
            <Box m="20px">
                <Topbar title="DASHBOARD" subtitle="Based on WAHIS and Google Scholar Data" />
            {/* Row 1 */}
            <Box mb="20px">
                <Box
                    display="grid"
                    gridTemplateColumns="repeat(12, 1fr)"
                    gridAutoRows="140px"
                    gap="20px"
                >
                    <Box
                        ref={statBoxRef1}
                        gridColumn="span 3"
                        backgroundColor={colors.primary[400]}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        position="relative"
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
                        ref={statBoxRef2}
                        gridColumn="span 3"
                        backgroundColor={colors.primary[400]}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        position="relative"
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
                        ref={statBoxRef3}
                        gridColumn="span 3"
                        backgroundColor={colors.primary[400]}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        position="relative"
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
                        ref={statBoxRef4}
                        gridColumn="span 3"
                        backgroundColor={colors.primary[400]}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        position="relative"
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
                        ref={lineChartRef}
                        gridColumn="span 8"
                        gridRow="span 2"
                        backgroundColor={colors.primary[400]}
                        position="relative"
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
                                        onClick={() => downloadImage(lineChartRef, 'lineChart.jpg')}
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
                        ref={bumpChartRef}
                        gridColumn="span 4"
                        gridRow="span 2"
                        backgroundColor={colors.primary[400]}
                        position="relative"
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
                                        onClick={() => downloadImage(bumpChartRef, 'bumpChart.jpg')}
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
                        position="relative"
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
                                        onClick={() => downloadImage(geographyChartRef, 'geographyChart.jpg')}
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
                        position="relative"
                        ref={geographyChartRef}
                        overflow="hidden" // 이 부분을 추가하여 지도가 삐져나오지 않도록 합니다.
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
                                        onClick={() => downloadImage(geographyChartRef, 'geographyChart.jpg')}
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
