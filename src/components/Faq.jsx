import React from 'react';
import { Box, Typography, Card, CardContent, CardActions, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { tokens } from '../theme';

const FaqPage = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box m="20px">
            <Typography variant="h4" color={colors.grey[100]} gutterBottom>
                Lumpy Skin Disease (LSD) FAQ
            </Typography>

            <Card sx={{ backgroundColor: colors.primary[400], mb: 2 }}>
                <CardContent>
                    <Typography variant="h5" color={colors.grey[100]}>
                        What is Lumpy Skin Disease?
                    </Typography>
                    <Typography variant="body2" color={colors.grey[300]}>
                        Lumpy Skin Disease (LSD) is a viral disease that affects cattle. It is caused by the LSD virus, which belongs to the capripoxvirus genus. The disease is characterized by the formation of nodules on the skin, fever, and enlarged lymph nodes.
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" color="primary">
                        Learn More
                    </Button>
                </CardActions>
            </Card>

            <Card sx={{ backgroundColor: colors.primary[400], mb: 2 }}>
                <CardContent>
                    <Typography variant="h5" color={colors.grey[100]}>
                        How is LSD transmitted?
                    </Typography>
                    <Typography variant="body2" color={colors.grey[300]}>
                        LSD is primarily spread by blood-feeding insects such as mosquitoes, ticks, and flies. It can also be transmitted through direct contact with infected animals or contaminated materials.
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" color="primary">
                        Learn More
                    </Button>
                </CardActions>
            </Card>

            <Card sx={{ backgroundColor: colors.primary[400], mb: 2 }}>
                <CardContent>
                    <Typography variant="h5" color={colors.grey[100]}>
                        What are the symptoms of LSD?
                    </Typography>
                    <Typography variant="body2" color={colors.grey[300]}>
                        The symptoms of LSD include the formation of firm, round nodules on the skin, high fever, enlarged lymph nodes, and reduced milk production in dairy cattle. The nodules may also develop on the mucous membranes of the respiratory and gastrointestinal tracts.
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" color="primary">
                        Learn More
                    </Button>
                </CardActions>
            </Card>

            <Card sx={{ backgroundColor: colors.primary[400], mb: 2 }}>
                <CardContent>
                    <Typography variant="h5" color={colors.grey[100]}>
                        How can LSD be prevented?
                    </Typography>
                    <Typography variant="body2" color={colors.grey[300]}>
                        Prevention of LSD involves the use of vaccines and controlling the population of blood-feeding insects. It is also important to quarantine infected animals and implement strict biosecurity measures on farms.
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" color="primary">
                        Learn More
                    </Button>
                </CardActions>
            </Card>
        </Box>
    );
};

export default FaqPage;
