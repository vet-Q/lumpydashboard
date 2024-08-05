import React, { useEffect, useState } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';

const RssDataGrid = () => {
    const theme = useTheme();
    const [rows, setRows] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/data/rss_data.json');
                setRows(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const columns = [
        { field: 'title', headerName: '기사 제목', flex: 1, renderCell: (params) => (
                <a href={params.row.link} target="_blank" rel="noopener noreferrer">
                    {params.value}
                </a>
            )
        },
        { field: 'updated', headerName: '보고 날짜', type: 'date', width: 200 },
    ];

    return (
        <Box m="20px">
            <Typography variant="h4" gutterBottom>
                Research Articles
            </Typography>
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

export default Rss;
