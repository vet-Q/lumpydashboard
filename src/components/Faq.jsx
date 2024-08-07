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
                        width="20%" // 너비 조정
                        m="0 auto"
                        p="5px"
                        display="flex"
                        justifyContent="center"
                        backgroundColor={colors.greenAccent[600]}
                        borderRadius="4px"
                    >
                        Learn More
                    </Box>
                </CardActions>
            </Card>

            <Card sx={{ backgroundColor: colors.primary[400], mb: 2 }}>
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
                        width="20%" // 너비 조정
                        m="0 auto"
                        p="5px"
                        display="flex"
                        justifyContent="center"
                        backgroundColor={colors.greenAccent[600]}
                        borderRadius="4px"
                    >
                        Learn More
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
                        width="20%" // 너비 조정
                        m="0 auto"
                        p="5px"
                        display="flex"
                        justifyContent="center"
                        backgroundColor={colors.greenAccent[600]}
                        borderRadius="4px"
                    >
                        Learn More
                    </Box>
                </CardActions>
            </Card>

            <Card sx={{ backgroundColor: colors.primary[400], mb: 2 }}>
                <CardContent>
                    <Typography variant="h3" color={colors.grey[100]}>
                        How can LSD be prevented?
                    </Typography>
                    <Typography variant="h4" color={colors.grey[300]} m="20px">
                        Prevention of LSD involves the use of vaccines and controlling the population of blood-feeding insects. It is also important to quarantine infected animals and implement strict biosecurity measures on farms.
                    </Typography>
                </CardContent>
                <CardActions>
                    <Box
                        width="20%" // 너비 조정
                        m="0 auto"
                        p="5px"
                        display="flex"
                        justifyContent="center"
                        backgroundColor={colors.greenAccent[600]}
                        borderRadius="4px"
                    >
                        Learn More
                    </Box>
                </CardActions>
            </Card>
        </Box>
    );
};

export default FaqPage;
