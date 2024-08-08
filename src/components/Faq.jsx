import React from 'react';
import { Box, Typography, Card, CardContent, CardActions } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { tokens } from '../theme';

const FaqPage = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box m="20px">

            <Card sx={{ backgroundColor: colors.primary[400], mb: 2 }}>
                <CardContent>
                    <Typography variant="h3" color={colors.grey[100]}>
                        What is Lumpy Skin Disease?
                    </Typography>
                    <Typography variant="h4" color={colors.grey[300]} m="20px">
                        Lumpy Skin Disease (LSD) is a viral disease that affects cattle. It is caused by the LSD virus, which belongs to the capripoxvirus genus. The disease is characterized by the formation of nodules on the skin, fever, and enlarged lymph nodes.
                    </Typography>
                </CardContent>
                <CardActions>
                    <Box
                        width="20%"
                        m="0 auto"
                        p="5px"
                        display="flex"
                        justifyContent="center"
                        bgcolor="#4caf50"
                        borderRadius="4px"
                    >
                        <a
                            href="/pdf/LumpySkinDisease.pdf" // PDF 파일 경로
                            target="_blank" // 새 탭에서 열기
                            rel="noopener noreferrer"
                            style={{
                                textDecoration: 'none',
                                color: 'white',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '100%',
                                height: '100%',
                            }}
                        >
                            Learn More
                        </a>
                    </Box>
                </CardActions>
            </Card>

            <Card sx={{backgroundColor: colors.primary[400], mb: 2}}>
                <CardContent>
                    <Typography variant="h3" color={colors.grey[100]}>
                        How is LSD transmitted?
                    </Typography>
                    <Typography variant="h4" color={colors.grey[300]} m="20px">
                        LSD is primarily spread by blood-feeding insects such as mosquitoes, ticks, and flies. It can also be transmitted through direct contact with infected animals or contaminated materials.
                    </Typography>
                </CardContent>
                <CardActions>
                    <Box
                        width="20%"
                        m="0 auto"
                        p="5px"
                        display="flex"
                        justifyContent="center"
                        bgcolor="#4caf50"
                        borderRadius="4px"
                    >
                        <a
                            href="/pdf/transmission.pdf" // PDF 파일 경로
                            target="_blank" // 새 탭에서 열기
                            rel="noopener noreferrer"
                            style={{
                                textDecoration: 'none',
                                color: 'white',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '100%',
                                height: '100%',
                            }}
                        >
                            Learn More
                        </a>
                    </Box>
                </CardActions>
            </Card>

            <Card sx={{ backgroundColor: colors.primary[400], mb: 2 }}>
                <CardContent>
                    <Typography variant="h3" color={colors.grey[100]}>
                        What are the symptoms of LSD?
                    </Typography>
                    <Typography variant="h4" color={colors.grey[300]} m="20px">
                        The symptoms of LSD include the formation of firm, round nodules on the skin, high fever, enlarged lymph nodes, and reduced milk production in dairy cattle. The nodules may also develop on the mucous membranes of the respiratory and gastrointestinal tracts.
                    </Typography>
                </CardContent>
                <CardActions>
                    <Box
                        width="20%"
                        m="0 auto"
                        p="5px"
                        display="flex"
                        justifyContent="center"
                        bgcolor="#4caf50"
                        borderRadius="4px"
                    >
                        <a
                            href="/pdf/symptoms.pdf" // PDF 파일 경로
                            target="_blank" // 새 탭에서 열기
                            rel="noopener noreferrer"
                            style={{
                                textDecoration: 'none',
                                color: 'white',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '100%',
                                height: '100%',
                            }}
                        >
                            Learn More
                        </a>
                    </Box>
                </CardActions>
            </Card>

            <Card sx={{ backgroundColor: colors.primary[400], mb: 2 }}>
                <CardContent>
                    <Typography variant="h3" color={colors.grey[100]}>
                        Recent Status and Diagnostic Methods of Lumpy Skin Disease
                    </Typography>
                    <Typography variant="h4" color={colors.grey[300]} m="20px">
                        LSD is now recognized as a transboundary disease, with outbreaks reported across various regions including Africa, the Middle East, and most recently Asia and parts of Europe.
                    </Typography>
                </CardContent>
                <CardActions>
                    <Box
                        width="20%"
                        m="0 auto"
                        p="5px"
                        display="flex"
                        justifyContent="center"
                        bgcolor="#4caf50"
                        borderRadius="4px"
                    >
                        <a
                            href="/pdf/Diagnosis.pdf" // PDF 파일 경로
                            target="_blank" // 새 탭에서 열기
                            rel="noopener noreferrer"
                            style={{
                                textDecoration: 'none',
                                color: 'white',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '100%',
                                height: '100%',
                            }}
                        >
                            Learn More
                        </a>
                    </Box>
                </CardActions>
            </Card>
        </Box>
    );
};

export default FaqPage;
