import { Box, Typography, useTheme } from '@mui/material';
import { tokens } from "../theme";
import ProgressCircle from "./progressCircle";

const StatBox = ({ title, subtitle, icon, progress, increase }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box width="100%" m="0 30px" mb="20px" p="20px" backgroundColor={colors.grey[700]} borderRadius="8px">
            <Typography variant="h4" fontWeight="bold" sx={{ color: colors.grey[100], mb: 2 }}>
                LSD Outbreak (Today)
            </Typography>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box display="flex" alignItems="center">
                    {icon}
                    <Box ml="10px" justifyContent="space-between">
                        <Typography variant="h4" fontWeight="bold" sx={{ color: colors.grey[100] }}>
                            {title}
                        </Typography>
                        <Typography variant="subtitle1" sx={{ color: colors.grey[300] }}>
                            {subtitle}
                        </Typography>
                    </Box>
                </Box>
                <Box display="flex" alignItems="center">
                    <Box>
                        <ProgressCircle progress={progress} />
                    </Box>
                    <Box textAlign="right">
                        <Typography variant="h6" fontWeight="bold" sx={{ color: colors.greenAccent[400] }}>
                            {increase}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default StatBox;
