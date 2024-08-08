import React, {useEffect, useState} from 'react';
import {Box, Typography, useTheme} from '@mui/material';
import {DataGrid} from '@mui/x-data-grid';
import { tokens } from "../../theme";
import Topbar from "../global/Topbar"

const RssDataGrid = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [rows, setRows] = useState([]);

    async function fetchData() {
        try {
            const response = await fetch('/data/rss_data.json');
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            const data = await response.json();
            setRows(data);

            return data

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const columns = [
        {
            field: 'title',
            headerName: 'Title',
            flex: 1,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => (
                <Box sx={{display: 'flex', alignItems: 'center', height: '100%'}}>
                    <Typography variant="h5">
                        {params.value}
                    </Typography>
                </Box>
            )
        },
        {
            field: 'link',
            headerName: 'Link',
            headerAlign: 'center',
            width: 150,
            renderCell: (params) => (
                <a href={params.value} target="_blank" rel="noopener noreferrer">
                    <Box
                        width="100%" // 너비 조정
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
            )
        },
        {
            field: 'updated',
            headerName: 'Report Date',
            headerAlign: 'center',
            width: 200,
            renderCell: (params) => (
                <Box sx={{display: 'flex', alignItems: 'center', height: '100%'}}>
                    <Typography variant="h5">
                        {params.value}
                    </Typography>
                </Box>
            )
        },
    ];

    return (
        <Box m="20px">
            <Topbar title="Analysis Report" subtitle="The data is parsed from DEFRA's RSS feed."/>
            <Box height="75vh">
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    sx={{
                        '& .MuiDataGrid-columnHeaders': {
                            backgroundColor: theme.palette.primary.main,
                            color: theme.palette.common.white,
                            textAlign: 'center',
                        },
                        '& .MuiDataGrid-cell': {
                            textAlign: 'center',
                        },
                    }}
                />
            </Box>
        </Box>
    );
};

export default RssDataGrid;
