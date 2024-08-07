import React, { useRef } from 'react';
import { Box, IconButton, Typography, useTheme, useMediaQuery } from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlineIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import LineChart from "../../components/Linechart";
import StatBox from "../../components/StatBox";
import BumpChart from "../../components/Bumpchart";
import GeographyChart from "../../components/Geographychart";
import BarChart from "../../components/Barchart"; // Import BarChart component
import { downloadImage } from '../../utils/downloadImage';  // 경로를 실제 파일 위치에 맞게 수정하세요
import Topbar from "../global/Topbar";
import { preparedData } from '../../data/preparedData'; // 데이터 가져오기

const Dashboard = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    // preparedData에서 summaryData를 추출
    const { summaryData } = preparedData;

    // Ref 생성 (Create refs)
    const statBoxRef1 = useRef(null);
    const statBoxRef2 = useRef(null);
    const lineChartRef = useRef(null);
    const bumpChartRef = useRef(null);
    const geographyChartRef = useRef(null);
    const barChartRef = useRef(null); // Ref for BarChart

    return (
        <Box m="20px">
            <Topbar title="DASHBOARD" subtitle="Based on WAHIS and Google Scholar Data" />

            {/* Row 1 */}
            <Box mb="20px">
                <Box
                    display="grid"
                    gridTemplateColumns={isMobile ? "1fr" : "repeat(12, 1fr)"}
                    gridAutoRows="200px" // Increase the row height
                    gap="20px"
                >
                    <Box
                        ref={statBoxRef1}
                        gridColumn={isMobile ? "span 12" : "span 3"}
                        backgroundColor={colors.primary[400]}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        position="relative"
                    >
                        <StatBox
                            title={`${summaryData.countries} Countries`}
                            subtitle={`Total Outbreaks: ${summaryData.totalOutbreaks}`}
                            progress={summaryData.totalOutbreaksToday / summaryData.totalOutbreaks}
                            increase={`+${summaryData.increaseFromYesterday} since yesterday`}
                        />
                    </Box>
                    <Box
                        ref={statBoxRef2}
                        gridColumn={isMobile ? "span 12" : "span 3"}
                        backgroundColor={colors.primary[400]}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        position="relative"
                    >
                        <StatBox
                            title={`${summaryData.countries} Countries`}
                            subtitle={`Total Outbreaks: ${summaryData.totalOutbreaks}`}
                            progress={summaryData.totalOutbreaksToday / summaryData.totalOutbreaks}
                            increase={`+${summaryData.increaseFromYesterday} since yesterday`}
                            icon={<EmailIcon sx={{ color: colors.greenAccent[400], fontSize: "20px" }} />}
                        />
                    </Box>
                    <Box
                        ref={barChartRef}
                        gridColumn={isMobile ? "span 12" : "span 6"} // Adjust the span if needed
                        backgroundColor={colors.primary[400]}
                        position="relative"
                    >
                        <Box
                            mt="5px"
                            p="0 20px" // Adjust padding
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Box>
                                <Typography variant="h3" fontWeight="600" color={colors.grey[200]}>
                                    LSD Outbreaks by Continent
                                </Typography>
                            </Box>
                            <Box>
                                <IconButton>
                                    <DownloadOutlineIcon
                                        onClick={() => downloadImage(barChartRef, 'barChart.jpg')}
                                        sx={{ fontSize: "26px", color: colors.grey[400] }}
                                    />
                                </IconButton>
                            </Box>
                        </Box>
                        <Box height="180px" ml="-20px"> {/* Adjust the height to match StatBox */}
                            <BarChart isDashboard={true} />
                        </Box>
                    </Box>
                </Box>
            </Box>

            {/* Row 2 */}
            <Box mb="20px">
                <Box
                    display="grid"
                    gridTemplateColumns={isMobile ? "1fr" : "repeat(12, 1fr)"}
                    gap="20px"
                >
                    <Box
                        ref={lineChartRef}
                        gridColumn={isMobile ? "span 12" : "span 8"}
                        gridRow="span 2"
                        backgroundColor={colors.primary[400]}
                        position="relative"
                    >
                        <Box
                            mt="15px"
                            p="0 30px"
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Box>
                                <Typography variant="h3" fontWeight="600" color={colors.grey[200]}>
                                    LSD outbreak number per year
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
                        gridColumn={isMobile ? "span 12" : "span 4"}
                        gridRow="span 2"
                        backgroundColor={colors.primary[400]}
                        position="relative"
                    >
                        <Box
                            mt="15px"
                            p="0 20px"
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Box>
                                <Typography variant="h3" fontWeight="600" color={colors.grey[200]}>
                                    Rank of LSD outbreak
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
                    gridTemplateColumns={isMobile ? "1fr" : "repeat(12, 1fr)"}
                    gap="20px"
                >
                    <Box
                        gridColumn={isMobile ? "span 12" : "span 8"}
                        gridRow="span 2"
                        backgroundColor={colors.primary[400]}
                        position="relative"
                    >
                        <Box
                            mt="15px"
                            p="0 30px"
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Box>
                                <Typography variant="h3" fontWeight="600" color={colors.grey[200]}>
                                    Revenue Generated
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
                        gridColumn={isMobile ? "span 12" : "span 4"}
                        gridRow="span 2"
                        backgroundColor={colors.primary[400]}
                        position="relative"
                        ref={geographyChartRef}
                        overflow="hidden" // 이 부분을 추가하여 지도가 삐져나오지 않도록 합니다.
                    >
                        <Box
                            mt="15px"
                            p="0 30px"
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Box>
                                <Typography variant="h3" fontWeight="600" color={colors.grey[200]}>
                                    LSD outbreak Choropleth
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
