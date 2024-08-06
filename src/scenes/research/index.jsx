import {Box, Typography, useTheme} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import {tokens} from "../../theme";
import Topbar from "../global/Topbar"
import {mockDataResearch} from "../../data/mockData";

const Research = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const columns = [
        {
            field: "id", headerName: "ID", headerAlign: 'center', align: 'center',
            renderCell: (params) => (
                <Box sx={{display: 'flex', alignItems: 'center', height: '100%'}}>
                    <Typography color={colors.grey[100]} variant={"h5"}>
                        {params.value}
                    </Typography>
                </Box>
            )
        },
        {
            field: "name",
            headerName: "Name",
            flex: 1,
            headerAlign: 'center',
            align: 'center',
            cellClassName: "name-column--cell",
            renderCell: (params) => (
                <Box sx={{display: 'flex', alignItems: 'center', height: '100%'}}>
                    <Typography color={colors.grey[100]} variant={"h5"}>
                        {params.value}
                    </Typography>
                </Box>
            )
        },
        {
            field: "link",
            headerName: "Link",
            flex: 1,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => (
                <a href={params.value} target="_blank" rel="noopener noreferrer">
                    <Box
                        width="150%" // 너비 조정
                        m="0 auto"
                        p="5px"
                        display="flex"
                        justifyContent="center"
                        backgroundColor={colors.greenAccent[600]}
                        borderRadius="4px"
                    >
                        <Typography color={colors.grey[100]} sx={{fontSize: "1rem", ml: "5px"}}> {/* 글꼴 크기 조정 */}
                            Link
                        </Typography>
                    </Box>
                </a>
            ),
        },
    ];

    return (
        <Box m="20px">
            <Topbar title="Research" subtitle="Research Organizations and Links"/>
            <Box
                m="40px 0 0 0"
                height="75vh"
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                        display: 'flex',
                        alignItems: 'center', // 셀 내용의 수직 가운데 정렬
                    },
                    "& .name-column--cell": {
                        color: colors.greenAccent[300],
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: colors.blueAccent[700],
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-columnHeaderTitle": {
                        textAlign: 'center', // 헤더 텍스트 가운데 정렬
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: colors.primary[400],
                    },
                    "& .MuiDataGrid-footerContainer": {
                        borderTop: "none",
                        backgroundColor: colors.blueAccent[700],
                    },
                    "& .MuiCheckbox-root": {
                        color: `${colors.greenAccent[200]} !important`,
                    },
                }}
            >
                <DataGrid checkboxSelection rows={mockDataResearch} columns={columns}/>
            </Box>
        </Box>
    );
};

export default Research;
